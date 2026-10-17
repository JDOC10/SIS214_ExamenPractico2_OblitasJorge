'use strict';

// Configuración personal: reemplaza estos valores antes de publicar.
const CONFIG = Object.freeze({
  githubUsername: 'JDOC10',
  emailjsPublicKey: 'bLM-QJesMzICS0Sbg',
  emailjsServiceId: 'service_nev83b9',
  emailjsTemplateId: 'template_zv5ypln'
});

// Datos originales inmutables. Reemplaza las descripciones por proyectos reales.
const projects = Object.freeze([
  Object.freeze({ title: 'RouteMaster', category: 'Aplicaciones', image: 'assets/routemaster.png', description: 'Aplicación desarrollada en Java para ayudar a encontrar opciones de movilidad en El Alto y La Paz. Proyecto de Programación II.', tags: ['Java', 'Programación II', 'Transporte'] }),
  Object.freeze({ title: 'TRON', category: 'Juegos', image: 'assets/tron.png', description: 'Videojuego inspirado en TRON, desarrollado en C++ como proyecto de Programación I.', tags: ['C++', 'Programación I', 'Videojuego'] }),
  Object.freeze({ title: 'Sitio web de ejercicio en casa', category: 'Sitios Web', image: 'assets/ejercicios.png', description: 'Sitio web para realizar ejercicios físicos desde casa. Proyecto final de colegio.', tags: ['HTML', 'CSS', 'Java', 'Proyecto escolar'] })
]);

const $ = (selector) => document.querySelector(selector);
const themeButton = $('#themeToggle');
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Activar tema claro' : 'Activar tema oscuro');
  themeButton.textContent = dark ? '☀' : '☾';
}
let savedTheme = 'light';
try { savedTheme = JSON.parse(localStorage.getItem('portfolioTheme')) || 'light'; } catch { savedTheme = 'light'; }
applyTheme(savedTheme);
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  try { localStorage.setItem('portfolioTheme', JSON.stringify(nextTheme)); } catch (error) { console.warn('No se pudo guardar el tema', error); }
});

const menuButton = $('#menuToggle');
const navLinks = $('#navLinks');
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) { navLinks.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }
});

if (document.querySelector("#projectGrid")) {
const projectGrid = $('#projectGrid');
function renderProjects(search = '') {
  const term = search.trim().toLocaleLowerCase('es');
  const matching = projects.filter((project) => [project.title, project.category, project.description, ...project.tags].join(' ').toLocaleLowerCase('es').includes(term));
  const cards = matching.map((project) => {
    const article = document.createElement('article');
    article.className = 'project-card';
    const image = document.createElement('img'); image.src = project.image; image.alt = `Vista previa de ${project.title}`; image.loading = 'lazy';
    const body = document.createElement('section'); body.className = 'project-body';
    const heading = document.createElement('h3'); heading.textContent = project.title;
    const description = document.createElement('p'); description.textContent = project.description;
    const tags = document.createElement('p'); tags.className = 'tags';
    project.tags.forEach((tag) => { const badge = document.createElement('span'); badge.textContent = tag; tags.append(badge); });
    body.append(heading, description, tags); article.append(image, body); return article;
  });
  projectGrid.replaceChildren(...cards);
  $('#projectEmpty').hidden = matching.length !== 0;
}
if (projectGrid && $('#projectSearch')) {
  $('#projectSearch').addEventListener('input', (event) => renderProjects(event.target.value));
  renderProjects();
}

}

if (document.querySelector("#loadRepos")) {
const repoStatus = $('#repoStatus');
if ($('#loadRepos')) $('#loadRepos').addEventListener('click', async () => {
  const username = CONFIG.githubUsername.trim();
  const repoList = $('#repoList');
  repoList.replaceChildren();
  if (!username || username === 'TU_USUARIO_GITHUB') { repoStatus.textContent = 'Configura githubUsername en js/main.js para consultar tus repositorios.'; return; }
  const button = $('#loadRepos'); button.disabled = true;
  repoStatus.textContent = 'Cargando repositorios...';
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) {
      if (response.status === 404) throw new Error('404: usuario de GitHub no encontrado.');
      if (response.status === 403) throw new Error('403: límite de solicitudes de GitHub alcanzado.');
      if (response.status >= 500) throw new Error('Error del servidor de GitHub.');
      throw new Error(`Error HTTP ${response.status}`);
    }
    const data = await response.json();
    data.forEach((repo) => {
      const item = document.createElement('li'); const link = document.createElement('a');
      link.href = repo.html_url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = repo.name;
      const description = document.createElement('p'); description.textContent = repo.description || 'Repositorio público';
      item.append(link, description); repoList.append(item);
    });
    repoStatus.textContent = data.length ? `${data.length} repositorio(s) cargado(s) correctamente.` : 'Consulta exitosa: no hay repositorios públicos.';
  } catch (error) { repoStatus.textContent = `No se pudieron cargar los repositorios: ${error.message}`; }
  finally { button.disabled = false; }
});

}

if (document.querySelector("#contactForm")) {
const form = $('#contactForm');
const fieldRules = [
  { input: $('#contactName'), error: $('#nameError'), message: 'Escribe al menos 2 caracteres.' },
  { input: $('#contactEmail'), error: $('#emailError'), message: 'Introduce un correo electrónico válido.' },
  { input: $('#contactMessage'), error: $('#messageError'), message: 'Escribe un mensaje de al menos 10 caracteres.' }
];
function validateField({input,error,message}) {
  const valid = input.validity.valid && input.value.trim().length >= (input.minLength > 0 ? input.minLength : 1);
  input.setAttribute('aria-invalid', String(!valid));
  error.textContent = valid ? '' : message;
  return valid;
}
if (form) fieldRules.forEach((field) => field.input.addEventListener('input', () => validateField(field)));
if (form) form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const valid = fieldRules.map(validateField).every(Boolean);
  const status = $('#formStatus');
  if (!valid) { status.textContent = 'Corrige los campos indicados antes de enviar.'; fieldRules.find((field) => field.input.getAttribute('aria-invalid') === 'true')?.input.focus(); return; }
  const {emailjsPublicKey, emailjsServiceId, emailjsTemplateId} = CONFIG;
  if ([emailjsPublicKey,emailjsServiceId,emailjsTemplateId].some((value) => !value || value.startsWith('TU_'))) { status.textContent = 'Falta configurar EmailJS en js/main.js. El mensaje no se ha enviado.'; return; }
  if (!window.emailjs) { status.textContent = 'No se pudo cargar EmailJS. Revisa tu conexión a internet.'; return; }
  const button = $('#sendButton'); button.disabled = true; status.textContent = 'Enviando mensaje...';
  try {
    window.emailjs.init({ publicKey: emailjsPublicKey });
    await window.emailjs.sendForm(emailjsServiceId, emailjsTemplateId, form);
    status.textContent = '¡Mensaje enviado correctamente!'; form.reset();
    fieldRules.forEach(({input,error}) => { input.removeAttribute('aria-invalid'); error.textContent = ''; });
  } catch (error) { console.error('EmailJS:', error); status.textContent = 'No se pudo enviar el mensaje. Verifica las claves y vuelve a intentar.'; }
  finally { button.disabled = false; }
});

}
