'use strict';
const L = require('../_dashboard-lib.js');
// POST {password} → cookie de sesión de 7 días
module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.send(res, 405, { ok: false, error: 'method' });
  if (!process.env.DASHBOARD_PASSWORD) return L.send(res, 503, { ok: false, error: 'Falta configurar DASHBOARD_PASSWORD en Vercel.' });
  const body = await L.readBody(req);
  const ok = typeof body.password === 'string' && L.safeEqual(body.password, process.env.DASHBOARD_PASSWORD);
  if (!ok) {
    await new Promise(r => setTimeout(r, 900)); // frena los intentos a ciegas
    return L.send(res, 401, { ok: false, error: 'Contraseña incorrecta.' });
  }
  return L.send(res, 200, { ok: true }, { 'Set-Cookie': L.newSession() });
};
