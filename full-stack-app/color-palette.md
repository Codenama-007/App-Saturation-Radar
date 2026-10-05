# Saturation Radar — Color Palette & Component Reference

---

## Color Palette

### Background Colors

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#08090B` | Page background (deepest dark) |
| `--surface` | `#111318` | Card surfaces, navbar, panels |
| `--surface-2` | `#181B22` | Nested cards, secondary surfaces |
| — | `#0d0f13` | Hero dashboard inner bg |
| — | `#0d1014` | Deeply nested input/data cells |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--text` | `#F5F7FA` | Primary text, headings |
| `--muted` | `#9299A5` | Body copy, labels, secondary text |

### Border Colors

| Token | Hex | Usage |
|---|---|---|
| `--border` | `#252932` | All card/panel borders, dividers |

### Brand Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#B8F500` | Electric lime — CTAs, score indicators, scan signals, active states, gap highlights |
| `--secondary` | `#22D3EE` | Cyan — Website Scanner, security section, tech badges |

### Status / Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#22C55E` | Security PASS, good scores, HTTPS confirmed |
| `--warning` | `#F59E0B` | Security WARN, medium saturation, recent launches |
| `--danger` | `#EF4444` | HIGH saturation, security FAIL, critical findings |

### Transparent Overlays

| Color | Usage |
|---|---|
| `rgba(184,245,0, 0.10)` | Lime badge background |
| `rgba(184,245,0, 0.05–0.06)` | Section radial lime glow |
| `rgba(184,245,0, 0.25–0.40)` | Text glow / scan line gradient |
| `rgba(34,211,238, 0.10)` | Cyan badge background |
| `rgba(34,211,238, 0.03)` | Website intelligence section glow |
| `rgba(34,197,94, 0.08)` | Security PASS row background |
| `rgba(245,158,11, 0.08)` | Security WARN row background |
| `rgba(239,68,68, 0.08)` | Security FAIL row background |
| `rgba(239,68,68, 0.05–0.10)` | Problem section cost callout |
| `rgba(37,41,50, 0.30)` | Table row hover highlight |

---

## Typography

| Font | Variable | Usage |
|---|---|---|
| **Space Grotesk** | `--font-space-grotesk` | All `h1`–`h6` headings, large score numbers |
| **Inter** | `--font-inter` | Body copy, descriptions, paragraph labels |
| **JetBrains Mono** | `--font-jetbrains` | Section labels, badge text, terminal/data content |

---

## Color Usage Per Component

### `Navbar`
| Element | Color |
|---|---|
| Background scrolled | `#08090B` 90% opacity + backdrop blur |
| Background at top | Transparent |
| Border scrolled | `#252932` |
| Logo text | `#FFFFFF` → `#B8F500` hover |
| Nav links | `#9299A5` → `#F5F7FA` hover |
| Underline hover | `#B8F500` |
| CTA button | `#B8F500` bg / `#08090B` text |
| Radar icon accent | `#B8F500` |
| Radar icon rings | `#252932` |

---

### `Hero`
| Element | Color |
|---|---|
| Background | `#08090B` |
| Grid lines | `#252932` at 40% |
| Lime radial glow | `rgba(184,245,0,0.04)` |
| Eyebrow bg | `#111318` |
| Headline | `#F5F7FA` |
| Headline accent | `#B8F500` |
| Subtext | `#9299A5` |
| Primary CTA | `#B8F500` |
| Secondary CTA | Transparent / `#252932` border |
| Dashboard terminal bar | `#111318` |
| Traffic lights | `#EF4444` / `#F59E0B` / `#22C55E` |
| LIVE dot | `#B8F500` |
| Scan line | `#B8F500` 60% |
| Score arc | `#B8F500` |
| Score number | `#B8F500` |
| HIGH saturation badge | `#EF4444` |
| Stats cells | `#111318` |
| Recent launches value | `#F59E0B` |
| Competitor bars | `#EF4444` / `#F59E0B` |

---

### `Problem`
| Element | Color |
|---|---|
| Terminal card bg | `#111318` |
| Terminal header bg | `#0d1014` |
| Main diary text | `#F5F7FA` |
| Muted diary text | `#9299A5` |
| "No users." | `#EF4444` |
| Cursor | `#B8F500` |
| Cost callout border | `rgba(239,68,68,0.20)` |
| Cost callout bg | `rgba(239,68,68,0.05)` |
| Cost label | `#EF4444` |

---

### `SaturationRadar`
| Element | Color |
|---|---|
| Pipeline step (first/last) | `#B8F500` border + tint |
| Pipeline step (middle) | `#252932` border |
| Step numbers | `#B8F500` |
| Input bg | `#0d1014` |
| Input cursor | `#B8F500` |
| Score value | `#B8F500` |
| HIGH indicator | `#EF4444` |
| Gauge gradient | `#22C55E` → `#F59E0B` → `#EF4444` |
| Warning metrics | `#F59E0B` |

---

### `CompetitorIntelligence`
| Element | Color |
|---|---|
| Card border hover | `rgba(184,245,0,0.30)` |
| HIGH similarity badge | `#EF4444` |
| MEDIUM similarity badge | `#F59E0B` |
| HIGH bar | `#EF4444` |
| MEDIUM bar | `#F59E0B` |
| Tech stack badges | `#22D3EE` |

---

### `GapAnalysis`
| Element | Color |
|---|---|
| AI Coaching bar (82%) | `#EF4444` |
| Gamification bar (71%) | `#F59E0B` |
| Social bar (55%) | `#F59E0B` |
| Wearable bar (41%) | `#22C55E` |
| Offline bar (13%) | `#B8F500` + glow |
| Regional bar (7%) | `#B8F500` + glow |
| Gap callout border | `rgba(184,245,0,0.30)` |
| Gap callout bg | `rgba(184,245,0,0.05)` |
| Gap label / pulse dot | `#B8F500` |

---

### `WebsiteIntelligence`
| Element | Color |
|---|---|
| Section label / headline | `#22D3EE` |
| Section radial glow | `rgba(34,211,238,0.03)` |
| Scan button | `#B8F500` |
| Security score | `#22C55E` |
| Vibe-Code score | `#B8F500` |
| Tech detected ✓ | `#22C55E` |
| Security gauge | `#22C55E` |
| PASS row icon | `#22C55E` |
| WARN row icon | `#F59E0B` |
| FAIL row icon | `#EF4444` |

---

### `VibeCode`
| Element | Color |
|---|---|
| Section label / headline | `#B8F500` |
| Score number | `#B8F500` |
| Score gauge | `#B8F500` |
| Radar polygon fill | `rgba(184,245,0,0.10)` |
| Radar polygon stroke | `#B8F500` |
| Radar rings / axes | `#252932` |
| HIGH signal confidence | `#B8F500` |
| MEDIUM signal confidence | `#F59E0B` |

---

### `Security`
| Element | Color |
|---|---|
| Section label / headline | `#22D3EE` |
| Score number | `#22C55E` |
| Gauge | `#22C55E` → `#F59E0B` |
| PASS icon/badge | `#22C55E` |
| WARN icon/badge | `#F59E0B` |
| FAIL icon/badge | `#EF4444` |
| Warning callout | `rgba(245,158,11,0.20)` border |

---

### `HowItWorks`
| Element | Color |
|---|---|
| Workflow A (Idea) circles | `#B8F500` |
| Workflow A connectors | `#B8F500` 20% |
| Workflow B (Scanner) circles | `#22D3EE` |
| Workflow B connectors | `#22D3EE` 20% |
| Stat values | `#B8F500` |

---

### `FinalCta`
| Element | Color |
|---|---|
| Lime radial glow | `rgba(184,245,0,0.06)` |
| Headline accent | `#B8F500` |
| Primary CTA | `#B8F500` bg |
| Secondary CTA | `#252932` border |
| Checkmarks | `#B8F500` |

---

### `Footer`
| Element | Color |
|---|---|
| Background | `#08090B` |
| Top border | `#252932` |
| Logo radar accent | `#B8F500` |
| Logo text | `#FFFFFF` |
| Description / nav links | `#9299A5` → `#F5F7FA` hover |
| Status badge | `#111318` bg / `#252932` border |
| Copyright | `#9299A5` |

---

## Component Directory

```
components/
├── providers/
│   └── lenis-provider.tsx          # Lenis smooth scroll context + RAF loop
│
├── navbar/
│   └── Navbar.tsx                  # Sticky navbar, scroll links, mobile menu
│
├── hero/
│   └── Hero.tsx                    # Hero section + animated dashboard mockup
│
├── problem/
│   └── Problem.tsx                 # Problem framing + founder diary terminal card
│
├── saturation-radar/
│   └── SaturationRadar.tsx         # Pipeline visualization + score dashboard
│
├── competitor-intelligence/
│   └── CompetitorIntelligence.tsx  # 4 competitor cards with similarity bars
│
├── gap-analysis/
│   └── GapAnalysis.tsx             # Animated coverage bars + gap callout cards
│
├── website-intelligence/
│   └── WebsiteIntelligence.tsx     # URL scanner mockup + tech & security panels
│
├── vibe-code/
│   └── VibeCode.tsx                # SVG radar chart + signal detection list
│
├── security/
│   └── Security.tsx                # Security configuration assessment table
│
├── how-it-works/
│   └── HowItWorks.tsx              # Two parallel numbered step flows
│
├── final-cta/
│   └── FinalCta.tsx                # Final CTA with Lenis scroll buttons
│
└── footer/
    └── Footer.tsx                  # Footer with nav columns, legal, GitHub
```

---

## Visual Ratio (approximate)

```
90%  Dark backgrounds / neutrals   #08090B  #111318  #181B22  #252932
 7%  Electric lime                  #B8F500
 2%  Cyan                           #22D3EE
 1%  Status colors                  #22C55E  #F59E0B  #EF4444
```
