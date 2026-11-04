# Delivery plan

- [x] Create a separate project directory.
- [x] Inspect clawd.rip's rendered layout and behavior with Chrome and REA.
- [x] Verify Chile's official blue and red against the government identity manual.
- [x] Research a bounded starter collection of six dated news events.
- [x] Implement the editorial archive, sources, details, filters, search, date sorting, and theme persistence.
- [x] Add an accessible contribution draft with explicit local storage and JSON export.
- [x] Validate desktop, mobile, keyboard, deep links, invalid inputs, and unavailable storage.
- [x] Document scope, implementation, reference evidence, editorial sources, test boundaries, and remaining public contribution work.
- [x] Configure the retained owner-private Sites identity and static publication target.
- [x] Synchronize source, package the static site, and confirm successful owner-private publication.
- [x] Limit Chilean reporting to BBCL, Diario Financiero, El Ciudadano, EL PAÍS, and Radio Universidad de Chile; enforce the approved domains in content checks.
- [x] Add BBCL's April follow-up to the March social media controversy while preserving the original event date.

Release validation: six automated core tests pass. Browser checks cover 320, 390, 768, 1024, and 1440 pixel widths with no horizontal page overflow. Storage failure checks are deliberately injected; ordinary draft and theme recovery use actual browser storage. Export generation and object URL cleanup were verified in the browser.

The private preview was published on 25 October 2026. Deployment identity and private preview URLs are retained outside the GitHub source.

- [x] Prepare portable documentation and remove private preview URLs and machine-specific paths.
- [x] Exclude local hosting configuration, environment files, runtime data, logs, and archives from GitHub publication.
- [x] Run the six existing tests and syntax checks against the sanitized source.
- [x] Scan the exact publication contents for common secret formats, local paths, private deployment identifiers, and image metadata.
- [ ] Push a clean source history to the public GitHub repository `tsktsktiag/president-archivo`.

The site is a curated snapshot reviewed on 25 October 2026. It is not an automated news feed or an exhaustive audit of the administration. Contributions require an editorial workflow before public collection can be enabled.
