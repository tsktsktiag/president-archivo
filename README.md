# Kast, en el archivo

An independent Spanish language archive of controversies involving José Antonio Kast's government. Inspired by the editorial timeline at [clawd.rip](https://clawd.rip/), with an original identity using Chilean government blue and red.

Source: [tsktsktiag/president-archivo](https://github.com/tsktsktiag/president-archivo).

## Run locally

Requires Node.js 22 or newer. No installation, API keys, environment file, database, or build step is needed.

```powershell
cd president-archivo
npm.cmd run dev
```

Open **http://127.0.0.1:4173**. On other operating systems, use `npm run dev`. Set `PORT` in the environment to change the port. The preview binds to the local computer only. Stop it with Ctrl+C.

```powershell
npm.cmd run check
```

This checks JavaScript syntax and runs the Node test suite.

## Experience

- Six dated, sourced entries, category filters, accent insensitive search, and reversible date sorting.
- Expandable context, links to original reporting, and individual shareable case links.
- Light and dark themes, saved locally; press `D` to switch or `/` to search.
- Editorial criteria and a contribution form that saves a browser draft and exports JSON.
- Mobile layouts, keyboard support, native modal focus handling, and reduced motion support.

Contributions **are not submitted to a server or published**. The interface explains this before collecting any draft. The archive is a curated snapshot reviewed on **25 October 2026**, not a live news feed.

Read [SCOPE_AND_IMPLEMENTATION.md](SCOPE_AND_IMPLEMENTATION.md) for scope, design choices, architecture, research evidence, verification, and the remaining work for shared public contributions. See [REQUIREMENTS.md](REQUIREMENTS.md) and [PLAN.md](PLAN.md) for the delivery contract and checklist.

## Edit the archive

Published content lives in `dist/data.js`. Each entry requires a stable ID, date, category, status, original summary, context, and at least one source with its own date. Keep disputed allegations and proposals distinct from established outcomes. Update `reviewedAt`, the review date in `dist/index.html`, and the documentation after reviewing the collection. The unit suite validates the entry schema and source URLs.

Use **BBCL (BioBioChile), Diario Financiero, El Ciudadano, EL PAÍS, and Radio Universidad de Chile** for Chilean reporting. The content checks enforce these outlets' domains for published news links, including `radio.uchile.cl`. Local contribution drafts are unpublished and still require editorial source review. The government identity manual is retained solely as a design reference.

`dist/` is the deployable site itself. Serve it as a static directory at the origin root. Configure the destination and any canonical or social image URLs for your own deployment. Machine-specific paths, private preview URLs, hosting identities, environment files, and generated runtime data are excluded from the GitHub source. Keep any local hosting configuration in the ignored `.openai/` directory.

The DM Sans font is bundled under the SIL Open Font License in `dist/assets/OFL-DMSans.txt`. The hero artwork is an AI generated conceptual illustration, not a news photograph. Source articles remain the property of their respective publishers; this project links to them and uses original short summaries.
