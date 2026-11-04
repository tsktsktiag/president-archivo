# Scope and implementation

## Purpose

Build a visually considered Chilean adaptation of clawd.rip: a critical public memory archive focused on decisions, controversies, and failures associated with the government of José Antonio Kast. The first release is Spanish language, independent, source based, and dated rather than presented as a complete verdict on the administration.

The project is self contained. Run the commands in the README from its repository root.

## Implemented scope

| Area | Implementation |
| --- | --- |
| Editorial identity | “Kast, en el archivo”; original mark, serif headlines, restrained blue and red, conceptual architectural artwork. |
| Timeline | Six entries from March through October 2026, newest first, with stable case IDs and reversible date order. |
| Discovery | Topic counts, combined category and text filters, accent insensitive multiword search, and an explicit empty state with reset. |
| Evidence | Source name, source date, external article link, event date, report status, expandable context, and review date. |
| Sharing | Stable hash links to each case. Opening a case reveals its context, including when the URL contains incompatible filters. Copy uses the Clipboard API with an address bar fallback. |
| Theme | Light and dark themes, system preference on first visit, local preference persistence, button control, and `D` shortcut. |
| Contributions | Validated local browser draft, recovery after reload, deletion, JSON export, and an explicit unpublished status. No server submission. |
| Accessibility | Semantic structure, skip link, labels and inline errors, native dialogs, Escape dismissal, focus restoration, reduced motion, and keyboard search shortcut. |
| Delivery | A static deployable directory, local preview server, automated core checks, and a retained private Sites project identity. |

The archive covers six distinct subjects: sentence reduction controversy, the original 2027 school computer funding proposal, the September economic balance, comments about CASEN, authority turnover, and the official “Estado en quiebra” post. Entries attribute reporting and include qualifications where the outcome or interpretation remains disputed.

## Reference investigation

[clawd.rip](https://clawd.rip/) was inspected in a live Chrome session and through the explicitly requested reverse-engineer-anything skill using REA.

- Observed: a large editorial heading, timeline, dated topic labels, external sources, internal full story links, a date order button, and a persistent dark theme with a `D` shortcut.
- A controlled REA browser scenario exercised the date order button. The resulting DOM contained `data-order="oldest"` and the reverse-action label. The owned browser process was terminated by REA afterward.
- Inspection of the delivered scripts confirmed date reordering, local theme storage, visibility effects, and decorative click effects. This is evidence about the delivered client, not access to its original repository or backend.
- Adaptation choices: context expands inline instead of opening separate article pages; explicit search and category filters were added; decorative particle effects were omitted. The identity, copy, data, code, and artwork were created for this project.
- Unknown: the reference's private source, authoring process, server implementation, and unobserved flows. No claim of a complete source reconstruction is made.

Raw captures, session identifiers, and inspection state are not included in the GitHub source. This document retains the relevant observations and limits.

## Visual direction

The design uses an editorial language suited to an archive: strong typographic hierarchy, open space, a dated vertical rule, and source links visibly attached to each entry. Desktop uses a split hero and a date/content/index layout; mobile collapses the hero and keeps dates beside a single timeline column.

The main colors are **blue `#0f69b4`** and **red `#eb3c46`**, verified against the [Government of Chile's 2024 visual communication manual](https://www.cultura.gob.cl/wp-content/uploads/2024/05/manual-de-comunicacion-visual-gob-2024.pdf). Darker shades or lighter theme variants provide readable text. No government logo is used, and the page explicitly states that it is independent.

DM Sans is self hosted with its SIL Open Font License. Headlines use the system Georgia serif stack. The final hero asset is `dist/assets/la-moneda.jpg`, optimized to approximately 162 KB from the generated PNG.

The built-in image generation tool was used. The production brief was: a refined conceptual illustration of Chile's seat of government as white and blue miniature voxel architecture, a small Chilean flag, and a red archival folder, on a pale studio background, without people, lettering, or logos. The result is a stylized interpretation, not an architecturally exact image or documentary evidence. The generated original remains outside the repository; the selected optimized asset is included for the site.

## Architecture

The application uses native HTML, CSS, and JavaScript modules. It needs no dependencies, build pipeline, external API, authentication, or environment credentials. All runtime assets, including the font, are served from the site origin.

| File | Responsibility |
| --- | --- |
| `dist/index.html` | Document structure, metadata, navigation, archive shell, editorial criteria, and contribution dialog. |
| `dist/style.css` | Theme tokens, typography, desktop and mobile layouts, interactive states, print rules, and reduced motion. |
| `dist/theme.js` | Apply the stored or system theme before rendering to avoid a theme flash. |
| `dist/data.js` | Curated entries, categories, review date, and original source links. |
| `dist/core.js` | Search and sorting, HTML escaping, draft validation, date formatting, and resilient storage helpers. |
| `dist/app.js` | Render and filter entries, synchronize URLs, reveal cases, share links, manage dialogs, theme controls, and draft export. |
| `scripts/serve.mjs` | Dependency free localhost server; serves only files inside `dist`, rejects unsupported methods, and does not expose directory listings. |
| `tests/core.test.mjs` | Node tests for content shape, filters, chronology, storage failure, validation, escaping, and Chilean date formatting. |
| `.openai/` (ignored) | Optional local hosting identity and deployment configuration; excluded from GitHub. |

URL parameters `tema`, `q`, and `orden` preserve archive filters. A fragment identifies a case. User entered text is rendered as text or escaped. Draft links accept public HTTP(S) URLs and reject script schemes, credential bearing URLs, and invalid input. The application does not fetch contributed URLs.

`localStorage` contains only the theme preference and the optional draft. Access is guarded against blocked storage and quota failures. No analytics or tracking scripts are included. JSON export uses a temporary object URL and removes the temporary download link, then revokes the URL.

## Editorial sources

Chilean news reporting is limited to the user's selected outlets: **BBCL (BioBioChile), Diario Financiero, El Ciudadano, EL PAÍS, and Radio Universidad de Chile**. Published source links are checked against `biobiochile.cl`, `df.cl`, `elciudadano.com`, `elpais.com`, and `radio.uchile.cl`. The current six cases use BBCL and EL PAÍS; this policy does not require every case to cite all five outlets. The government identity manual is a separate design reference. Private contribution drafts remain subject to source review before publication.

The links and dates are retained alongside each entry in `dist/data.js`:

- [Sentence reductions — EL PAÍS, 22 October 2026](https://elpais.com/chile/2026-10-22/la-presidenta-de-la-corte-suprema-por-la-rebaja-de-condenas-a-agresores-sexuales-de-menores-fue-el-ministro-de-justicia-quien-dicto-los-decretos.html).
- [School computer funding proposal and earlier campaign statement — BBCL, 5 October 2026](https://www.biobiochile.cl/noticias/nacional/chile/2026/10/05/cuando-kast-propuso-entregar-computadores-a-todos-los-estudiantes-de-la-educacion-publica.shtml).
- [Economic balance — EL PAÍS, 14 September 2026](https://elpais.com/chile/2026-09-14/kast-tras-seis-meses-de-gobierno-tenemos-una-situacion-inflacionaria-mas-alta-de-la-que-esperabamos-y-un-nivel-de-crecimiento-mas-bajo-del-proyectado.html).
- [CASEN controversy — EL PAÍS, 11 August 2026](https://elpais.com/chile/2026-08-11/las-criticas-de-kast-a-la-casen-indignan-a-los-exministros-de-boric-da-a-entender-que-la-pobreza-no-se-redujo-en-chile-y-que-el-pesimismo-se-justifica.html).
- [Authority turnover — EL PAÍS, 28 July 2026](https://elpais.com/chile/2026-07-28/la-alta-rotacion-de-autoridades-marca-los-primeros-cuatro-meses-del-gobierno-de-kast.html).
- [Official social media post — BBCL, 25 March 2026](https://www.biobiochile.cl/especial/bbcl-investiga/noticias/de-pasillo/2026/03/25/estado-en-quiebra-contraloria-pide-explicaciones-a-sedini-por-polemico-posteo-que-enredo-a-quiroz.shtml), with [follow-up on the ordered administrative inquiry — BBCL, 29 April 2026](https://www.biobiochile.cl/noticias/nacional/chile/2026/04/29/estado-en-quiebra-contraloria-advierte-imprecisiones-y-ordena-sumario-en-segegob-que-lidera-sedini.shtml).

This is a bounded research collection, not an assertion that these are all the administration's failures. A source link records attribution, not proof of every possible interpretation. Proposed budget exclusions are identified as proposals; requests for information are not presented as sanctions. Source content is summarized in original wording rather than copied in full.

## Verification

The six automated Node tests pass, and the application modules and preview server pass syntax checking. Browser verification uses the actual local application served over HTTP. Responsive checks cover 320, 390, 768, 1024, and 1440 pixel widths, with no horizontal page overflow at any checked size.

Verified browser interactions include category filtering, combined search and filters, accent insensitive search, empty state reset, chronological reversal, expanded context, deep links overriding incompatible filters, theme preference recovery, draft recovery after reload, invalid source rejection, and draft clearing. The `D` and `/` handlers were exercised through dispatched keyboard events; native browser key actions also confirmed the `D` theme shortcut, modal navigation, Escape dismissal, and focus restoration to the visible opener.

The JSON export handler was exercised and its Blob inspected: data matched the inputs, `published` was false, the temporary anchor was removed, and the object URL was revoked. This validates export generation and cleanup; it does not verify a user's operating system download location.

Failure checks deliberately simulated inaccessible browser storage and throwing storage methods. The application still rendered six cases and allowed theme changes and draft editing, while displaying that draft persistence failed. These are injected failure conditions, not a naturally occurring storage outage. The ordinary reload persistence checks used actual browser local storage.

Local HTTP probes returned 200 for the page, image, and font; 404 for missing files and an attempted source path; and 405 for POST. These are localhost serving checks. News source research is separate from local tests, and there are no mocked vote totals, fabricated user submissions, or claims of actual public moderation.

Owner-private publication was confirmed by a successful hosting result on 25 October 2026, separately from the local browser checks. The deployment URL and hosting identity are local configuration and are excluded from the GitHub source. Configure a separate deployment destination when using this repository.

## GitHub publication boundaries

The GitHub source includes application files, the selected image and licensed font, portable documentation, and the test suite. It excludes local hosting identity, workspace paths, private preview URLs, credentials, environment files, session captures, runtime data, logs, and deployment archives. Browser drafts and theme preferences remain in each visitor's browser and are not repository files. `PORT` is an optional runtime environment variable; its local value is not committed.

GitHub publication starts from a sanitized source snapshot rather than replaying the private preview's Git history. Set production canonical and social image URLs only when configuring a deployment; no private deployment origin is embedded in the portable HTML.

## Deliberate limits and follow-up scope

The release does not include a shared submissions inbox, public voting, accounts, an admin dashboard, automatic news ingestion, or automatic updates. These were not observed as required core reference behavior. Public contributions would require a real persistence layer, moderation permissions, rate limits, an editorial review workflow, and an operator selected contact path.

The starter collection should receive continuing editorial review, including response links, source corrections, and updates when proposals become final decisions. Current review date: **25 October 2026**. Publishing this private preview does not make it a public civic service or configure a custom domain.
