/* Genyus · protección anti-bot de formularios (Cloudflare Turnstile + honeypot + tiempo mínimo) */
(function () {
  var SITEKEY = '0x4AAAAAAFxxG-p3hl0jxuvL';
  var ENDPOINTS = {
    contacto: 'https://script.google.com/macros/s/AKfycbxNgC_coO4pNRJE7CHEXwWVxePSyrq4LK1iTTSbPR6i6xzsVvKzNYW1g24gCjKjAbqN/exec',
    academy_reserva: 'https://script.google.com/macros/s/AKfycbzQcUtja9x6QXsfozwIyw9eilQUitYOSzK5E4783co58na7s4QGqDBqbrzWRPg3lwx6Hg/exec',
    academy_info: 'https://script.google.com/macros/s/AKfycbwDfdliz-EDwJgsxSjruQUgedvz1inbKIhf2O03uU4jRSld3Eky8HjixBOwrLj7UvmT/exec',
    puntoyaparte: { legacy: 'https://script.google.com/macros/s/AKfycbz-gAOcw3eHukAQBTB1Kv0c1K8ug941p-tkkaELy8_0EO37fnBUfz5DVSq6Evd74Rp-/exec' },
    consentimiento: { legacy: 'https://script.google.com/macros/s/AKfycbyK-lQeHjP_AihDtta5E87pg3PT4Bp8u5LaoZytj1pCcnw9J03UoBz36hGrl4jGHjaH/exec' }
  };
  var MIN_MS = 3000;
  var t0 = Date.now();
  if (!document.querySelector('script[data-turnstile]')) {
    var s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true; s.defer = true; s.setAttribute('data-turnstile', '');
    document.head.appendChild(s);
  }
  function ready(cb) { if (window.turnstile && turnstile.render) cb(); else setTimeout(function () { ready(cb); }, 150); }
  function box(scope) { return (scope || document).querySelector('[data-ts]'); }
  window.GenyusForms = {
    widget: function (el) {
      if (!el || el.__ts) return;
      el.__ts = true;
      ready(function () { el.__wid = turnstile.render(el, { sitekey: SITEKEY, language: 'es', theme: 'light' }); });
    },
    reset: function (scope) {
      var el = box(scope);
      if (el && el.__wid != null && window.turnstile) try { turnstile.reset(el.__wid); } catch (e) {}
    },
    msg: function (r) {
      return r === 'captcha'
        ? 'Completa la verificación de seguridad antes de enviar.'
        : 'No se ha podido enviar. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.';
    },
    send: function (form, data, scope) {
      var root = scope || document;
      var hp = root.querySelector('input[name="website"]');
      if ((hp && hp.value) || Date.now() - t0 < MIN_MS) return Promise.resolve('ok');
      var el = box(scope);
      var tk = el && el.querySelector('input[name="cf-turnstile-response"]');
      var token = tk ? tk.value : '';
      if (!token) return Promise.resolve('captcha');
      var ep = ENDPOINTS[form];
      if (ep && ep.legacy) {
        return fetch(ep.legacy, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
          .then(function () { return 'ok'; }).catch(function () { return 'error'; });
      }
      if (!ep || ep.indexOf('https://') !== 0) return Promise.resolve('error');
      return fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ form: form, token: token, page: location.pathname, data: data })
      }).then(function (r) { return r.json(); })
        .then(function (j) { return j && j.ok ? 'ok' : (j && j.error === 'captcha' ? 'captcha' : 'error'); })
        .catch(function () { return 'error'; });
    }
  };
})();
