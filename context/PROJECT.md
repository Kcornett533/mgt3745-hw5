# PROJECT.md


## Problem statement

Data provenance in computational workflows is frequently lost or fragmented across unstructured terminal logs and manual local notes, making scientific or analytical results difficult to audit, verify, and reproduce. The Provenance Logger provides a centralized, lightweight interface that captures execution parameters, pipeline metadata, and 64-character SHA-256 cryptographic file signatures, ensuring that data pipeline records are immutably logged, easily searchable, and resilient across sessions.

## Who it is for

* **Primary Users:** Computational researchers, data engineers, and biomedical researchers (such as student lab researchers managing complex signal processing or device execution datasets) who need to log, trace, and inspect pipeline execution parameters and dataset integrity.
* **Secondary Users:** Course instructors, peer auditors, and project collaborators who need to query, filter, and inspect execution histories and verify dataset signatures without requiring access to local machine logs.

## Scope

* **In:**
  * Real-time client-side search and filtering by pipeline name and notes.
  * Entry list rendering with safe DOM text insertion methods (`textContent`).
  * Server-side persistence utilizing Cloudflare Worker endpoints connected to a Cloudflare D1 SQLite database.
  * SHA-256 64-character hex file signature validation and unique `MAN-` ID generation.
  * EARS acceptance criteria and automated unit test suite verification (`evals/worker.test.js`).
* **Out:**
  * Native desktop file-system directory crawling or automated local file watching.
  * Heavy external frontend frameworks (React, Vue, Angular) — built strictly using plain HTML, CSS custom properties, and vanilla JS.
* **Deferred:**
  * Multi-tenant user authentication and access control permission tiers (deferred per ADR-002).
  * Real-time websocket collaboration or multi-client conflict resolution algorithms.

## Constraints

* **Time & Submission:** Strict project delivery requirements matching course HW5 specification guidelines.
* **Platform & Stack:** Cloudflare Worker serverless runtime, Cloudflare D1 serverless relational database, Node.js v22 test runner, hosted via GitHub Pages or local Live Server.
* **Data Integrity & Security:** Parameterized SQL queries strictly enforced (`prepare(...).bind(...)`) to prevent SQL injection; mandatory client-side input validation for 64-character hex strings; safe DOM text rendering (`textContent`) with zero `innerHTML` usage.
* **Trust Boundary Policy:** API requests transit from client browsers to Cloudflare edge infrastructure over HTTPS, with external AI delegation boundaries (bolt.new / Copilot) documented in DDR files (`docs/DDR-001.md`, `docs/DDR-002.md`).