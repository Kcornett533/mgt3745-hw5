# Tokens: what a machine reads. Replace every value with one pulled from the
# interface you admire. Guess the hex; precision is HW5's problem.
color-primary: "#051E39"
color-accent: "#B39051"
color-background: "#FFFFFF"
color-text: "#1A1A1A"
font-body: "Roboto"
font-heading: "Roboto Slab"
font-size-min: 14px
space-unit: 8px
radius: 4px
---

# STYLE.md

Tokens above, rationale below. The frontmatter is what a machine reads; this
body is what a human reads. One sentence per token. "Looks clean" is fog;
"gold fails contrast on white at body size" is at altitude.

## Rationale

- **color-primary**: Deep navy (`#051E39`) establishes high-contrast authoritative framing for header regions and interactive elements without inducing screen fatigue.
- **color-accent**: Metallic gold (`#B39051`) is reserved strictly for active state highlights and focal borders, but forbidden on small body text to pass WCAG AA contrast standards.
- **font-body / font-heading**: Combining a geometric sans-serif for body copy with a clean slab-serif for structural headings maintains dense data legibility while clearly demarcating typographic hierarchy.
- **space-unit**: An 8px spatial grid enforces predictable layout rhythm across card padding, grid margins, and component gaps so element spacing is never eyeballed.
- **font-size-min**: Setting a 14px floor guarantees readable metadata and technical log signatures for users viewing dense records on smaller desktop displays or high-DPI laptop monitors.

## Refusals

Things this interface will never do, and why. Taken from the interface you
resent. Name the Law of UX it breaks (lawsofux.com).

1. **No unexpected popups or disruptive modals.** Prompts or notifications that trigger automatically interrupt task workflow and violate *Doherty Threshold* (keeping interaction pacing under control) and *Miller's Law* by overwhelming working memory.
2. **No dynamic layout shifts during real-time filtering.** Shifting DOM layout bounds while the user types destabilizes visual landmarks and violates *Fitts's Law* by turning target acquisition into a moving target.
3. **No hidden or buried primary controls.** Obscuring search inputs or critical filter dropdowns behind hidden menus increases search cost and breaks *Hick's Law* by arbitrarily delaying decision time.

## Sources

- Admired: Stripe Dashboard / GitHub Interface, focused density and clear tabular hierarchy.
- Resented: Legacy Enterprise Portals, overcrowded layout shifts, hidden filters, and low-contrast metadata text.