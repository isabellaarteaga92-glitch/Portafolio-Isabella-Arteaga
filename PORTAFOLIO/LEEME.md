# Portafolio de Isabella Arteaga

## Cómo verlo
Necesita internet (carga React, Tailwind y tipografías desde CDN). Desde esta carpeta:

```
powershell -ExecutionPolicy Bypass -File servidor-local.ps1
```

Luego abre http://localhost:5173

## Cómo editarlo
- **Todo el contenido** (textos, servicios, proyectos, enlaces, correo, foto, logo, hoja de vida) está en `sitio/content.js`.
- Lo que aparece en ámbar con `[[corchetes]]` es un dato pendiente. Cuando lo completes, quita los corchetes.
- **Colores y tipografías:** bloque `tailwind.config` en `sitio/index.html`.
- **Diseño y componentes:** `sitio/app.js`.
- Pon tu foto, logo y PDF en `sitio/assets/` y escribe su ruta en `config`.

## Formulario de contacto
- Con `email` configurado, abre tu programa de correo con el mensaje listo.
- Con `formEndpoint` (por ejemplo Formspree), envía el mensaje directamente.
- Sin ninguno de los dos, avisa que falta configurarlo.

## Para publicarlo
Sube la carpeta `sitio/` a Netlify, Vercel o GitHub Pages. No requiere compilación.
