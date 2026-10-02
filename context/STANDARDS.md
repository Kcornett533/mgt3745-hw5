# STANDARDS.md

Coding and documentation rules, for humans. Restated for agents in CLAUDE.md.
Copy in from HW3; the HW4 rows are added for you.

## Rules

1. Validate all form inputs on the client side before triggering network requests or state changes.
2. Separation of concerns: HTML for structure, CSS for presentation, JS for behavior and data.
3. User input reaches the page through `textContent`, never `innerHTML`.
4. **(HW4)** User values reach SQL through `bind()`, never string concatenation.
5. **(HW4)** No credential in the repository. Not in code, not in config, not in a context file. Database ids are addresses and may appear in `wrangler.toml`.
6. **(HW4)** A failed request is shown to the user on the page and is never thrown in the console.
7. No stray `console.log` in committed code.

## Naming

* **JavaScript:** `camelCase` for variable names, function names, and DOM object references; `PascalCase` for classes or constructors.
* **Files & Directories:** `kebab-case` for file names and folder paths (e.g., `worker.test.js`, `bolt-001.zip`).
* **CSS:** `kebab-case` for class names and ID attributes (`#searchInput`, `#filterSelect`, `.provenance-card`).
* **Database & SQL:** `snake_case` for database table names and column identifiers (`provenance_entries`, `file_signature`).

## Documentation

* **Inline Comments:** Comments explain *why* a design or algorithmic decision was made, never *what* the code does (the code itself must be self-explanatory).
* **API Documentation:** Every endpoint comment must explicitly quote the corresponding EARS acceptance criteria statement from `FEATURES.md`.
* **Repository Documentation:** `README.md` and context scaffold files (`PROJECT.md`, `EVALS.md`, `ARCHITECTURE.md`) remain continuously updated with every release tag and git commit.