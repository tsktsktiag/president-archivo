export function normalize(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-CL').trim();
}

export function selectEntries(entries, { category = 'all', query = '', order = 'newest' } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    const haystack = normalize([entry.title, entry.summary, entry.context, entry.category, entry.status, ...entry.sources.map(source => source.name)].join(' '));
    return (category === 'all' || entry.category === category) && terms.every(term => haystack.includes(term));
  }).sort((a, b) => order === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
}

export function safeRead(storage, key, fallback = '') {
  try {
    return storage?.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite(storage, key, value) {
  try {
    if (!storage) return false;
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function validateDraft(draft) {
  const errors = {};
  if (typeof draft.title !== 'string' || draft.title.trim().length < 10 || draft.title.trim().length > 140) errors.title = 'Escribe un título de entre 10 y 140 caracteres.';
  const date = typeof draft.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(draft.date) ? new Date(`${draft.date}T12:00:00Z`) : new Date(NaN);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== draft.date || draft.date > new Date().toISOString().slice(0, 10)) errors.date = 'Selecciona una fecha válida que no esté en el futuro.';
  if (typeof draft.summary !== 'string' || draft.summary.trim().length < 30 || draft.summary.trim().length > 2000) errors.summary = 'Describe lo ocurrido en entre 30 y 2.000 caracteres.';
  try {
    const url = new URL(draft.source);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) throw new Error('invalid');
  } catch {
    errors.source = 'Agrega un enlace público de una fuente (https://…).';
  }
  if (!['instituciones', 'educacion', 'economia', 'declaraciones', 'gestion'].includes(draft.category)) errors.category = 'Selecciona un tema.';
  return errors;
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

export function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Intl.DateTimeFormat('es-CL', { ...options, timeZone: 'America/Santiago' }).format(new Date(`${value}T12:00:00Z`));
}
