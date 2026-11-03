# Genyus School · Web

Web estática, sin paso de build.

## Rutas
- `/` · Home
- `/nosotros`
- `/programas`
- `/programas/genyusgo`
- `/programas/sem-insti`
- `/programas/sem-colegios`
- `/eventos`
- `/academy-lab`
- `/politicasgenyus` (#aviso-legal, #privacidad, #cookies)
- `/puntoyaparte`
- `/contacto`

## Publicar
1. Sube el contenido de esta carpeta a la raíz de un repositorio de GitHub.
2. En Vercel: Add New → Project → importa el repositorio.
3. Framework Preset: **Other**. Sin comando de build. Output directory: raíz.
4. Deploy. `vercel.json` activa las URLs limpias (sin .html).

## Integraciones
Cada formulario envía a su Apps Script (URLs en `genyus-forms.js`), que verifica Cloudflare Turnstile, guarda en su hoja y avisa a Slack.
- Leads web (contacto): hoja + Slack general
- Academy confirmación (inscripción): hoja + Slack Academy
- Academy Info: solo Slack Academy
- Punto y aparte y Consentimiento: scripts anteriores (sin verificación en servidor todavía)
Protección: Turnstile + campo trampa oculto + rechazo de envíos en menos de 3 s.
