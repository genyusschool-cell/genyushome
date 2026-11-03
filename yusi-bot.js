(function () {
  if (window.__yusiBot) return; window.__yusiBot = true;
  var SRC = (document.currentScript && document.currentScript.src) || location.href;
  var BASE = new URL('.', SRC).href;
  var IS_DC = /\.dc\.html/.test(decodeURIComponent(location.pathname));
  var PAGES = IS_DC ? {
    academy: 'Genyus Academy Lab.dc.html#reserva-form', go: 'Genyus Go.dc.html', semc: 'Genyus SEM Colegios.dc.html',
    semi: 'Genyus SEM Instituciones.dc.html', contacto: 'Genyus Contacto.dc.html', nosotros: 'Genyus Nosotros.dc.html', programas: 'Genyus Programas.dc.html'
  } : {
    academy: 'academy-lab#reserva-form', go: 'programas/genyusgo', semc: 'programas/sem-colegios',
    semi: 'programas/sem-insti', contacto: 'contacto', nosotros: 'nosotros', programas: 'programas'
  };
  function page(k) { return BASE + PAGES[k]; }
  var WA = 'https://wa.me/34649347471?text=' + encodeURIComponent('Hola Genyus, os escribo desde la web.');
  var IG = 'https://www.instagram.com/genyusschool/';
  var LI = 'https://www.linkedin.com/company/genyusschool/';
  var AVATAR = BASE + 'assets/yusi/yusi-wave.png';

  var AUD = [
    { id: 'fam', label: 'Soy familia' },
    { id: 'doc', label: 'Soy docente o colegio' },
    { id: 'ins', label: 'Soy ayuntamiento o institución' }
  ];
  var FAQ = [
    { id: 'academy', aud: 'fam', q: '¿Qué es Genyus Academy?', k: ['academy', 'extraescolar', 'clases', 'semanal'],
      a: 'Es la extraescolar de emprendimiento de Genyus: clases semanales en directo de 90 minutos, con un itinerario progresivo por curso escolar de 5.º de Primaria a 4.º de la ESO. Grupos de 4 a 10 alumnos. Precio: 80 € / mes.', link: ['Ver Academy + Lab', 'academy'] },
    { id: 'lab', aud: 'fam', q: '¿Qué es Genyus Lab?', k: ['lab', 'mentoria', 'mentorias', 'proyecto propio', 'candidatura'],
      a: 'Son mentorías grupales quincenales de alto rendimiento para alumnos de 13 a 17 años con un proyecto propio en marcha. Grupos de 4 a 6 alumnos y acceso por candidatura. Precio: 100 € / mes.', link: ['Ver Academy + Lab', 'academy'] },
    { id: 'horario', aud: 'fam', q: '¿Qué horarios tenéis?', k: ['horario', 'horarios', 'dia', 'dias', 'hora', 'lunes', 'martes', 'franja'],
      a: 'Curso 26-27, Genyus Academy: 5.º y 6.º EP los lunes de 17:30 a 19:00; 1.º y 2.º ESO los martes de 17:30 a 19:00 o de 17:45 a 19:15 (a elegir); 3.º y 4.º ESO los martes de 19:00 a 20:30. Genyus Lab: lunes de 19:00 a 20:30, en semanas alternas (grupo A y grupo B).', link: ['Reservar plaza', 'academy'] },
    { id: 'online', aud: 'fam', q: '¿Las clases son online?', k: ['online', 'presencial', 'meet', 'google', 'virtual', 'casa', 'directo'],
      a: 'Sí. Todas las sesiones son en directo por Google Meet: semanales en Academy y quincenales en Lab, con explicación, dinámicas y trabajo aplicado sobre retos reales.' },
    { id: 'edad', aud: 'fam', q: '¿Desde qué edad pueden apuntarse?', k: ['edad', 'años', 'anos', 'curso', 'primaria', 'eso', 'pequeño', 'mayor'],
      a: 'Academy empieza en 5.º de Primaria (9-10 años) y llega hasta 4.º de la ESO. Es una decisión pedagógica: a esa edad sostienen bloques largos de trabajo ante la pantalla, manejan la videollamada con autonomía y tienen la lectoescritura consolidada. Lab es para 13-17 años.' },
    { id: 'reserva', aud: 'fam', q: '¿Cómo reservo una plaza?', k: ['reservar', 'reserva', 'inscribir', 'inscripcion', 'apuntar', 'plaza', 'matricula', 'precio', 'cuesta', 'cuanto'],
      a: 'Completa la solicitud en la página de Academy + Lab y te confirmamos el grupo y el horario. Las plazas son limitadas por grupo y la solicitud es sin compromiso.', link: ['Ir al formulario de reserva', 'academy'] },
    { id: 'colegio', aud: 'fam', q: 'Quiero llevar Genyus al colegio de mi hijo/a', k: ['colegio de mi', 'mi colegio', 'llevar', 'centro de mi'],
      a: 'Genyus trabaja con colegios a través de la plataforma Genyus Go y de la Semana del Emprendimiento. Si quieres proponerlo en tu centro, cuéntanos cuál es y contactamos con el equipo directivo.', link: ['Contactar', 'contacto'] },
    { id: 'go', aud: 'doc', q: '¿Qué es Genyus Go?', k: ['genyus go', 'go', 'plataforma', 'experiencias', 'aula'],
      a: 'Es el programa educativo para integrar la competencia emprendedora en el aula y desarrollar el resto de competencias clave de la LOMLOE. Incluye 15 experiencias por curso en 5.º y 6.º EP y 10 en cada curso de 1.º a 4.º ESO, con recursos digitales e imprimibles y evaluaciones automatizadas.', link: ['Ver Genyus Go', 'go'] },
    { id: 'semc', aud: 'doc', q: '¿Cómo funciona la Semana del Emprendimiento?', k: ['semana', 'sem', 'hackathon', 'fases', 'evento'],
      a: 'Es un programa para Primaria y ESO en tres fases: sesión informativa al profesorado (lunes), envío de la Guía Docente y los materiales (martes) y Hackathon con el alumnado (jueves o viernes). Al final el centro recibe una memoria completa del evento.', link: ['Ver SEM Colegios', 'semc'] },
    { id: 'carga', aud: 'doc', q: '¿Supone carga extra para el profesorado?', k: ['carga', 'trabajo', 'tiempo', 'formacion', 'docente', 'profesorado', 'preparar'],
      a: 'No. Genyus Go trae guiones pedagógicos paso a paso y guías didácticas para que cualquier docente lo aplique con autonomía. En la Semana del Emprendimiento gestionamos las comunicaciones y los materiales, y acompañamos al profesorado antes, durante y después de la hackathon.' },
    { id: 'lomloe', aud: 'doc', q: '¿Está alineado con la LOMLOE?', k: ['lomloe', 'curriculo', 'curricular', 'competencias', 'evaluacion', 'evaluar'],
      a: 'Sí. El modelo trabaja la competencia emprendedora junto al resto de competencias clave de la LOMLOE e incluye evidencias educativas y evaluación competencial.' },
    { id: 'dossier', aud: 'doc', q: '¿Tenéis un dossier informativo?', k: ['dossier', 'pdf', 'informacion', 'descargar', 'presupuesto', 'precio', 'coste'],
      a: 'Sí. Puedes descargar el dossier desde las páginas de Genyus Go y de la Semana del Emprendimiento. Para un presupuesto adaptado a tu centro, escríbenos.', link: ['Ver programas', 'programas'] },
    { id: 'semi', aud: 'ins', q: '¿Qué es la SEM para ayuntamientos?', k: ['ayuntamiento', 'municipio', 'municipal', 'institucion', 'territorio'],
      a: 'Es la Semana del Emprendimiento y habilidades sociales junior para los centros educativos de tu municipio. Ya la han hecho más de 20 ayuntamientos, con más de 13.000 estudiantes en más de 100 centros.', link: ['Ver SEM Instituciones', 'semi'] },
    { id: 'coord', aud: 'ins', q: '¿Cómo se coordina con los centros?', k: ['coordina', 'coordinacion', 'gestion', 'organiza', 'comunicacion'],
      a: 'Genyus se encarga de la comunicación con los centros, de la gestión de materiales y del acompañamiento continuo. El programa sigue tres fases: información al profesorado, recursos educativos digitales y Hackathon.' },
    { id: 'aprenden', aud: 'ins', q: '¿Qué trabaja el alumnado?', k: ['aprende', 'aprenden', 'trabaja', 'habilidades', 'contenidos', 'actividades'],
      a: 'Educación financiera, hablar en público, gestión de emociones, trabajo en equipo, liderazgo, marketing y ventas, diseño de prototipos, simulación de mercado y diseño de logo, eslogan y nombre, entre otras.' },
    { id: 'quien', aud: 'all', q: '¿Quiénes sois?', k: ['quienes', 'sois', 'empresa', 'equipo', 'genyus', 'premio'],
      a: 'Genyus nace en 2019 y es un modelo pedagógico para integrar la competencia emprendedora en el sistema educativo. Hemos trabajado con más de 350 centros y 20.000 estudiantes, y recibimos el Premio al Mejor Proyecto de Educación de España 2025.', link: ['Conocer al equipo', 'nosotros'] },
    { id: 'contacto', aud: 'all', q: '¿Cómo puedo hablar con vosotros?', k: ['contacto', 'contactar', 'hablar', 'llamar', 'telefono', 'email', 'correo', 'whatsapp', 'persona'],
      a: 'Escríbenos por WhatsApp o déjanos tus datos en el formulario y te contactamos en menos de 24 horas.', cta: true }
  ];

  var ICON = {
    wa: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  var CSS = '\
:host{all:initial;font-family:var(--font-body,"Nobel Uno",system-ui,sans-serif);color:#0E1116;-webkit-font-smoothing:antialiased}\
*{box-sizing:border-box}\
.wrap{position:fixed;right:20px;bottom:20px;width:64px;height:64px;z-index:2147483000}\
.launch{position:absolute;right:0;bottom:0;width:64px;height:64px;border-radius:50%;border:0;padding:3px;cursor:pointer;background:linear-gradient(135deg,#FF35A5,#FF7A59 55%,#FFB000);box-shadow:0 10px 28px rgba(224,76,151,.4);transition:transform .2s cubic-bezier(.34,1.56,.64,1)}\
.launch:hover{transform:scale(1.06)}.launch:active{transform:scale(.94)}\
.launch span{display:block;width:100%;height:100%;border-radius:50%;background:#fff url("' + AVATAR + '") 50% 6% / 170% auto no-repeat}\
.launch .x{display:none;place-items:center;background:#fff;color:#0E1116}\
.open .launch span.face{display:none}.open .launch .x{display:grid}\
.dot{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#16B364;border:2.5px solid #fff}\
.open .dot{display:none}\
.soc{position:absolute;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;text-decoration:none;box-shadow:0 6px 18px rgba(14,17,22,.16);transition:right .42s cubic-bezier(.34,1.56,.64,1),bottom .42s cubic-bezier(.34,1.56,.64,1),transform .2s cubic-bezier(.34,1.56,.64,1)}\
.soc:hover{transform:scale(1.08)}.soc:active{transform:scale(.92)}\
.soc.wa{background:#25D366;color:#fff}.soc.ig,.soc.li{background:#fff;color:#0E1116;box-shadow:0 6px 18px rgba(14,17,22,.16),inset 0 0 0 1px #E4E7EC}\
.soc.wa{right:9px;bottom:184px}.soc.ig{right:9px;bottom:130px}.soc.li{right:9px;bottom:76px}\
.open .soc.wa{right:184px;bottom:9px}.open .soc.ig{right:130px;bottom:9px}.open .soc.li{right:76px;bottom:9px}\
.panel{position:absolute;right:0;bottom:80px;width:min(380px,calc(100vw - 24px));height:min(580px,calc(100dvh - 120px));background:#fff;border-radius:22px;box-shadow:0 24px 60px rgba(14,17,22,.22),0 0 0 1px rgba(14,17,22,.06);display:flex;flex-direction:column;overflow:hidden;transform-origin:100% 100%;transform:scale(.6) translateY(20px);opacity:0;pointer-events:none;transition:transform .34s cubic-bezier(.34,1.56,.64,1),opacity .2s ease}\
.open .panel{transform:none;opacity:1;pointer-events:auto}\
.head{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(120deg,#FF35A5,#FF7A59 60%,#FFB000);color:#fff}\
.av{width:44px;height:44px;border-radius:50%;flex:none;background:#fff url("' + AVATAR + '") 50% 6% / 170% auto no-repeat}\
.head b{display:block;font-family:var(--font-display,inherit);font-weight:400;font-size:22px;line-height:1}\
.head small{display:block;font-size:13px;font-weight:600;opacity:.95;margin-top:3px}\
.hx{margin-left:auto;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.2);color:#fff;display:grid;place-items:center;cursor:pointer}\
.msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#F7F8FA;overscroll-behavior:contain}\
.m{max-width:86%;padding:11px 14px;border-radius:18px;font-size:15px;line-height:1.5;text-wrap:pretty;animation:pop .28s cubic-bezier(.34,1.56,.64,1)}\
.bot{align-self:flex-start;background:#fff;border:1px solid #E4E7EC;border-bottom-left-radius:6px}\
.me{align-self:flex-end;background:#0E1116;color:#fff;border-bottom-right-radius:6px}\
.acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}\
.btn{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:9px 16px;border-radius:999px;font-weight:700;font-size:14px;line-height:1.2;font-family:inherit;text-decoration:none;cursor:pointer;border:0;transition:transform .2s cubic-bezier(.34,1.56,.64,1)}\
.btn:active{transform:scale(.96)}\
.btn.p{background:#FF35A5;color:#fff;box-shadow:0 6px 16px rgba(255,53,165,.3)}\
.btn.g{background:#25D366;color:#fff}\
.btn.o{background:#fff;color:#0E1116;box-shadow:inset 0 0 0 1.5px #D0D5DD}\
.btn svg{width:18px;height:18px}\
.typing{display:flex;gap:4px;padding:14px 16px}.typing i{width:7px;height:7px;border-radius:50%;background:#98A2B3;animation:bl 1s infinite}.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}\
.sug{display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px 4px;max-height:148px;overflow-y:auto;border-top:1px solid #EEF0F3;background:#fff}\
.chip{min-height:38px;padding:8px 14px;border-radius:999px;border:1.5px solid #D0D5DD;background:#fff;color:#0E1116;font-weight:600;font-size:14px;line-height:1.25;font-family:inherit;cursor:pointer;text-align:left;transition:border-color .15s,transform .2s cubic-bezier(.34,1.56,.64,1)}\
.chip:hover{border-color:#FF35A5}.chip:active{transform:scale(.96)}\
.chip.alt{border-style:dashed;color:#475467}\
form{display:flex;gap:8px;padding:10px 12px 12px;background:#fff}\
input{flex:1;min-width:0;height:44px;padding:0 16px;border-radius:999px;border:1.5px solid #D0D5DD;font-size:15px;font-family:inherit;color:#0E1116;outline:none}\
input:focus{border-color:#1AACFF;box-shadow:0 0 0 4px rgba(26,172,255,.16)}\
.go{width:44px;height:44px;flex:none;border-radius:50%;border:0;background:#0E1116;color:#fff;display:grid;place-items:center;cursor:pointer}\
@keyframes pop{from{opacity:0;transform:translateY(8px) scale(.96)}to{opacity:1;transform:none}}\
@keyframes bl{0%,100%{opacity:.3}50%{opacity:1}}\
@media (max-width:520px){.wrap{right:12px;bottom:12px}.panel{right:-0px;width:calc(100vw - 24px)}}\
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}';

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

  function mount() {
    var host = document.createElement('div');
    host.id = 'yusi-bot';
    document.body.appendChild(host);
    var root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + CSS + '</style>\
<div class="wrap">\
  <div class="panel" role="dialog" aria-label="Chat con Yusi">\
    <div class="head"><span class="av"></span><div><b>Yusi</b><small>Asistente de Genyus School</small></div><button class="hx" type="button" aria-label="Cerrar chat">' + ICON.x + '</button></div>\
    <div class="msgs" aria-live="polite"></div>\
    <div class="sug"></div>\
    <form><input type="text" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta"><button class="go" type="submit" aria-label="Enviar">' + ICON.send + '</button></form>\
  </div>\
  <a class="soc wa" href="' + WA + '" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">' + ICON.wa + '</a>\
  <a class="soc ig" href="' + IG + '" target="_blank" rel="noopener" aria-label="Instagram de Genyus School">' + ICON.ig + '</a>\
  <a class="soc li" href="' + LI + '" target="_blank" rel="noopener" aria-label="LinkedIn de Genyus School">' + ICON.li + '</a>\
  <button class="launch" type="button" aria-label="Abrir chat con Yusi"><span class="face"></span><span class="x">' + ICON.x + '</span><i class="dot"></i></button>\
</div>';

    var wrap = root.querySelector('.wrap'), msgs = root.querySelector('.msgs'), sug = root.querySelector('.sug');
    var input = root.querySelector('input'), launch = root.querySelector('.launch');
    var st = { open: false, started: false, aud: null, asked: [], count: 0, ctaShown: false };

    function setOpen(v) {
      st.open = v;
      wrap.classList.toggle('open', v);
      launch.setAttribute('aria-label', v ? 'Cerrar chat con Yusi' : 'Abrir chat con Yusi');
      if (v && !st.started) start();
      try { sessionStorage.setItem('yusi-seen', '1'); } catch (e) {}
    }
    launch.onclick = function () { setOpen(!st.open); };
    root.querySelector('.hx').onclick = function () { setOpen(false); };

    function scrollEnd() { msgs.scrollTop = msgs.scrollHeight; }
    function bubble(cls, html) {
      var d = document.createElement('div'); d.className = 'm ' + cls; d.innerHTML = html; msgs.appendChild(d); scrollEnd(); return d;
    }
    function me(t) { var d = bubble('me', ''); d.textContent = t; }
    function say(html, after) {
      var t = bubble('bot typing', '<i></i><i></i><i></i>');
      setTimeout(function () { t.remove(); var d = bubble('bot', html); if (after) after(d); scrollEnd(); }, 550);
    }
    function ctaHtml() {
      return '<div class="acts"><a class="btn g" href="' + WA + '" target="_blank" rel="noopener">' + ICON.wa + 'WhatsApp</a><a class="btn o" href="' + page('contacto') + '">Dejar mis datos</a></div>';
    }
    function chips(list) {
      sug.innerHTML = '';
      list.forEach(function (c) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chip' + (c.alt ? ' alt' : ''); b.textContent = c.label;
        b.onclick = c.fn; sug.appendChild(b);
      });
      sug.style.display = list.length ? 'flex' : 'none';
    }
    function audChips() {
      chips(AUD.map(function (a) { return { label: a.label, fn: function () { pickAud(a); } }; }));
    }
    function faqChips() {
      var list = FAQ.filter(function (f) { return (f.aud === st.aud || f.aud === 'all') && st.asked.indexOf(f.id) < 0; })
        .map(function (f) { return { label: f.q, fn: function () { me(f.q); answer(f); } }; });
      list.push({ label: 'Cambiar de perfil', alt: true, fn: function () { me('Cambiar de perfil'); say('Claro, ¿quién eres?'); audChips(); } });
      chips(list);
    }
    function start() {
      st.started = true;
      say('¡Hola! Soy <b>Yusi</b>, el asistente de Genyus School. Te ayudo a resolver tus dudas en un momento. Para empezar, ¿quién eres?');
      audChips();
    }
    function pickAud(a) {
      st.aud = a.id; me(a.label);
      say('Estas son las dudas más habituales. Elige una o escríbeme tu pregunta.');
      faqChips();
    }
    function answer(f) {
      if (st.asked.indexOf(f.id) < 0) st.asked.push(f.id);
      st.count++;
      var html = f.a;
      if (f.cta) { html += ctaHtml(); st.ctaShown = true; }
      else if (f.link) html += '<div class="acts"><a class="btn p" href="' + page(f.link[1]) + '">' + f.link[0] + '</a></div>';
      say(html, function () {
        if (st.count >= 4 && !st.ctaShown) {
          st.ctaShown = true;
          say('Si te quedan dudas, el equipo de Genyus te atiende directamente. Escríbenos por WhatsApp o déjanos tus datos y te contactamos en menos de 24 horas.' + ctaHtml());
        }
      });
      if (!st.aud) st.aud = f.aud === 'all' ? 'fam' : f.aud;
      faqChips();
    }
    root.querySelector('form').onsubmit = function (e) {
      e.preventDefault();
      var t = input.value.trim(); if (!t) return;
      input.value = ''; me(t);
      var n = norm(t), best = null, score = 0;
      FAQ.forEach(function (f) {
        var s = 0; f.k.forEach(function (k) { if (n.indexOf(norm(k)) >= 0) s += k.length > 5 ? 2 : 1; });
        if (st.aud && (f.aud === st.aud)) s += 0.5 * (s > 0);
        if (s > score) { score = s; best = f; }
      });
      if (best) answer(best);
      else {
        st.count++; st.ctaShown = true;
        say('No tengo esa respuesta, pero el equipo de Genyus sí. Escríbenos por WhatsApp o déjanos tus datos y te contactamos en menos de 24 horas.' + ctaHtml());
      }
    };

    var seen = false; try { seen = sessionStorage.getItem('yusi-seen') === '1'; } catch (e) {}
    if (!seen) {
      var gestures = 0, last = 0;
      var onScroll = function () {
        var now = Date.now();
        if (now - last > 600) gestures++;
        last = now;
        if (gestures >= 2) {
          document.removeEventListener('scroll', onScroll, true);
          if (!st.open) setOpen(true);
        }
      };
      document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    }
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
