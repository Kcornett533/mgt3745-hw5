# SKILLS.md

Reusable patterns and delegation guidance, written so an agent (or a
stranger) could apply them next time. Each entry under fifteen lines.
Load-on-demand: an agent reads the heading first and the body only when relevant.

## Pattern: fetch with the failure shown on the page
**When:** Any network call from `app.js` to the Cloudflare Worker API.
**Do:** Check `res.ok`; on failure, read `res.text()` or response payload and assign it to the error container via `textContent`. Wrap in `try/catch` to handle network dropouts, and never throw uncaught exceptions to the console.
**Because:** LocalStorage never failed silently; edge networks do ([ADR-002](context/ARCHITECTURE.md#adr-002-entries-move-from-localstorage-to-cloudflare-d1)).

## Delegation guidance: what to paste, what to check first
**Paste, in order:** PROJECT, FEATURES (marked rows), STYLE, STANDARDS, TOOLS, then target source files. Include one instruction line specifying allowed files to touch.
**Check first:** The git diff file list, strict `textContent` DOM usage, parameterized SQL bindings, and adherence to design tokens.
**Reliably wrong (this week):** Omitting required schema payload parameters (such as `executionParams` or `fileSignature`).

## Pattern: Safe DOM rendering without innerHTML
**When:** Displaying dynamic provenance records or status messages in the UI.
**Do:** Instantiate nodes using `document.createElement()`, assign textual values directly using `.textContent`, and append nodes to parent containers using `.appendChild()`.
**Because:** Eliminates cross-site scripting (XSS) vectors and strictly enforces repository security compliance ([STANDARDS.md](context/STANDARDS.md)).