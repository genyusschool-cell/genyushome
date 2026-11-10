/* Genyus · panel privado: utilidades compartidas (sesión con contraseña y acceso a Google).
 * Los archivos de /api que empiezan por "_" no se publican como rutas.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   DASHBOARD_PASSWORD        contraseña del panel (obligatoria)
 *   DASHBOARD_SECRET          cadena aleatoria larga para firmar la sesión (recomendada)
 *   GOOGLE_SERVICE_ACCOUNT    JSON completo de la cuenta de servicio (o el mismo JSON en base64)
 *   GA4_PROPERTY_ID           ID numérico de la propiedad GA4 (Administrar → Detalles de la propiedad), p. ej. 512345678
 *   GSC_SITE                  propiedad de Search Console: "sc-domain:genyusschool.com" o "https://www.genyusschool.com/"
 */
'use strict';
const crypto = require('crypto');

const COOKIE = 'gy_dash';
const SESSION_DAYS = 7;

function secret() {
  const s = process.env.DASHBOARD_SECRET || '';
  if (s) return s;
  // sin secreto propio: se deriva de la contraseña (cambiarla cierra todas las sesiones)
  return crypto.createHash('sha256').update('genyus-dashboard|' + (process.env.DASHBOARD_PASSWORD || '')).digest('hex');
}
function sign(v) { return crypto.createHmac('sha256', secret()).update(v).digest('base64url'); }
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}
function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function sessionCookie(maxAgeSec, value) {
  return COOKIE + '=' + (value || '') + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=' + maxAgeSec;
}
function newSession() {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400);
  return sessionCookie(SESSION_DAYS * 86400, exp + '.' + sign(exp));
}
function isAuthed(req) {
  if (!process.env.DASHBOARD_PASSWORD) return false;
  const c = parseCookies(req)[COOKIE] || '';
  const [exp, mac] = c.split('.');
  if (!exp || !mac || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(mac, sign(exp));
}
function send(res, status, body, headers) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (headers) Object.keys(headers).forEach(k => res.setHeader(k, headers[k]));
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise(resolve => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let d = '';
    req.on('data', c => { d += c; if (d.length > 1e4) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch (e) { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

/* ---------- Google: token con cuenta de servicio (JWT RS256, sin dependencias) ---------- */
let tokenCache = { token: null, exp: 0 };
function serviceAccount() {
  let raw = process.env.GOOGLE_SERVICE_ACCOUNT || '';
  if (!raw) return null;
  raw = raw.trim();
  if (raw[0] !== '{') { try { raw = Buffer.from(raw, 'base64').toString('utf8'); } catch (e) { return null; } }
  try {
    const j = JSON.parse(raw);
    if (!j.client_email || !j.private_key) return null;
    j.private_key = String(j.private_key).replace(/\\n/g, '\n');
    return j;
  } catch (e) { return null; }
}
let tokenPending = null;
function googleToken() {
  if (tokenCache.token && tokenCache.exp > Date.now() + 60000) return Promise.resolve(tokenCache.token);
  // las consultas en paralelo comparten la misma petición de token
  if (!tokenPending) tokenPending = fetchToken().finally(() => { tokenPending = null; });
  return tokenPending;
}
async function fetchToken() {
  const sa = serviceAccount();
  if (!sa) throw new Error('Falta GOOGLE_SERVICE_ACCOUNT o no es un JSON válido');
  const now = Math.floor(Date.now() / 1000);
  const enc = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = enc({ alg: 'RS256', typ: 'JWT' }) + '.' + enc({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600
  });
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + unsigned + '.' + sig
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error('Google rechazó la cuenta de servicio: ' + (j.error_description || j.error || r.status));
  tokenCache = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return tokenCache.token;
}
async function googlePost(url, body) {
  const t = await googleToken();
  const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || ('HTTP ' + r.status));
  return j;
}

module.exports = { isAuthed, newSession, sessionCookie, safeEqual, send, readBody, googlePost, serviceAccount };
