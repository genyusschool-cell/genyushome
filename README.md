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
- Academy + Lab: inscripción y contacto → Slack + Google Sheets.
- Punto y aparte: inscripción → Google Sheets + email (Apps Script) + Slack.
- Formulario de /contacto (y Home/Eventos): solo muestra confirmación (sin envío conectado).
