import { categories, entries, reviewedAt } from './data.js';
import { escapeHTML as esc, formatDate, safeRead, safeWrite, selectEntries, validateDraft } from './core.js';

const $ = selector => document.querySelector(selector);
const params = new URLSearchParams(location.search);
const state = {
  category: categories.some(category => category.id === params.get('tema')) ? params.get('tema') : 'all',
  query: (params.get('q') || '').slice(0, 120),
  order: params.get('orden') === 'oldest' ? 'oldest' : 'newest'
};
let storage;
try { storage = window.localStorage; } catch { storage = null; }
let toastTimeout;
let returnFocus;

function notify(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
}

function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#theme-toggle').setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  $('#theme-icon').textContent = dark ? '☀' : '◐';
}

function toggleTheme() {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  if (!safeWrite(storage, 'kast-archivo-theme', theme)) notify('Tema aplicado. Este navegador no permite guardar la preferencia.');
  updateThemeLabel();
}

function updateURL() {
  const url = new URL(location.href);
  for (const key of ['tema', 'q', 'orden']) url.searchParams.delete(key);
  if (state.category !== 'all') url.searchParams.set('tema', state.category);
  if (state.query) url.searchParams.set('q', state.query);
  if (state.order !== 'newest') url.searchParams.set('orden', state.order);
  history.replaceState(null, '', url);
}

function render() {
  const visible = selectEntries(entries, state);
  $('#filters').innerHTML = categories.map(category => {
    const count = category.id === 'all' ? entries.length : entries.filter(entry => entry.category === category.id).length;
    return `<button class="filter-button${state.category === category.id ? ' active' : ''}" data-category="${category.id}" aria-pressed="${state.category === category.id}">${esc(category.label)} <span>${count}</span></button>`;
  }).join('');
  $('#timeline').innerHTML = visible.map(entry => {
    const index = entries.length - entries.indexOf(entry);
    const label = categories.find(category => category.id === entry.category).label;
    return `<article class="entry" id="${entry.id}" aria-labelledby="title-${entry.id}"><div class="entry-date"><time datetime="${entry.date}">${formatDate(entry.date, { day: '2-digit', month: 'short' })}</time><span>2026</span></div><div class="entry-content"><div class="entry-meta"><span class="category-label">${esc(label)}</span><span class="entry-status">${esc(entry.status)}</span></div><h3 id="title-${entry.id}"><a href="#${entry.id}">${esc(entry.title)}</a></h3><p class="entry-summary">${esc(entry.summary)}</p><details><summary>Ver contexto <span aria-hidden="true">+</span></summary><div class="entry-context"><p>${esc(entry.context)}</p><p class="entry-why">${esc(entry.why)}</p><p class="reviewed">Revisado el ${formatDate(reviewedAt)}.</p></div></details><div class="entry-bottom"><div class="source-list">${entry.sources.map(source => `<a class="source-link" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer" title="${esc(source.name)} · ${formatDate(source.date)}">${esc(source.name)} <span aria-hidden="true">↗</span><span class="sr-only"> (fuente, nueva pestaña)</span></a>`).join('')}</div><button class="share-button" data-share="${entry.id}" aria-label="Copiar enlace: ${esc(entry.title)}" title="Copiar enlace"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 0 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 1)"/></svg></button></div></div><div class="entry-number" aria-hidden="true">${String(index).padStart(2, '0')}</div></article>`;
  }).join('');
  $('#result-count').textContent = `${visible.length} de ${entries.length} casos${state.query ? ` para “${state.query}”` : ''}`;
  $('#empty-state').hidden = visible.length !== 0;
  $('#archive-end').hidden = visible.length === 0;
  $('#reset-filters').hidden = !state.query && state.category === 'all';
  updateURL();
}

function resetFilters() {
  state.category = 'all';
  state.query = '';
  $('#search').value = '';
  render();
}

function revealHash() {
  const id = location.hash.slice(1);
  if (!entries.some(entry => entry.id === id)) return;
  let article = document.getElementById(id);
  if (!article) {
    resetFilters();
    article = document.getElementById(id);
  }
  article.querySelector('details').open = true;
  requestAnimationFrame(() => article.scrollIntoView({ block: 'start' }));
}

$('#search').value = state.query;
$('#sort').value = state.order;
$('#total-count').textContent = entries.length;
$('#filters').addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  const category = button.dataset.category;
  state.category = category;
  render();
  $(`[data-category="${category}"]`).focus({ preventScroll: true });
});
$('#search').addEventListener('input', event => { state.query = event.target.value; render(); });
$('#sort').addEventListener('change', event => { state.order = event.target.value; render(); });
$('#reset-filters').addEventListener('click', resetFilters);
$('#empty-reset').addEventListener('click', () => { resetFilters(); $('#search').focus(); });
$('#theme-toggle').addEventListener('click', toggleTheme);
$('#timeline').addEventListener('click', async event => {
  const button = event.target.closest('[data-share]');
  if (!button) return;
  const url = new URL(location.origin + location.pathname);
  url.hash = button.dataset.share;
  try {
    await navigator.clipboard.writeText(url.href);
    notify('Enlace del caso copiado.');
  } catch {
    history.replaceState(null, '', url);
    notify('Enlace preparado en la barra de direcciones. Puedes copiarlo desde allí.');
  }
});

document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
  returnFocus = button;
  document.getElementById(button.dataset.open).showModal();
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => returnFocus?.focus());
});
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.altKey || event.metaKey || event.repeat || (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) || document.querySelector('dialog[open]')) return;
  if (event.key.toLowerCase() === 'd') { event.preventDefault(); toggleTheme(); }
  if (event.key === '/') { event.preventDefault(); $('#search').focus(); $('#archivo').scrollIntoView(); }
});

const form = $('#contribute-form');
const draftKey = 'kast-archivo-draft';
const draftFields = ['title', 'date', 'category', 'summary', 'source'];
const draftStatus = $('#draft-status');
$('#draft-category').insertAdjacentHTML('beforeend', categories.filter(category => category.id !== 'all').map(category => `<option value="${category.id}">${esc(category.label)}</option>`).join(''));
$('#draft-date').max = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());

function currentDraft() {
  return Object.fromEntries(draftFields.map(key => [key, form.elements.namedItem(key).value.trim()]));
}

try {
  const draft = JSON.parse(safeRead(storage, draftKey, '{}'));
  for (const key of draftFields) if (typeof draft?.[key] === 'string') form.elements.namedItem(key).value = draft[key].slice(0, key === 'title' ? 140 : 2000);
  if (draftFields.some(key => typeof draft?.[key] === 'string' && draft[key])) draftStatus.textContent = 'Borrador recuperado de este navegador. No se ha enviado a nadie.';
} catch {
  draftStatus.textContent = 'El borrador anterior no se pudo recuperar. Puedes crear uno nuevo.';
}

form.addEventListener('input', event => {
  const key = event.target.name;
  if (draftFields.includes(key)) {
    $(`#error-${key}`).textContent = '';
    event.target.removeAttribute('aria-invalid');
  }
  draftStatus.textContent = safeWrite(storage, draftKey, JSON.stringify(currentDraft())) ? 'Borrador guardado en este navegador. No se ha enviado a nadie.' : 'No se pudo guardar en este navegador. Puedes descargar el borrador para conservarlo.';
});
$('#clear-draft').addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
  form.querySelectorAll('.field-error').forEach(error => { error.textContent = ''; });
  const cleared = safeWrite(storage, draftKey, '{}');
  draftStatus.textContent = cleared ? 'Borrador borrado de este navegador.' : 'Formulario vaciado. No se pudo actualizar el almacenamiento del navegador.';
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const draft = currentDraft();
  const errors = validateDraft(draft);
  for (const key of draftFields) {
    $(`#error-${key}`).textContent = errors[key] || '';
    if (errors[key]) form.elements.namedItem(key).setAttribute('aria-invalid', 'true');
    else form.elements.namedItem(key).removeAttribute('aria-invalid');
  }
  if (Object.keys(errors).length) { form.elements.namedItem(Object.keys(errors)[0]).focus(); return; }
  const blob = new Blob([JSON.stringify({ ...draft, status: 'draft', published: false, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kast-archivo-borrador-${draft.date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  draftStatus.textContent = 'Borrador descargado. No se envió ni se publicó ningún caso.';
});

window.addEventListener('hashchange', revealHash);
window.addEventListener('popstate', () => {
  const current = new URLSearchParams(location.search);
  state.category = categories.some(category => category.id === current.get('tema')) ? current.get('tema') : 'all';
  state.query = (current.get('q') || '').slice(0, 120);
  state.order = current.get('orden') === 'oldest' ? 'oldest' : 'newest';
  $('#search').value = state.query;
  $('#sort').value = state.order;
  render();
  revealHash();
});
updateThemeLabel();
render();
revealHash();
