import { test } from 'node:test';
import assert from 'node:assert/strict';
import { entries, categories } from '../dist/data.js';
import { escapeHTML, formatDate, normalize, safeRead, safeWrite, selectEntries, validateDraft } from '../dist/core.js';

test('curated entries have unique IDs, valid dates, known topics and public sources', () => {
  const approvedNewsHosts = new Set(['biobiochile.cl', 'df.cl', 'elciudadano.com', 'elpais.com', 'radio.uchile.cl']);
  assert.equal(new Set(entries.map(entry => entry.id)).size, entries.length);
  for (const entry of entries) {
    assert.match(entry.id, /^[a-z0-9-]+$/);
    assert.equal(new Date(`${entry.date}T12:00:00Z`).toISOString().slice(0, 10), entry.date);
    assert.ok(categories.some(category => category.id === entry.category));
    assert.ok(entry.context && entry.status && entry.sources.length);
    for (const source of entry.sources) {
      const sourceURL = new URL(source.url);
      assert.equal(sourceURL.protocol, 'https:');
      assert.ok(approvedNewsHosts.has(sourceURL.hostname.replace(/^www\./, '')), `Unapproved news source: ${sourceURL.hostname}`);
      assert.ok(source.date && source.name);
    }
  }
});

test('search ignores accents and case, intersects topics, and returns a real empty state', () => {
  assert.equal(normalize('  EDUCACIÓN  '), 'educacion');
  assert.equal(selectEntries(entries, { query: 'EDUCACIÓN', category: 'educacion' }).length, 1);
  assert.equal(selectEntries(entries, { query: 'CASEN Marcel' })[0].id, 'cuestionamientos-casen');
  assert.equal(selectEntries(entries, { query: 'CASEN', category: 'economia' }).length, 0);
  assert.equal(selectEntries(entries, { query: '<script>alert(1)</script>' }).length, 0);
});

test('date sorting reverses chronology without mutating the collection', () => {
  const original = entries.map(entry => entry.id);
  const oldest = selectEntries(entries, { order: 'oldest' });
  const newest = selectEntries(entries);
  assert.equal(oldest[0].id, 'estado-en-quiebra');
  assert.deepEqual(newest.map(entry => entry.id), oldest.map(entry => entry.id).reverse());
  assert.deepEqual(entries.map(entry => entry.id), original);
});

test('storage round trips and fails safely when access is blocked or quota is exceeded', () => {
  const map = new Map();
  const storage = { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value) };
  assert.equal(safeWrite(storage, 'theme', 'dark'), true);
  assert.equal(safeRead(storage, 'theme'), 'dark');
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } };
  assert.equal(safeRead(blocked, 'draft', '{}'), '{}');
  assert.equal(safeWrite(blocked, 'draft', '{}'), false);
  assert.equal(safeWrite(null, 'theme', 'dark'), false);
});

const validDraft = { title: 'Un caso documentado', date: '2026-03-25', category: 'gestion', summary: 'Un resumen suficientemente extenso para documentar lo ocurrido.', source: 'https://example.org/noticia' };

test('drafts require a real date, bounded content, known topic and a safe source', () => {
  assert.deepEqual(validateDraft(validDraft), {});
  assert.ok(validateDraft({ ...validDraft, date: '2026-02-30' }).date);
  assert.ok(validateDraft({ ...validDraft, date: '2099-12-31' }).date);
  assert.equal(Object.keys(validateDraft({})).length, 5);
  for (const source of ['javascript:alert(1)', 'data:text/html,hello', 'https://user:secret@example.org', 'file:///private', 'not a url', 'https://localhost']) assert.ok(validateDraft({ ...validDraft, source }).source);
  assert.ok(validateDraft({ ...validDraft, summary: 'x'.repeat(2001), category: 'unmoderated' }).summary);
});

test('rendered content is escaped and dates remain in the Chilean calendar', () => {
  assert.equal(escapeHTML('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  assert.match(formatDate('2026-03-25'), /25/);
});
