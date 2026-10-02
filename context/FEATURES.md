# FEATURES.md

## Features

| Feature | Kano | Status |
|---|---|---|
| Save and list entries | Basic | Built (HW3), server-backed (HW4) |
| Real-time Search and Filter | Performance | Delegated (HW5) |

## Acceptance criteria (EARS)

- THE SYSTEM SHALL return all entries in creation order.
- WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm.
- IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why.
- IF the server cannot be reached, THEN THE SYSTEM SHALL tell the user on the page.
- WHEN the user types in the search box, THE SYSTEM SHALL filter displayed entries by pipeline name or notes in real time.
- WHEN a user selects a filter option, THE SYSTEM SHALL update the list without making a new network request.
- IF no entries match the search query, THEN THE SYSTEM SHALL display a "No matching provenance records found" message.
- WHEN the search field is cleared, THE SYSTEM SHALL restore all original entries.
## Verification

Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Return entries in order | PASS | *?* | |
| Store valid entry | PASS | *?* | |
| Reject missing text | *?* | *?* | |
| Survive cleared cache | CANNOT TEST YET | *?* | *now testable* |
| Server unreachable | | *?* | *how would you simulate an outage?* |
| Server returns 500 | | *?* | |
| Second client writes to the same table | | *?* | *DEFERRED if ADR-002 says so* |
