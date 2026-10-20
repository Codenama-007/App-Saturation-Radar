# Scoring Formulas — Saturation Radar

All scores are clamped to the range `[0, 100]` unless noted otherwise.

```
clamp(value, min=0, max=100) = max(min, min(value, max))
```

---

## Inputs

| Symbol | Source | Description |
|---|---|---|
| `C` | `count_direct_competitors()` | Number of items under `DIRECT COMPETITORS:` (regex-parsed from LLM analysis text) |
| `H` | LLM call | Count of highly similar competitors, clamped to `H ≤ C` |
| `T` | `len(web_results) + len(products)` | Total search results (currently 10, Product Hunt disabled) |
| `S` | `source_count` | Number of data sources with results (currently 1) |

---

## Step 1 — Component Metrics

```
competition_density  = clamp((C / 10) × 100)
similarity_pressure  = clamp((H / max(C, 1)) × 100)
relevance_density    = clamp((C / T) × 100)          # 0 if T = 0
source_coverage      = clamp((S / 3) × 100)
```

---

## Step 2 — Saturation Score

```
saturation_score = clamp(
      competition_density × 0.45
    + similarity_pressure × 0.30
    + relevance_density   × 0.15
    + source_coverage     × 0.10
)                                   # rounded to 1 decimal

market_gap_score = 100 - saturation_score
```

### Saturation Level

| Condition | Level |
|---|---|
| `saturation_score < 25` | Low |
| `25 ≤ score < 50` | Moderate |
| `50 ≤ score < 75` | High |
| `≥ 75` | Very High |

---

## Step 3 — Confidence Score

```
confidence_score = clamp(
      min(C / 5, 1)    × 50
    + min(S / 3, 1)    × 30
    + min(T / 10, 1)   × 20
)                                   # rounded to 1 decimal
```

---

## Step 4 — Opportunity Score

```
opportunity_score = clamp(
      market_gap_score            × 0.45
    + (100 - competition_density) × 0.20
    + (100 - similarity_pressure) × 0.15
    + confidence_score            × 0.20
)                                   # rounded to 1 decimal
```

### Build Verdict

| Condition | Verdict | Opportunity Level |
|---|---|---|
| `≥ 71` | BUILD | Strong Opportunity |
| `51 – 70` | BUILD WITH DIFFERENTIATION | Promising, but differentiation matters |
| `31 – 50` | BUILD ONLY IF DIFFERENTIATED | Difficult market |
| `< 31` | DON'T BUILD | Weak Opportunity |

---

## Output Dictionary

```json
{
  "saturation_score": 0.0,
  "saturation_level": "Low | Moderate | High | Very High",
  "competition_density": 0.0,
  "similarity_score": 0.0,
  "market_gap_score": 0.0,
  "confidence_score": 0.0,
  "relevant_competitors": 0,
  "high_similarity_competitors": 0,
  "opportunity_score": 0.0,
  "opportunity_level": "...",
  "build_verdict": "BUILD | BUILD WITH DIFFERENTIATION | BUILD ONLY IF DIFFERENTIATED | DON'T BUILD"
}
```

> Note: `similarity_score` in the output is the `similarity_pressure` component.
