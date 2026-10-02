# EVALS.md

## 1. RAT statement
The riskiest assumption in delegating Search & Filter to bolt.new is that it will implement client-side DOM filtering cleanly using safe `textContent` methods rather than introducing unsafe `innerHTML` re-rendering or direct DOM mutations.

## 2. Prediction Stake (before build, October 1, 2026 8:00 PM)
- **Tight:** At least 3 of 4 EARS rows will pass on the tool's first output.
  - Resolved October 1, 2026: _ of 4.
- **Loose:** bolt will follow STYLE.md tokens (colors and fonts) better than AI Studio.
  - Resolved October 1, 2026: Pending comparison.
- **Open:** The tool will introduce a dependency or attempt to create a parallel state array. Resolves when inspecting app.js diff.
  - Resolved October 1, 2026: Pending inspection.

## 3. Success criteria
| EARS row (feature) | Checked by | Where |
|---|---|---|
| WHEN ..., THE SYSTEM SHALL ... | test | evals/worker.test.js, "..." |
| IF ..., THEN THE SYSTEM SHALL ... | judgment | docs/JUDGMENT.md #8 |
| THE SYSTEM SHALL ... | human | README, See It Work |

## 4. Error-analysis log
<!-- Every failure observed, a few words each, counted, sorted by count. -->
| Failure (a few words) | Count | Source | Category |
|---|---|---|---|
| Buttons used its own blue, not color-primary | 2 | bolt, AI Studio | STYLE |
| | | | |

## 5. Evals
- **Code:** `npm test` with `API=<worker url>`; _ tests, _ passing. Screenshot in README.
- **Judgment:** docs/JUDGMENT.md, _ questions, two graders, agreement _%.

## Verification table (carried from HW4)
<!-- Paste your HW4 verification table here; it is the ancestor of section 3. -->
