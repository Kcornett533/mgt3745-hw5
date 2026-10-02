# ARCHITECTURE.md

Decisions, in order. An ADR is never edited after it is accepted; it is superseded.

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | 0.20 | 5 | 4 | 5 |
| Cost to maintain | 0.20 | 5 | 3 | 2 |
| Time to working | 0.20 | 4 | 4 | 5 |
| Inspectability | 0.20 | 5 | 3 | 1 |
| Switching cost | 0.10 | 4 | 2 | 1 |
| Fit to spec | 0.10 | 5 | 4 | 3 |
| **Weighted total** | **1.00** | **4.70** | **3.50** | **3.20** |

*Keep your HW3 weights unless you can say in one sentence why one changed.*
Weights remain unchanged from HW3 because system trade-offs between speed, cost, and developer control remain identical when upgrading the persistence layer.

---

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Accepted  
**Supersedes:** ADR-001

### Context

When submitting a new provenance record, the payload (`pipelineName`, `executionParams`, `fileSignature`, `notes`) leaves the browser client via a HTTPS POST request to a Cloudflare Worker edge function, which executes parameterized SQL queries to store the record in a Cloudflare D1 SQLite database bound under Cloudflare's standard Terms of Service; the repository maintainer retains full ownership and operational accountability for database access controls and schema integrity.

### Decision

We will persist provenance records in Cloudflare D1 via a Cloudflare Worker API rather than client-side `localStorage`, using server-side parameterization for SQL operations to ensure data persistence across browser sessions and cache clears.

### Alternatives considered

* **Buy (Hosted BaaS - Supabase/Firebase):** Scored **3.50**; provides rapid setup but adds third-party SDK dependencies and higher long-term vendor lock-in compared to native Worker bindings.
* **Delegate (AI Builder Hosting):** Scored **3.20**; enables zero-code deployment speed but severely lacks data inspectability, direct SQL query control, and custom domain configuration.

### Consequences

* **What got harder:** Local development and automated testing now require managing network mocks, handling API latency, and handling remote database connection failures gracefully.
* **Benefits:** Data persists reliably across browser cache resets and multiple client devices while preventing raw client-side SQL injection through parameterized Worker queries.

### Revisit trigger

This decision should be revisited if user authentication is introduced requiring multi-tenant access controls, or if read/write volumes exceed Cloudflare D1 free-tier quota limits.

---

## ADR-001: Store entries in localStorage

**Status:** Superseded by ADR-002

### Context

Provenance entries need a simple, zero-cost client-side storage mechanism during initial prototyping without introducing backend deployment overhead or remote data privacy risks.

### Decision

Store all provenance entries directly in the browser's `localStorage` as serialized JSON objects.

### Alternatives considered

* **Remote Database:** Deferred due to unnecessary setup complexity and configuration overhead during initial frontend prototyping.

### Consequences

* Fast, local-only execution with zero network latency or hosting costs.
* Data is strictly bound to a single browser session/device and is lost if the user clears browser cookies or storage cache.

### Revisit trigger

When provenance entries must persist across devices or survive browser cache clears.
