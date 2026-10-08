# Real-Time Search & Filter: The First Delegated Feature

> Data provenance tracking with edge backend persistence and real-time client-side search.

## What

HW4 repository: [https://github.com/Kcornett533/mgt3745-hw4](https://github.com/Kcornett533/mgt3745-hw4)

The Provenance Logger captures pipeline parameters and 64-character SHA-256 cryptographic file signatures for computational researchers and peer auditors specified in [PROJECT.md](context/PROJECT.md). This release introduces a real-time client-side search and filtering feature delegated to bolt.new as specified in [FEATURES.md](context/FEATURES.md). Provenance records now reside in a Cloudflare D1 SQLite database backed by a Cloudflare Worker API so entries survive browser cache clears and remain accessible across devices per [ADR-002](context/ARCHITECTURE.md#adr-002-entries-move-from-localstorage-to-cloudflare-d1).

## See It Work

A real-time search interface filtering records dynamically as the user types without making unnecessary network requests:

![See it work](docs/demo.png)

## Test Verification

All worker evaluation and unit tests pass against the live Cloudflare deployment:

![Passing Tests](docs/test-passing.png)

```mermaid
flowchart LR
    A[Page loads] --> B[GET /entries]
    B --> C[Render entry cards]
    D[User types search query] --> E[Filter local state array]
    E --> F[Update DOM via textContent]
    G[User submits form] --> H[POST /entries]
    H -->|201 Created| B
    H -->|400 Bad Request| I[Display UI error message]
    B -->|Network failure| I
    
## Status
* **Build & Test Status**: Operational & Passing
* **Cloudflare Worker API**: Deployed to Production
* **Cloudflare D1 Database**: Binding Active (`mgt3745-entries`, UUID: `37d3c2e6-8305-4e69-b34f-d582ffb1da4f`)
* **Security & DOM Handling**: Fully remediated (`innerHTML` usage eliminated; using safe `textContent` / DOM creation methods)

## Delegation
* **Human Effort**: Architecture & system specifications, D1 database binding & schema setup, Cloudflare API permission scoping, security auditing (`innerHTML` remediation), manual verification, automated test setup, and documentation.
* **AI Assistance (bolt.new)**: Generating initial client-side search UI component, Worker boilerplate endpoints, and initial test file structure.

## Links
* **GitHub Repository**: [https://github.com/Kcornett533/mgt3745-hw5](https://github.com/Kcornett533/mgt3745-hw5)
* **HW4 GitHub Repository**: [https://github.com/Kcornett533/mgt3745-hw4](https://github.com/Kcornett533/mgt3745-hw4)
* **Live Cloudflare Worker**: [https://mgt3745-hw5.kamyaab-cornett1.workers.dev](https://mgt3745-hw5.kamyaab-cornett1.workers.dev)

## Hours
* **Total Time Spent**: ~6.5 Hours
  * *Architecture, D1 Schema & Cloudflare Binding Setup*: 2.0 hrs
  * *Code Refactoring & Security Hardening*: 1.5 hrs
  * *Automated Testing & Edge Debugging*: 1.5 hrs
  * *Documentation & Asset Preparation*: 1.5 hrs
