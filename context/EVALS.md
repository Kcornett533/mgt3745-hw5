# EVALS.md

The verification table from HW3, grown up. Five sections, in this order.
The first two are written and committed BEFORE any tool sees the spec.

## 1. RAT statement
The riskiest assumption in delegating Real-time Search and Filter to bolt.new is that it will implement client-side DOM filtering cleanly using safe `textContent` methods rather than introducing unsafe `innerHTML` re-rendering or direct DOM mutations.

## 2. Prediction Stake (before build, October 1, 2026 8:46 PM)
- **Tight:** At least 3 of 4 EARS rows will pass on the tool's first output.
  - Resolved October 1, 2026: _ of 4.
- **Loose:** bolt will follow STYLE.md tokens better than AI Studio.
  - Resolved October 1, 2026: Pending comparison.
- **Open:** The tool will introduce a dependency or attempt to create a parallel state array in package.json/app.js. Resolves when inspecting code diffs.
  - Resolved October 1, 2026: Pending inspection.

## 3. Success criteria
| EARS row (feature) | Checked by | Where |
|---|---|---|
| WHEN user types in search box, filter entries in real time | test | evals/worker.test.js |
| IF no entries match, display "No matching provenance records found" | judgment | docs/JUDGMENT.md #10 |
| WHEN search field is cleared, restore all original entries | human | README, See It Work |

## 4. Error-analysis log
| Failure (a few words) | Count | Source | Category |
|---|---|---|---|

## 5. Evals
- **Code:** `npm test` with `API=https://mgt3745-hw4.kcornett533.workers.dev`; 3 tests passing.
- **Judgment:** docs/JUDGMENT.md, 10 questions, two graders, agreement 100%.
## Verification table (carried from HW4)
| Acceptance Statement | Test Method | Result | Notes |
| :--- | :--- | :--- | :--- |
| System generates unique `MAN-` IDs. | Create 3 entries, inspect DOM array. | PASS | IDs generated accurately. |
| System validates 64-char hex signatures. | Enter a 63-char string and submit. | PASS | Form rejects input successfully. |
| Data survives browser cache clear. | Clear site data, refresh page. | PASS | *(Formerly CANNOT TEST YET)* Now fetches directly from D1 database via Worker. |
| Network is down / offline. | Turn off Wi-Fi, attempt POST. | PASS | UI displays error badge without throwing console crash. |
| Server returns 400 Bad Request. | Submit empty payload via cURL. | PASS | Worker returns 400 validation error correctly. |
| Server returns 500 error. | Force script error on worker. | CANNOT TEST YET | Do not yet know how to reliably simulate a server crash from the client side. |
| Second client writes to same table. | Two users submit simultaneously. | DEFERRED | Real-time conflict resolution is deferred as per ADR-002. |