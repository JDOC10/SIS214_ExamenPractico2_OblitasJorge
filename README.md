# Portafolio | Jorge David Oblitas Camargo

Sitio multipágina HTML5, CSS3 y JavaScript ES6+ inspirado en el diseño minimalista de Apple.

## Páginas
- index.html: Inicio
- sobre-mi.html: Biografía y fotografía personal
- habilidades.html: Tecnologías
- proyectos.html: Portafolio con buscador dinámico
- github.html: Consulta a GitHub REST API
- contacto.html: Formulario EmailJS

## Ejecución
1. Abre la carpeta en Visual Studio Code.
2. Guarda tu fotografía como `assets/profile.jpeg`.
3. Abre `index.html` con Live Server.
4. Configura `githubUsername` y las tres claves de EmailJS en `js/main.js`.
5. En EmailJS, utiliza los campos `from_name`, `reply_to` y `message` en tu plantilla y configura el correo destinatario.
6. Prueba el formulario y revisa el correo receptor.

## Requisitos
HTML semántico, WAI-ARIA, CSS mobile-first con Flexbox y Grid, modo oscuro persistente con JSON/localStorage, menú responsive, filtro con filter/map, validación de formulario y envío EmailJS, Fetch API con async/await, try/catch, response.ok y estados.

## Publicación
Sube todos los archivos al repositorio público `SIS214_ExamenPractico2_OblitasJorgeDavid` y activa GitHub Pages desde Settings > Pages > Deploy from a branch > main / root.

Las imágenes SVG son ilustraciones de proyectos de demostración; cambia las descripciones y capturas por tus trabajos reales antes de entregar.

## Datos personalizados
Se incorporaron formación, experiencia académica, habilidades, idiomas y contacto facilitados por el estudiante. Las barras de habilidades son valores ilustrativos.

## Fotografía
Guardar la foto personal en `assets/profile.jpeg` (no está incluida).

## Configuración pendiente
En `js/main.js` reemplazar `TU_USUARIO_GITHUB`, `TU_PUBLIC_KEY`, `TU_SERVICE_ID`, `TU_TEMPLATE_ID` por datos reales. EmailJS necesita servicio autorizado y plantilla con `from_name`, `reply_to`, `message`.
