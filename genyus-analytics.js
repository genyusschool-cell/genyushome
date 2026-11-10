/* Genyus · medición de la web (GA4 + Microsoft Clarity) con consentimiento de cookies.
 *
 * CONFIGURACIÓN: rellena los dos IDs de abajo. Mientras estén vacíos no se carga nada
 * ni aparece el banner de cookies.
 *   - GA4_ID:     Google Analytics → Administrar → Flujos de datos → ID de medición (G-XXXXXXXXXX)
 *   - CLARITY_ID: clarity.microsoft.com → Settings → Overview → Project ID (p. ej. "abc123xyz")
 *
 * PRUEBAS: abre cualquier página con ?gdebug=1 y verás cada evento en la consola del
 * navegador (y en GA4 → Administrar → DebugView). ?gdebug=0 lo desactiva.
 *
 * PRIVACIDAD: nunca se envían nombres, emails, teléfonos, IBAN ni textos libres de
 * formularios. Solo campos de elección (programa, curso, horario, perfil…).
 */
(function () {
  'use strict';
  if (window.__genyusAnalytics) return; window.__genyusAnalytics = true;

  var GA4_ID = 'G-L6R55PTXTL';
  var CLARITY_ID = '';

  var CONSENT_KEY = 'genyus-consent';
  var CONSENT_VERSION = 1;
  var POLICY_URL = '/politicasgenyus#cookies';
  var ENABLED = !!(GA4_ID || CLARITY_ID);

  /* ---------- utilidades ---------- */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  var qs = location.search;
  if (/[?&]gdebug=1/.test(qs)) store('genyus-gdebug', '1');
  if (/[?&]gdebug=0/.test(qs)) store('genyus-gdebug', null);
  var DEBUG = store('genyus-gdebug') === '1';

  function clean(s, max) {
    s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    return s.length > (max || 100) ? s.slice(0, (max || 100) - 1) + '…' : s;
  }
  // Quita datos personales de textos libres (emails, teléfonos, números largos).
  function scrub(s) {
    return clean(String(s || '')
      .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]')
      .replace(/(\+?\d[\d\s.-]{6,}\d)/g, '[número]'), 100);
  }
  function slug(s) {
    return clean(s, 60).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  }

  /* ---------- contexto de página ---------- */
  var path = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
  var PAGE_TYPES = {
    '/': 'home', '/nosotros': 'nosotros', '/programas': 'programas', '/programas/genyusgo': 'programa_genyusgo',
    '/programas/sem-colegios': 'programa_sem_colegios', '/programas/sem-insti': 'programa_sem_instituciones',
    '/eventos': 'eventos', '/academy-lab': 'academy_lab', '/contacto': 'contacto', '/politicasgenyus': 'legal',
    '/puntoyaparte': 'landing_puntoyaparte', '/consentimiento_de_imagen': 'landing_consentimiento'
  };
  var PAGE_TYPE = PAGE_TYPES[path] || (document.documentElement.getAttribute('data-page-type') || 'otra');
  var AUDIENCE = { home: 'mixta', nosotros: 'mixta', programas: 'centros', programa_genyusgo: 'colegios',
    programa_sem_colegios: 'colegios', programa_sem_instituciones: 'instituciones', academy_lab: 'familias',
    eventos: 'mixta', contacto: 'mixta', landing_puntoyaparte: 'centros', landing_consentimiento: 'familias' }[PAGE_TYPE] || 'mixta';

  /* ---------- cola de eventos (se envían solo tras aceptar) ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var consent = readConsent();
  var loaded = false;

  function track(name, params) {
    params = params || {};
    params.page_type = PAGE_TYPE;
    params.page_audience = AUDIENCE;
    if (DEBUG) { params.debug_mode = true; console.log('%c[genyus] ' + name, 'color:#E04C97;font-weight:bold', params); }
    if (!ENABLED || !consent || !consent.analytics) return;
    if (GA4_ID) window.gtag('event', name, params);
    if (CLARITY_ID && window.clarity && /^(form_|generate_lead|chatbot_|cta_click|whatsapp_click)/.test(name)) {
      try { window.clarity('event', name); } catch (e) {}
    }
  }
  window.gtrack = track;

  /* ---------- carga de herramientas ---------- */
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted'
  });

  function loadTools() {
    if (loaded || !ENABLED) return; loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (GA4_ID) {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', GA4_ID, {
        page_type: PAGE_TYPE, page_audience: AUDIENCE, debug_mode: DEBUG || undefined,
        content_group: PAGE_TYPE
      });
    }
    if (CLARITY_ID) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CLARITY_ID);
      window.clarity('consent');
      window.clarity('set', 'page_type', PAGE_TYPE);
    }
  }

  /* ---------- consentimiento ---------- */
  function readConsent() {
    try { var c = JSON.parse(store(CONSENT_KEY) || 'null'); return c && c.v === CONSENT_VERSION ? c : null; } catch (e) { return null; }
  }
  function saveConsent(analytics) {
    var had = consent && consent.analytics;
    consent = { v: CONSENT_VERSION, analytics: !!analytics, ts: new Date().toISOString() };
    store(CONSENT_KEY, JSON.stringify(consent));
    hideBanner();
    if (analytics) { loadTools(); track('cookie_consent', { choice: 'aceptar' }); }
    else if (had) { location.reload(); } // revoca: recargar para dejar de medir
  }

  var CSS = '\
#gy-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;display:flex;justify-content:center;font-family:var(--font-body,"Nobel Uno",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif)}\
#gy-cc .bx{width:100%;max-width:720px;background:#fff;color:#0E1116;border-radius:22px;padding:20px 22px;box-shadow:0 0 0 1px rgba(14,17,22,.08),0 20px 40px -12px rgba(14,17,22,.25)}\
#gy-cc h2{margin:0 0 6px;font-size:17px;line-height:1.3;font-weight:700}\
#gy-cc p{margin:0;font-size:14px;line-height:1.55;color:#333A45}\
#gy-cc a{color:#C4127A;text-decoration:underline;text-underline-offset:2px}\
#gy-cc .row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}\
#gy-cc button{font:inherit;font-size:14px;font-weight:700;border:0;border-radius:999px;padding:11px 20px;cursor:pointer;min-height:44px}\
#gy-cc .ok{background:#0E1116;color:#fff}#gy-cc .no{background:#0E1116;color:#fff}#gy-cc .cfg{background:transparent;color:#0E1116;box-shadow:inset 0 0 0 1.5px #D5D9E2}\
#gy-cc .opts{display:none;margin-top:14px;border-top:1px solid #E6E9F0;padding-top:12px}#gy-cc.cfg-open .opts{display:block}\
#gy-cc label{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;padding:6px 0}\
#gy-cc input{margin-top:3px;width:18px;height:18px;accent-color:#C4127A}\
@media (max-width:560px){#gy-cc .row button{flex:1 1 auto}}';

  var banner = null;
  function showBanner(withOptions) {
    if (!ENABLED) return;
    if (!banner) {
      var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      banner = document.createElement('div');
      banner.id = 'gy-cc';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Preferencias de cookies');
      banner.innerHTML = '<div class="bx">\
<h2>Usamos cookies para mejorar la web</h2>\
<p>Con tu permiso, usamos cookies de analítica (Google Analytics y Microsoft Clarity) para saber qué páginas se visitan y mejorar la web. No las usamos para publicidad. <a href="' + POLICY_URL + '">Política de cookies</a>.</p>\
<div class="opts"><label><input type="checkbox" checked disabled> <span><b>Técnicas</b> · necesarias para que la web y los formularios funcionen.</span></label>\
<label><input type="checkbox" data-an> <span><b>Analítica</b> · visitas, clics y uso de la web de forma agregada.</span></label></div>\
<div class="row"><button type="button" class="no" data-no>Rechazar</button><button type="button" class="ok" data-ok>Aceptar</button><button type="button" class="cfg" data-cfg>Configurar</button></div>\
</div>';
      document.body.appendChild(banner);
      var an = banner.querySelector('[data-an]');
      banner.querySelector('[data-ok]').onclick = function () { saveConsent(true); };
      banner.querySelector('[data-no]').onclick = function () { saveConsent(false); };
      banner.querySelector('[data-cfg]').onclick = function () {
        if (banner.classList.contains('cfg-open')) saveConsent(an.checked);
        else { banner.classList.add('cfg-open'); this.textContent = 'Guardar selección'; }
      };
    }
    banner.querySelector('[data-an]').checked = !!(consent && consent.analytics);
    banner.classList.toggle('cfg-open', !!withOptions);
    banner.querySelector('[data-cfg]').textContent = withOptions ? 'Guardar selección' : 'Configurar';
    banner.style.display = 'flex';
  }
  function hideBanner() { if (banner) banner.style.display = 'none'; }
  window.GenyusConsent = { open: function () { showBanner(true); }, get: function () { return consent; } };

  /* ---------- clics: todos los botones y enlaces ---------- */
  function sectionOf(el) {
    var n = el, host;
    while (n) {
      if (n.nodeType === 1) {
        if (n.getAttribute && n.getAttribute('data-screen-label')) return n.getAttribute('data-screen-label');
        if (n.tagName === 'NAV') return 'Menú';
        if (n.id === 'yusi-bot') return 'Chat Yusi';
      }
      host = n.parentNode || n.host; // atraviesa el shadow DOM del chat
      n = host;
    }
    return 'Sin sección';
  }
  function labelOf(el) {
    var t = el.getAttribute('aria-label') || el.innerText || el.textContent || el.value || el.title || '';
    if (!clean(t)) { var img = el.querySelector && el.querySelector('img[alt]'); if (img) t = img.alt; }
    return clean(t, 80) || '(sin texto)';
  }
  var SOCIAL = { 'instagram.com': 'instagram', 'linkedin.com': 'linkedin', 'facebook.com': 'facebook', 'youtube.com': 'youtube', 'youtu.be': 'youtube', 'tiktok.com': 'tiktok', 'x.com': 'x', 'twitter.com': 'x' };
  var CTA_RE = /(inscrib|reserv|hablamos|contact|dossier|solicit|informaci|apunt|quiero|empez|plaza|llévalo|llevar|pincha|descarg|enviar|mis datos)/i;

  document.addEventListener('click', function (e) {
    var p = e.composedPath ? e.composedPath() : [e.target];
    var el = null;
    for (var i = 0; i < p.length; i++) {
      var n = p[i];
      if (n && n.nodeType === 1 && (n.tagName === 'A' || n.tagName === 'BUTTON' || n.tagName === 'SUMMARY' || n.getAttribute('role') === 'button' || (n.tagName === 'INPUT' && /^(submit|button)$/.test(n.type)))) { el = n; break; }
    }
    if (!el) return;
    if (el.closest && el.closest('#gy-cc')) return; // el propio banner
    var section = sectionOf(el);
    var text = labelOf(el);
    var href = el.tagName === 'A' ? (el.getAttribute('href') || '') : '';
    var url = null; try { url = href ? new URL(href, location.href) : null; } catch (x) {}
    var base = {
      link_text: text, section: section, element: el.tagName.toLowerCase(),
      cta_id: el.getAttribute('data-track') || slug(section + ' ' + text),
      link_url: url ? clean(url.href, 100) : '', link_domain: url ? url.hostname : ''
    };
    var isNav = section === 'Menú' || section === 'Footer' || !!(el.closest && el.closest('nav, details[data-nav-menu]'));
    if (isNav) base.nav_location = section === 'Footer' ? 'footer' : (el.closest && el.closest('details[data-nav-menu]') ? 'menu_movil' : 'menu');

    // 1) evento genérico con TODOS los clics
    track('ui_click', base);

    // 2) eventos específicos
    if (url) {
      var h = url.hostname.replace(/^www\./, '');
      if (url.protocol === 'mailto:') track('email_click', base);
      else if (url.protocol === 'tel:') track('phone_click', base);
      else if (/wa\.me|whatsapp\.com/.test(h)) track('whatsapp_click', base);
      else if (/youtube\.com|youtu\.be/.test(h) && /watch|youtu\.be\//.test(url.href)) {
        var vid = url.searchParams.get('v') || url.pathname.slice(1);
        track('video_click', Object.assign({ video_id: vid }, base));
      } else if (SOCIAL[h]) track('social_click', Object.assign({ network: SOCIAL[h] }, base));
      else if (/\.(pdf|docx?|xlsx?|pptx?|zip)$/i.test(url.pathname)) track('file_download', Object.assign({ file_name: url.pathname.split('/').pop() }, base));
      else if (url.host !== location.host && /^https?:$/.test(url.protocol)) track('outbound_click', base);
    }
    if (isNav) track('nav_click', base);
    else if (CTA_RE.test(text) || (url && url.host === location.host && /contacto|reserva|form|#contact/i.test(url.pathname + url.hash))) track('cta_click', base);
    if (el.tagName === 'SUMMARY' && el.closest && el.closest('[data-nav-menu]')) track('menu_open', { section: 'Menú' });
  }, true);

  /* ---------- profundidad de scroll ---------- */
  var marks = [25, 50, 75, 90, 100], hit = {}, maxScroll = 0;
  function onScroll() {
    var d = document.documentElement, h = d.scrollHeight - window.innerHeight;
    var pct = h > 0 ? Math.round((window.scrollY / h) * 100) : 100;
    if (pct > maxScroll) maxScroll = Math.min(pct, 100);
    marks.forEach(function (m) { if (pct >= m && !hit[m]) { hit[m] = true; track('scroll_depth', { percent_scrolled: m }); } });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- secciones vistas y tiempo por sección ---------- */
  var seen = {}, seenOrder = 0, secTime = {}, visibleSecs = {};
  function watchSections() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var name = en.target.getAttribute('data-screen-label');
        if (en.isIntersecting && en.intersectionRatio >= 0.35) {
          visibleSecs[name] = true;
          if (!seen[name]) { seen[name] = true; seenOrder++; track('section_view', { section: name, section_order: seenOrder }); }
        } else delete visibleSecs[name];
      });
    }, { threshold: [0, 0.35] });
    var obs = new WeakSet();
    function scan() {
      document.querySelectorAll('[data-screen-label]').forEach(function (el) { if (!obs.has(el)) { obs.add(el); io.observe(el); } });
    }
    scan();
    // la página se pinta con JS: vuelve a buscar secciones mientras aparecen
    new MutationObserver(function () { scan(); }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- tiempo activo en la página ---------- */
  var active = 0, lastAct = Date.now(), sent = false;
  ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'].forEach(function (ev) {
    window.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true, capture: true });
  });
  setInterval(function () {
    if (document.visibilityState === 'visible' && Date.now() - lastAct < 30000) {
      active++;
      for (var s in visibleSecs) secTime[s] = (secTime[s] || 0) + 1;
      if (active === 10 || active === 30 || active === 60 || active === 120 || active === 300) track('time_on_page', { seconds: active });
    }
  }, 1000);
  function flush() {
    if (sent) return; sent = true;
    var top = null, topT = 0;
    for (var s in secTime) if (secTime[s] > topT) { topT = secTime[s]; top = s; }
    track('page_engagement', {
      active_seconds: active, max_scroll: maxScroll, sections_seen: seenOrder,
      top_section: top || '', top_section_seconds: topT, transport_type: 'beacon'
    });
  }
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); else sent = false; });
  window.addEventListener('pagehide', flush);

  /* ---------- formularios ---------- */
  var FORM_NAMES = { contacto: 'contacto', academy_reserva: 'academy_inscripcion', academy_info: 'academy_info', puntoyaparte: 'puntoyaparte_inscripcion', consentimiento: 'consentimiento_imagen' };
  // Solo campos de elección, nunca datos personales.
  var SAFE_FIELDS = {
    'Programa elegido': 'programa', 'Programa': 'programa', 'Curso escolar actual (26/27)': 'curso', 'Horario elegido': 'horario',
    '¿Qué te gustaría saber?': 'interes', 'Perfil': 'perfil', 'Producto': 'producto', 'Prefiere': 'prefiere_contacto',
    etapas: 'etapas', cargo: 'cargo', titularidad: 'titularidad', acepta_comunicaciones: 'acepta_comunicaciones'
  };
  function formNameFromEl(f) {
    if (!f) return 'desconocido';
    var host = f.closest && f.closest('[id]');
    var sec = sectionOf(f);
    if (PAGE_TYPE === 'academy_lab') return /info|contact/i.test(sec + ' ' + (host ? host.id : '')) ? 'academy_info' : 'academy_inscripcion';
    if (PAGE_TYPE === 'landing_puntoyaparte') return 'puntoyaparte_inscripcion';
    if (PAGE_TYPE === 'landing_consentimiento') return 'consentimiento_imagen';
    return 'contacto';
  }
  function fieldName(el) {
    var lab = el.closest('label');
    var t = (lab && (lab.querySelector('span') || lab).innerText) || el.getAttribute('aria-label') || el.placeholder || el.name || el.type;
    return clean(String(t).replace(/\*/g, ''), 60);
  }
  var started = {}, filled = {};
  document.addEventListener('focusin', function (e) {
    var el = e.target; if (!el || !/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) || el.name === 'website') return;
    var f = el.closest('form'); if (!f) return;
    var fn = formNameFromEl(f);
    if (!started[fn]) { started[fn] = Date.now(); track('form_start', { form_name: fn, first_field: fieldName(el), section: sectionOf(f) }); }
  }, true);
  document.addEventListener('change', function (e) {
    var el = e.target; if (!el || !/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) || el.name === 'website' || el.type === 'hidden') return;
    var f = el.closest('form'); if (!f) return;
    var fn = formNameFromEl(f), key = fn + '|' + fieldName(el);
    if (filled[key]) return; filled[key] = true;
    filled[fn] = (filled[fn] || 0) + 1;
    track('form_field_complete', { form_name: fn, field_name: fieldName(el), field_index: filled[fn] });
  }, true);
  document.addEventListener('invalid', function (e) {
    var el = e.target, f = el && el.closest && el.closest('form'); if (!f) return;
    track('form_validation_error', { form_name: formNameFromEl(f), field_name: fieldName(el) });
  }, true);
  // abandono: empezó el formulario y se va sin enviarlo
  window.addEventListener('pagehide', function () {
    for (var fn in started) if (started[fn] && !started[fn + '_done']) {
      track('form_abandon', { form_name: fn, fields_completed: filled[fn] || 0, seconds_in_form: Math.round((Date.now() - started[fn]) / 1000), transport_type: 'beacon' });
    }
  });

  function wrapForms() {
    var GF = window.GenyusForms;
    if (!GF || GF.__tracked) return !!GF;
    var orig = GF.send;
    GF.send = function (form, data, scope) {
      var fn = FORM_NAMES[form] || form;
      var p = { form_name: fn, form_endpoint: form };
      for (var k in SAFE_FIELDS) if (data && data[k] != null && data[k] !== '—') p[SAFE_FIELDS[k]] = clean(data[k], 100);
      if (started[fn]) p.seconds_to_submit = Math.round((Date.now() - started[fn]) / 1000);
      track('form_submit', p);
      return orig.apply(this, arguments).then(function (r) {
        if (r === 'ok') {
          started[fn + '_done'] = true;
          track('form_success', p);
          track('generate_lead', Object.assign({ lead_source: fn }, p));
          if (p.perfil) window.gtag('set', 'user_properties', { perfil: p.perfil });
        } else track('form_error', Object.assign({ error_type: r }, p));
        return r;
      });
    };
    GF.__tracked = true;
    return true;
  }
  (function waitForms(n) { if (!wrapForms() && n < 80) setTimeout(function () { waitForms(n + 1); }, 150); })(0);

  /* ---------- otros ---------- */
  window.addEventListener('error', function (e) {
    if (e && e.message) track('js_error', { message: clean(e.message, 100), source: clean((e.filename || '').split('/').pop(), 60) });
  });
  document.addEventListener('copy', function () {
    var t = String(window.getSelection ? window.getSelection() : '');
    if (/@|\d{9}/.test(t)) track('contact_copy', { kind: /@/.test(t) ? 'email' : 'telefono' });
  });
  window.GenyusTrack = { track: track, scrub: scrub, setProfile: function (p) { window.gtag('set', 'user_properties', { perfil: p }); if (window.clarity) try { window.clarity('set', 'perfil', p); } catch (e) {} } };

  /* ---------- arranque ---------- */
  function boot() {
    if (consent && consent.analytics) loadTools();
    else if (!consent) showBanner(false);
    watchSections();
    onScroll();
    if (PAGE_TYPE === 'no_encontrada') track('page_not_found', { missing_path: clean(location.pathname + location.search, 100), referrer: clean(document.referrer, 100) });
    // enlaces o botones con data-cookie-settings abren el panel
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest && e.target.closest('[data-cookie-settings], a[href="#configurar-cookies"]');
      if (t) { e.preventDefault(); showBanner(true); }
    });
  }
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
