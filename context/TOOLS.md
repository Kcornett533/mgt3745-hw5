# TOOLS.md

The ledger of Trust Boundary crossings. One row per external service this
repository depends on. Read by the agent on every task, so keep it short: a
service not in use does not belong here.

Never put a credential in this file. A key, token, or password anywhere in
the repository is graded as a security failure regardless of the rest.

Each crossing statement answers three questions in one first-person sentence:
what crosses, to whom, and who is accountable.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers + D1 | Every entry a user types; request metadata (IP, timestamp) that Cloudflare logs by default | Cloudflare dashboard login; wrangler token inside the Codespace | "User entries leave the browser and are stored on D1 under Cloudflare's free-tier terms, in a region I did not choose. I am accountable." | Medium: `wrangler d1 export`, rewrite one Worker for another host |
| GitHub + Codespaces | Source code, commit history, context scaffold files, and transient devcontainer environment data | GitHub account (Georgia Tech SSO) | "Source code, commit history, and context documentation cross to GitHub's infrastructure under my account terms, and I am accountable for repository privacy and permissions." | Medium: Export git repository to another remote host (e.g., GitLab) and rebuild local devcontainers |
| GitHub Copilot | Opened repository files, code snippets, and inline context sent as prompt payloads for suggestions | GitHub account (SSO) | "My code and context scaffold files cross to GitHub and OpenAI telemetry services to generate completion suggestions, and I am accountable for auditing generated code against standards." | Low: Disable extension in VS Code settings and resume manual development |
| wrangler (npm) | Local build configurations, CLI commands, and operational telemetry transmitted during dev/deploy execution | CLI OAuth session token stored in local user home directory (`~/.wrangler`) | "CLI commands and deployment parameters cross to npm registry packages and Cloudflare edge deployment services via wrangler execution, and I am accountable for dependency auditing." | Low: Uninstall npm package and deploy directly via Cloudflare Dashboard API |

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.