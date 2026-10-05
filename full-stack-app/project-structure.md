# Agents.md — Saturation Radar Landing Page

## Project Context

We are building a marketing landing page for a product called:

# Saturation Radar

A market-intelligence platform for AI/vibe-coded app builders.

The eventual product will analyze an app idea, identify similar products already in the market, calculate a market saturation score, identify potential gaps, and analyze existing websites for technology, security configuration, and signals associated with AI-assisted/vibe-coded development.

**Important:**

This task is ONLY for building the **landing page / marketing website**.

Do NOT implement the actual product backend, scraping system, ML pipeline, security scanner, database, authentication, or API.

The landing page should visually communicate what the future product will do.

---

# 1. Landing Page Goal

The landing page should immediately communicate:

> **Know the market before you build the product.**

The visitor should understand within a few seconds:

1. They can analyze an app idea.
2. The system finds similar products.
3. It measures market saturation.
4. It identifies potential market gaps.
5. They can also scan an existing website.
6. The website scanner can analyze technology, security configuration, and vibe-code signals.

The page should feel like a **real developer/startup product**, not a student project.

---

# 2. Design Direction

Use a:

## Dark Intelligence / Radar aesthetic

The visual language should combine:

* developer tooling
* market intelligence
* cybersecurity dashboards
* data visualization
* technical infrastructure

Think:

**Linear × Vercel × modern security dashboard**

Do NOT copy any specific website.

Avoid generic AI-SaaS aesthetics.

### Do NOT use:

* purple/blue AI gradients everywhere
* giant gradient blobs
* excessive glassmorphism
* rainbow gradients
* random 3D AI illustrations
* excessive floating elements
* overly decorative animations
* generic "AI-powered" visual clichés

### Prefer:

* dark surfaces
* thin borders
* subtle grid patterns
* technical labels
* data visualizations
* radar/scanning motifs
* monospace metadata
* restrained glow effects
* subtle motion
* strong typography
* generous whitespace

The design should feel **technical, premium, precise, and slightly futuristic**.

---

# 3. Color Palette

Use this exact base palette.

```text
BACKGROUND      #08090B
SURFACE         #111318
SURFACE 2       #181B22

TEXT            #F5F7FA
MUTED           #9299A5
BORDER          #252932

PRIMARY         #B8F500
SECONDARY       #22D3EE

SUCCESS         #22C55E
WARNING         #F59E0B
DANGER          #EF4444
```

## Primary Brand Color

```text
#B8F500
```

Electric lime is the main brand accent.

Use it for:

* primary CTA
* important metrics
* active states
* scan indicators
* highlighted text
* score indicators
* small decorative accents

Do NOT make the whole website lime.

Approximate visual ratio:

```text
90% dark / neutral
7% lime
2% cyan
1% warning/error
```

---

# 4. Typography

Use:

### Headings

**Space Grotesk**

### Body

**Inter**

### Technical/Data text

**JetBrains Mono**

Use JetBrains Mono for things such as:

```text
SATURATION_SCORE: 84
COMPETITORS_FOUND: 31
SCAN_STATUS: COMPLETE
```

Typography should be clean and modern.

Headings should be bold but not excessively huge.

---

# 5. Hero Section

The hero is the most important section.

Use an eyebrow:

```text
AI APP MARKET INTELLIGENCE
```

Main headline:

> **Know the market before you build.**

Supporting text:

> Analyze your app idea, discover similar products, measure market saturation, and find potential gaps before you spend weeks building something nobody needs.

Primary CTA:

```text
Analyze Your Idea →
```

Secondary CTA:

```text
Scan a Website
```

The hero should contain a visual representation of the actual future product.

Do NOT use a generic stock image.

---

# 6. Hero Product Visualization

Create a premium dashboard-style mockup.

Example:

```text
┌──────────────────────────────────────────────────┐
│ SATURATION RADAR                                 │
│                                                  │
│ "AI habit tracker for college students"         │
│                                                  │
│ SATURATION                                       │
│                                                  │
│              84 / 100                            │
│                 HIGH                             │
│                                                  │
│ 31 comparable products                           │
│ 18 launched in last 90 days                      │
│                                                  │
│ ───────────────────────────────────────────────  │
│                                                  │
│ CLOSEST PRODUCTS                                 │
│                                                  │
│ HabitAI              92%                         │
│ Streakly             87%                         │
│ FocusHabit           82%                         │
└──────────────────────────────────────────────────┘
```

This is a **visual mockup only**.

Do not build functional analysis logic.

Add subtle animations such as:

* scanning line
* score counter
* subtle radar pulse
* data appearing sequentially

Animations must be restrained.

---

# 7. Problem Section

Create a strong transition from the hero into the problem.

Headline:

> **You have an idea. But do you know who already built it?**

Communicate the problem:

```text
Same idea.
Same audience.
Same features.
Same pricing.

Different founder.

Same result:
No users.
```

The section should make the visitor feel the cost of building blindly.

Do not use fake statistics unless explicitly provided.

---

# 8. Saturation Radar Section

This is the primary product feature.

Headline:

> **See how crowded your idea really is.**

Explain:

> Describe your application idea and Saturation Radar finds the products most similar to it across the indexed market.

Show the conceptual pipeline:

```text
YOUR IDEA
   ↓
SEMANTIC SEARCH
   ↓
SIMILAR PRODUCTS
   ↓
MARKET ANALYSIS
   ↓
SATURATION SCORE
```

Create a visual dashboard showing:

```text
SATURATION SCORE

84 / 100
HIGH

Comparable products       31
Recent launches           18
Feature overlap           High
Pricing overlap           Medium
```

Again, this is only a UI mockup.

---

# 9. Competitor Intelligence Section

Show that the system doesn't simply output one score.

It provides context.

Example cards:

```text
HabitAI
92% similarity

AI habit tracking
Launched: 34 days ago
```

```text
Streakly
87% similarity

Gamified habit tracking
Launched: 51 days ago
```

```text
FocusHabit
82% similarity

Student productivity
Launched: 67 days ago
```

Use fictional/example data only for visual presentation.

Make it clear through UI/context that this is a preview/mockup if necessary.

---

# 10. Gap Analysis Section

This should be one of the strongest visual sections.

Headline:

> **Don't just see the competition. Find the gap.**

Show feature coverage:

```text
FEATURE COVERAGE

AI Coaching              ████████████████ 82%
Gamification             ██████████████   71%
Social Features          ███████████      55%
Wearable Integration     ████████         41%
Offline Support          ███              13%
Regional Language        ██                7%
```

Then highlight:

```text
POTENTIAL GAP DETECTED

Offline-first experiences
appear underrepresented
among indexed competitors.
```

Use lime to highlight the potential opportunity.

The language must remain probabilistic.

Use:

> Potential gap

instead of:

> Guaranteed opportunity

---

# 11. Website Intelligence Section

Introduce the second major capability.

Headline:

> **Already built something? Scan it.**

Supporting text:

> Analyze your website's technology, observable security configuration, and signals associated with AI-assisted development.

Show a URL input mockup:

```text
┌─────────────────────────────────────────────┐
│ https://yourapp.com                         │
└─────────────────────────────────────────────┘

             [ Scan Website → ]
```

Then show the resulting dashboard:

```text
WEBSITE INTELLIGENCE

Security Configuration       82 / 100
Vibe-Code Likelihood          78%

TECHNOLOGY

Next.js          ✓
React            ✓
Tailwind         ✓
Vercel           ✓

SECURITY

✓ HTTPS
✓ HSTS
⚠ CSP missing
⚠ X-Frame-Options missing
```

This is a visual mockup only.

Do not implement the scanner.

---

# 12. Vibe-Code Detection Section

Give this capability its own visual treatment.

Headline:

> **Understand what powers the product.**

Show a radar/signal visualization containing categories such as:

```text
FRAMEWORK
INFRASTRUCTURE
UI PATTERNS
CODE SIGNALS
CONTENT SIGNALS
```

Then:

```text
VIBE-CODE LIKELIHOOD

78%
```

Include a small disclaimer:

> Estimated from publicly observable signals. Not a definitive attribution.

This is important because the eventual system must not falsely claim that a website was definitely built with a specific AI builder.

---

# 13. Security Section

Keep security positioned as:

**Security Configuration Assessment**

NOT:

**Complete Security Scan**

Show:

```text
SECURITY CONFIGURATION

82 / 100

HTTPS                    ✓
HSTS                     ✓
Content-Security-Policy  ⚠
X-Frame-Options          ⚠
Referrer-Policy          ✓
```

Use:

* green for observed good configuration
* amber for missing/improvable controls
* red only for genuinely serious findings

Include subtle wording:

> Passive assessment of publicly observable security configuration.

Do not imply penetration testing.

---

# 14. How It Works

Create a simple 4-step section.

```text
01
Describe your idea

↓

02
We find similar products

↓

03
We measure competition

↓

04
We identify potential gaps
```

Then introduce the second workflow:

```text
OR

Paste your website

↓

Analyze technology

↓

Assess security configuration

↓

Estimate vibe-code likelihood
```

Keep this section visually simple.

---

# 15. Final CTA

End with a strong statement.

Headline:

> **Build smarter. Ship with evidence.**

Supporting text:

> Stop guessing whether your next idea has room to compete.

Primary CTA:

```text
Analyze Your Idea →
```

Secondary CTA:

```text
Scan a Website
```

---

# 16. Navigation

Keep the navbar minimal.

Suggested structure:

```text
SATURATION RADAR

Product
How It Works
Market Intelligence
Website Scanner

[ Analyze Idea ]
```

Use a sticky navbar with subtle backdrop treatment.

The navbar should become slightly more opaque when scrolling.

---

# 17. Footer

Keep it clean.

Include:

* logo/product name
* short product description
* navigation
* GitHub if applicable
* Privacy
* Terms
* copyright

Do not invent social accounts or URLs.

---

# 18. Animation Guidelines

Use animation to communicate:

* scanning
* analysis
* data flow
* discovery
* measurement

Good animations:

* radar sweep
* scanning line
* subtle number counting
* cards entering sequentially
* progress bars
* subtle hover states
* grid movement
* score transitions

Avoid:

* constant floating animations
* excessive parallax
* distracting particle systems
* animation on every element
* slow page transitions that hurt usability

Animations should feel like **data processing**, not decoration.

---

# 19. Responsive Design

The landing page must work properly on:

* desktop
* laptop
* tablet
* mobile

Do not simply shrink the desktop design.

On mobile:

* stack dashboard mockups
* simplify visualizations
* maintain readable typography
* preserve CTA visibility
* avoid horizontal overflow
* simplify complex charts
* reduce decorative elements

---

# 20. Component Architecture

Use reusable React components.

Suggested structure:

```text
components/
├── navbar/
├── hero/
├── problem/
├── saturation-radar/
├── competitor-intelligence/
├── gap-analysis/
├── website-intelligence/
├── vibe-code/
├── security/
├── how-it-works/
├── final-cta/
└── footer/
```

Do not put the entire landing page into one component.

Keep sections independently maintainable.

---

# 21. Code Quality

Use:

* TypeScript
* semantic HTML
* accessible buttons
* accessible navigation
* proper heading hierarchy
* responsive layouts
* reusable components
* clean Tailwind classes
* meaningful component names

Avoid:

* duplicated markup
* unnecessary dependencies
* giant components
* hardcoded repeated values
* inaccessible interactive elements

---

# 22. Scope Boundary

This project is ONLY the landing page.

DO NOT implement:

* FastAPI
* PostgreSQL
* pgvector
* authentication
* Product Hunt scraping
* AI-builder scraping
* embeddings
* semantic search
* ML models
* saturation calculations
* gap-analysis algorithms
* security scanning
* vulnerability testing
* website scraping backend
* vibe-code classifier

Represent future functionality using **realistic UI mockups**.

The goal is to make the product feel real without pretending that the backend already exists.

---

# 23. Design Quality Standard

The final result should look like a legitimate startup/product website that could be shown to:

* potential users
* developers
* investors
* hackathon judges
* final-year project evaluators

It should NOT look like:

* a generic student portfolio
* a template with text replaced
* a generic AI SaaS
* a collection of unrelated animations
* a Dribbble-style concept with no usable structure

The UI should prioritize:

**Clarity > Decoration**

**Product storytelling > Animation**

**Consistency > Novelty**

**Usability > Visual complexity**

---
# use lennis for smooth scrolling to desired sections at the same page


# 24. Final Design Identity

The final website should communicate:

```text
MARKET INTELLIGENCE
        +
DEVELOPER TOOLING
        +
SECURITY ANALYSIS
        +
AI/VIBE-CODE DETECTION
```

The emotional impression should be:

> **"This looks like a serious tool I would actually use before building my next app."**

Not:

> **"This looks like an AI-generated landing page."**
