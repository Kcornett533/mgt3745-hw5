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

| Statement | HW3 verdict | HW4 verdict | HW5 verdict | Reason |
|---|---|---|---|---|
| Return entries in order | PASS | PASS | PASS | Verified via GET /entries endpoint test returning array sorted by creation order. |
| Store valid entry | PASS | PASS | PASS | Valid POST request inserts record into D1 and returns 201 status code. |
| Reject missing text | PASS | PASS | PASS | Submitting empty payload returns 400 Bad Request validation response. |
| Survive cleared cache | CANNOT TEST YET | PASS | PASS | Data resides in remote Cloudflare D1 SQLite database, independent of local browser storage. |
| Server unreachable | N/A | PASS | PASS | Fetch catch handler catches network drop and displays offline badge in DOM. |
| Server returns 500 | N/A | CANNOT TEST YET | CANNOT TEST YET | Simulating an internal worker database crash dynamically from client requires server-side fault injection. |
| Second client writes to the same table | N/A | DEFERRED | DEFERRED | Real-time multi-client synchronization and conflict resolution deferred per ADR-002. |
