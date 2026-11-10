'use strict';
const L = require('../_dashboard-lib.js');
module.exports = (req, res) => L.send(res, 200, { ok: true }, { 'Set-Cookie': L.sessionCookie(0, '') });
