# ADR-003: Selection of Google Cloud Run for Analytics Gateway Hosting

* **Status:** Accepted
* **Date:** 2026-10-08
* **Context:** MGT 3745 HW5 Bonus — Analytics Gateway Deployment

## Context and Problem Statement
The analytics gateway (`mgt3745-hw5-bonus`) requires an isolated, scalable server environment to handle incoming HTTP requests and process event payloads. We need to decide between hosting the server on serverless container infrastructure (Google Cloud Run) or edge worker scripts (Cloudflare Workers / AWS Lambda).

## Decision Drivers
* Ease of deployment for standard Express.js node applications.
* Minimal cold-start latency for low-frequency grading traffic.
* IAM permission controls and visibility.

## Considered Options
1. **Option 1:** Google Cloud Run (Containerized Express.js application)
2. **Option 2:** Cloudflare Workers (Edge V8 isolate functions)

## Decision Outcome
**Chosen Option:** Option 1 — Google Cloud Run

### Key Trade-Offs Named:
* **Vendor Lock-in vs. Portability:** Staying on edge workers (Option 2) offers zero cold-start time and minimal cost, but limits the runtime environment to standard Web APIs and requires refactoring Node.js Express routes into isolate handlers. Google Cloud Run (Option 1) introduces slight cold-start latency when scaling from zero, but accepts standard Docker/Node.js web frameworks directly without code restructuring.

## Pros and Cons of the Options

### Google Cloud Run (Chosen)
* **Good:** Directly executes standard Express.js server code without architectural rewrites.
* **Good:** Native integration with Google Cloud IAM and Build pipelines.
* **Bad:** Marginally higher cold-start time when spinning up idle instances compared to edge workers.

### Cloudflare Workers
* **Good:** Sub-millisecond startup times and global edge distribution.
* **Bad:** Non-standard Node.js runtime limits native library compatibility and requires custom request/response routing.
