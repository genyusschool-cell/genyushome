'use strict';
/* GET /api/dashboard/data?days=28 → todas las métricas del panel (requiere sesión). */
const L = require('../_dashboard-lib.js');

const SITE = 'https://www.genyusschool.com';
const INDEX_URLS = ['/', '/academy-lab', '/programas', '/programas/genyusgo', '/programas/sem-colegios', '/programas/sem-insti',
  '/eventos', '/nosotros', '/contacto', '/puntoyaparte', '/politicasgenyus'];
const ALLOWED_DAYS = [7, 28, 90, 180, 365, 486]; // 486 días ≈ 16 meses, el máximo de Search Console
const KEY_EVENTS = ['generate_lead', 'form_start', 'whatsapp_click', 'email_click', 'phone_click', 'cta_click', 'chatbot_open'];
const cache = new Map();
let indexCache = { at: 0, data: null };

const fmt = d => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(d);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const num = v => { const n = Number(v); return isFinite(n) ? n : 0; };

/* ---------- GA4 ---------- */
function ga(prop, body) {
  return L.googlePost('https://analyticsdata.googleapis.com/v1beta/properties/' + prop + ':runReport', body);
}
function rows(rep) {
  const dh = (rep.dimensionHeaders || []).map(h => h.name), mh = (rep.metricHeaders || []).map(h => h.name);
  return (rep.rows || []).map(r => {
    const o = {};
    dh.forEach((h, i) => { o[h] = r.dimensionValues[i].value; });
    mh.forEach((h, i) => { o[h] = num(r.metricValues[i].value); });
    return o;
  });
}
const ev = name => ({ filter: { fieldName: 'eventName', stringFilter: { value: name } } });
const evIn = names => ({ filter: { fieldName: 'eventName', inListFilter: { values: names } } });
const byCount = [{ metric: { metricName: 'eventCount' }, desc: true }];

async function gaData(prop, cur, prev) {
  const R = [cur];
  const D = (...n) => n.map(name => ({ name }));
  const M = (...n) => n.map(name => ({ name }));
  const q = {
    totals: { dateRanges: [cur, prev], metrics: M('activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagementRate', 'userEngagementDuration', 'engagedSessions') },
    leadsTotals: { dateRanges: [cur, prev], dimensions: D('eventName'), metrics: M('eventCount'), dimensionFilter: evIn(KEY_EVENTS) },
    daily: { dateRanges: R, dimensions: D('date'), metrics: M('activeUsers', 'sessions', 'screenPageViews'), orderBys: [{ dimension: { dimensionName: 'date' } }], limit: 1000 },
    dailyLeads: { dateRanges: R, dimensions: D('date'), metrics: M('eventCount'), dimensionFilter: ev('generate_lead'), limit: 1000 },
    pages: { dateRanges: R, dimensions: D('pagePath'), metrics: M('screenPageViews', 'activeUsers', 'userEngagementDuration'), orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 50 },
    pageLeads: { dateRanges: R, dimensions: D('pagePath'), metrics: M('eventCount'), dimensionFilter: ev('generate_lead'), limit: 50 },
    channels: { dateRanges: R, dimensions: D('sessionDefaultChannelGroup'), metrics: M('sessions', 'activeUsers', 'engagementRate'), orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] },
    channelLeads: { dateRanges: R, dimensions: D('sessionDefaultChannelGroup'), metrics: M('eventCount'), dimensionFilter: ev('generate_lead') },
    sources: { dateRanges: R, dimensions: D('sessionSourceMedium'), metrics: M('sessions', 'activeUsers'), orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 20 },
    devices: { dateRanges: R, dimensions: D('deviceCategory'), metrics: M('activeUsers'), orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }] },
    cities: { dateRanges: R, dimensions: D('region', 'city'), metrics: M('activeUsers'), orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 20 },
    events: { dateRanges: R, dimensions: D('eventName'), metrics: M('eventCount', 'totalUsers'), orderBys: byCount, limit: 100 },
    // necesitan dimensiones personalizadas registradas en GA4
    forms: { dateRanges: R, dimensions: D('eventName', 'customEvent:form_name'), metrics: M('eventCount'), dimensionFilter: evIn(['form_start', 'form_submit', 'form_success', 'form_error', 'form_abandon']), limit: 200 },
    leadsDetail: { dateRanges: R, dimensions: D('customEvent:form_name', 'customEvent:programa', 'customEvent:perfil', 'customEvent:producto'), metrics: M('eventCount'), dimensionFilter: ev('generate_lead'), orderBys: byCount, limit: 100 },
    fields: { dateRanges: R, dimensions: D('customEvent:form_name', 'customEvent:field_name'), metrics: M('eventCount'), dimensionFilter: ev('form_field_complete'), orderBys: byCount, limit: 200 },
    ctas: { dateRanges: R, dimensions: D('customEvent:link_text', 'customEvent:section', 'pagePath'), metrics: M('eventCount'), dimensionFilter: ev('cta_click'), orderBys: byCount, limit: 50 },
    clicks: { dateRanges: R, dimensions: D('customEvent:link_text', 'customEvent:section', 'pagePath'), metrics: M('eventCount'), dimensionFilter: ev('ui_click'), orderBys: byCount, limit: 100 },
    sections: { dateRanges: R, dimensions: D('pagePath', 'customEvent:section'), metrics: M('eventCount'), dimensionFilter: ev('section_view'), orderBys: byCount, limit: 250 },
    chatQuestions: { dateRanges: R, dimensions: D('customEvent:question'), metrics: M('eventCount'), dimensionFilter: ev('chatbot_question'), orderBys: byCount, limit: 30 },
    chatNoAnswer: { dateRanges: R, dimensions: D('customEvent:text'), metrics: M('eventCount'), dimensionFilter: ev('chatbot_no_answer'), orderBys: byCount, limit: 50 },
    notFound: { dateRanges: R, dimensions: D('customEvent:missing_path'), metrics: M('eventCount'), dimensionFilter: ev('page_not_found'), orderBys: byCount, limit: 50 }
  };
  const names = Object.keys(q);
  const res = await Promise.allSettled(names.map(n => ga(prop, q[n])));
  const out = {}, errors = {};
  names.forEach((n, i) => {
    if (res[i].status === 'fulfilled') out[n] = rows(res[i].value);
    else { out[n] = []; errors[n] = String(res[i].reason && res[i].reason.message || res[i].reason).slice(0, 300); }
  });

  const split = (list, key) => {
    const c = {}, p = {};
    list.forEach(r => { const t = r.dateRange === 'date_range_1' ? p : c; if (key) t[r[key]] = (t[r[key]] || 0) + r.eventCount; else Object.assign(t, r); });
    return [c, p];
  };
  const [tc, tp] = split(out.totals);
  const [lc, lp] = split(out.leadsTotals, 'eventName');
  const totals = t => ({ users: t.activeUsers || 0, newUsers: t.newUsers || 0, sessions: t.sessions || 0, views: t.screenPageViews || 0,
    engagementRate: t.engagementRate || 0, avgEngagementSec: t.activeUsers ? (t.userEngagementDuration || 0) / t.activeUsers : 0 });

  const leadsByDate = {}; out.dailyLeads.forEach(r => { leadsByDate[r.date] = r.eventCount; });
  const leadsByPage = {}; out.pageLeads.forEach(r => { leadsByPage[r.pagePath] = r.eventCount; });
  const leadsByChannel = {}; out.channelLeads.forEach(r => { leadsByChannel[r.sessionDefaultChannelGroup] = r.eventCount; });
  const forms = {};
  out.forms.forEach(r => {
    const f = r['customEvent:form_name'] || '(not set)';
    forms[f] = forms[f] || { form: f, form_start: 0, form_submit: 0, form_success: 0, form_error: 0, form_abandon: 0 };
    forms[f][r.eventName] = r.eventCount;
  });
  const cd = k => r => r['customEvent:' + k];

  return {
    errors,
    totals: totals(tc), prevTotals: totals(tp), keyEvents: lc, prevKeyEvents: lp,
    daily: out.daily.map(r => ({ date: r.date.replace(/(\d{4})(\d\d)(\d\d)/, '$1-$2-$3'), users: r.activeUsers, sessions: r.sessions, views: r.screenPageViews, leads: leadsByDate[r.date] || 0 })),
    pages: out.pages.map(r => ({ path: r.pagePath, views: r.screenPageViews, users: r.activeUsers, avgSec: r.activeUsers ? r.userEngagementDuration / r.activeUsers : 0, leads: leadsByPage[r.pagePath] || 0 })),
    channels: out.channels.map(r => ({ channel: r.sessionDefaultChannelGroup, sessions: r.sessions, users: r.activeUsers, engagementRate: r.engagementRate, leads: leadsByChannel[r.sessionDefaultChannelGroup] || 0 })),
    sources: out.sources.map(r => ({ source: r.sessionSourceMedium, sessions: r.sessions, users: r.activeUsers })),
    devices: out.devices.map(r => ({ device: r.deviceCategory, users: r.activeUsers })),
    cities: out.cities.map(r => ({ region: r.region, city: r.city, users: r.activeUsers })),
    events: out.events.map(r => ({ name: r.eventName, count: r.eventCount, users: r.totalUsers })),
    forms: Object.values(forms).sort((a, b) => b.form_start - a.form_start),
    leads: out.leadsDetail.map(r => ({ form: cd('form_name')(r), programa: cd('programa')(r), perfil: cd('perfil')(r), producto: cd('producto')(r), count: r.eventCount })),
    fields: out.fields.map(r => ({ form: cd('form_name')(r), field: cd('field_name')(r), count: r.eventCount })),
    ctas: out.ctas.map(r => ({ text: cd('link_text')(r), section: cd('section')(r), page: r.pagePath, count: r.eventCount })),
    clicks: out.clicks.map(r => ({ text: cd('link_text')(r), section: cd('section')(r), page: r.pagePath, count: r.eventCount })),
    sections: out.sections.map(r => ({ page: r.pagePath, section: cd('section')(r), count: r.eventCount })),
    chatQuestions: out.chatQuestions.map(r => ({ text: cd('question')(r), count: r.eventCount })),
    chatNoAnswer: out.chatNoAnswer.map(r => ({ text: cd('text')(r), count: r.eventCount })),
    notFound: out.notFound.map(r => ({ path: cd('missing_path')(r), count: r.eventCount }))
  };
}

/* ---------- Search Console ---------- */
function gsc(site, body) {
  return L.googlePost('https://www.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(site) + '/searchAnalytics/query', Object.assign({ dataState: 'all' }, body));
}
const gscRows = (j, keys) => (j.rows || []).map(r => {
  const o = { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position };
  (keys || []).forEach((k, i) => { o[k] = r.keys[i]; });
  return o;
});
async function gscData(site, cur, prev) {
  const q = {
    totals: { startDate: cur.startDate, endDate: cur.endDate },
    prevTotals: { startDate: prev.startDate, endDate: prev.endDate },
    daily: { startDate: cur.startDate, endDate: cur.endDate, dimensions: ['date'], rowLimit: 1000 },
    queries: { startDate: cur.startDate, endDate: cur.endDate, dimensions: ['query'], rowLimit: 250 },
    pages: { startDate: cur.startDate, endDate: cur.endDate, dimensions: ['page'], rowLimit: 100 },
    devices: { startDate: cur.startDate, endDate: cur.endDate, dimensions: ['device'] },
    countries: { startDate: cur.startDate, endDate: cur.endDate, dimensions: ['country'], rowLimit: 10 }
  };
  const names = Object.keys(q);
  const res = await Promise.allSettled(names.map(n => gsc(site, q[n])));
  const out = {}, errors = {};
  names.forEach((n, i) => {
    if (res[i].status === 'fulfilled') out[n] = gscRows(res[i].value, q[n].dimensions);
    else { out[n] = []; errors[n] = String(res[i].reason && res[i].reason.message || res[i].reason).slice(0, 300); }
  });
  const t = r => r && r[0] ? r[0] : { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return { errors, totals: t(out.totals), prevTotals: t(out.prevTotals), daily: out.daily, queries: out.queries, pages: out.pages, devices: out.devices, countries: out.countries };
}
async function indexStatus(site) {
  if (indexCache.data && Date.now() - indexCache.at < 6 * 3600000) return indexCache.data;
  const res = await Promise.allSettled(INDEX_URLS.map(p => L.googlePost('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    { inspectionUrl: SITE + p, siteUrl: site, languageCode: 'es-ES' })));
  const data = INDEX_URLS.map((p, i) => {
    if (res[i].status !== 'fulfilled') return { path: p, verdict: 'ERROR', coverage: String(res[i].reason && res[i].reason.message).slice(0, 160) };
    const s = (res[i].value.inspectionResult || {}).indexStatusResult || {};
    return { path: p, verdict: s.verdict || '', coverage: s.coverageState || '', lastCrawl: s.lastCrawlTime || '', canonical: s.googleCanonical || '', fetch: s.pageFetchState || '' };
  });
  indexCache = { at: Date.now(), data };
  return data;
}

module.exports = async (req, res) => {
  if (!L.isAuthed(req)) return L.send(res, 401, { ok: false, error: 'login' });
  const u = new URL(req.url, 'http://x');
  let days = Number(u.searchParams.get('days')) || 28;
  if (ALLOWED_DAYS.indexOf(days) < 0) days = 28;
  const key = 'd' + days;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 10 * 60000 && u.searchParams.get('fresh') !== '1') return L.send(res, 200, hit.data);

  const today = new Date();
  const end = addDays(today, -1);
  const cur = { startDate: fmt(addDays(end, -(days - 1))), endDate: fmt(end) };
  const prev = { startDate: fmt(addDays(end, -(2 * days - 1))), endDate: fmt(addDays(end, -days)) };
  const prop = (process.env.GA4_PROPERTY_ID || '').replace(/^properties\//, '').trim();
  const site = (process.env.GSC_SITE || '').trim();
  const configured = { serviceAccount: !!L.serviceAccount(), ga: !!prop, gsc: !!site };
  const data = { ok: true, generatedAt: new Date().toISOString(), days, range: cur, prevRange: prev, configured,
    serviceAccountEmail: (L.serviceAccount() || {}).client_email || '' };

  if (configured.serviceAccount) {
    const [g, s, ix] = await Promise.allSettled([
      prop ? gaData(prop, cur, prev) : Promise.resolve(null),
      site ? gscData(site, cur, prev) : Promise.resolve(null),
      site ? indexStatus(site) : Promise.resolve(null)
    ]);
    data.ga = g.status === 'fulfilled' ? g.value : { fatal: String(g.reason && g.reason.message) };
    data.gsc = s.status === 'fulfilled' ? s.value : { fatal: String(s.reason && s.reason.message) };
    data.index = ix.status === 'fulfilled' ? ix.value : [];
  }
  cache.set(key, { at: Date.now(), data });
  return L.send(res, 200, data);
};
