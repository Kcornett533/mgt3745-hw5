---
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
- **color-background**: Pure white (`#FFFFFF`) provides a neutral, high-clarity backdrop for structured provenance data cards.
- **color-text**: Off-black (`#1A1A1A`) provides maximum legibility while avoiding the harsh visual vibration of pure black against pure white backgrounds.
- **font-body**: Roboto ensures high-density technical log legibility across diverse screen resolutions.
- **font-heading**: Roboto Slab creates a distinct visual hierarchy for structural section headers without cluttering record cards.
- **font-size-min**: Setting a 14px floor guarantees readable metadata and technical log signatures on high-DPI displays.
- **space-unit**: An 8px spatial grid enforces predictable layout rhythm across card padding, grid margins, and component gaps.
- **radius**: A subtle 4px border radius softens container edges while preserving a sharp, technical enterprise layout.

## Refusals

Things this interface will never do, and why. Taken from the interface you
resent. Name the Law of UX it breaks (lawsofux.com).

1. **No unexpected popups or disruptive modals.** Prompts or notifications that trigger automatically interrupt task workflow and violate *Doherty Threshold* (keeping interaction pacing under control) and *Miller's Law* by overwhelming working memory.
2. **No dynamic layout shifts during real-time filtering.** Shifting DOM layout bounds while the user types destabilizes visual landmarks and violates *Fitts's Law* by turning target acquisition into a moving target.
3. **No hidden or buried primary controls.** Obscuring search inputs or critical filter dropdowns behind hidden menus increases search cost and breaks *Hick's Law* by arbitrarily delaying decision time.

## Sources

- Admired: Stripe Dashboard / GitHub Interface (focused density and clear tabular hierarchy).
- Resented: Legacy Enterprise Portals (overcrowded layout shifts, hidden filters, and low-contrast metadata text).