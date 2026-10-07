# App Saturation Radar 📡

> Describe your app idea in one sentence. Find out if the market is already crowded, who your competitors are, and how to stand out, before you write a single line of code.

App Saturation Radar researches your idea against existing products, scores how saturated the space is, and gives you a clear verdict plus suggested differentiators.

---

## ✨ Features

- **Idea validation**: submit a plain-English app idea and get a market verdict
- **Competitor research**: searches Product Hunt for products that overlap with your idea
- **Competitor classification**: sorts results into *Direct competitors*, *Related products*, and *Irrelevant*
- **Gap analysis**: highlights what existing products miss
- **Suggested differentiators**: concrete angles to make your idea stand out
- **Market scoring**: Saturation, Opportunity, Market Gap, Competition, Similarity and Confidence scores (0–100)
- **Verdicts**: e.g. `BUILD`, `BUILD WITH DIFFERENTIATION`, `RECONSIDER`
- **Caching**: repeated ideas return instantly (`from_cache`)

---

## 🧱 Architecture

```
App-Saturation-Radar/
├── full-stack-app/   # Frontend + API (UI, request handling, caching)
├── ml_service/       # Scoring / similarity service
└── .gitignore
```

**Request flow**

```
User idea
   │
   ▼
full-stack-app ──► query generation ──► Product Hunt search
   │                                          │
   │                                          ▼
   │                               relevance filtering
   │                                          │
   ▼                                          ▼
ml_service (similarity + scoring) ◄───── candidate products
   │
   ▼
LLM analysis (competitors, gaps, differentiators)
   │
   ▼
Structured response ──► UI (scores, verdict, competitor list)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ <!-- TODO: confirm -->
- Python 3.10+ <!-- TODO: confirm -->
- A Product Hunt API token
- An LLM API key <!-- TODO: which provider? -->

### 1. Clone

```bash
git clone https://github.com/Codenama-007/App-Saturation-Radar.git
cd App-Saturation-Radar
```

### 2. Configure environment

Create a `.env` file in `full-stack-app/` and `ml_service/` as needed:

```env
PRODUCT_HUNT_TOKEN=your_token_here
LLM_API_KEY=your_key_here
ML_SERVICE_URL=http://localhost:8000
```

### 3. Run the ML service

```bash
cd ml_service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000   # TODO: adjust to your entrypoint
```

### 4. Run the app

```bash
cd full-stack-app
npm install
npm run dev
```

Open http://localhost:3000.

---

## 📦 API

### `POST /api/analyze`  <!-- TODO: confirm route -->

**Request**

```json
{ "idea": "An app that tracks daily activities and shows progress" }
```

**Response**

```json
{
  "status": "EXISTS",
  "verdict": "BUILD WITH DIFFERENTIATION",
  "scores": {
    "saturation": 33.4,
    "opportunity": 65.5,
    "market_gap": 0,
    "competition": 0,
    "similarity": 0,
    "confidence": 0
  },
  "direct_competitors": [],
  "related_products": [],
  "gaps": [],
  "differentiators": [],
  "from_cache": false
}
```

---

## 📊 How scoring works

| Score | Meaning |
|---|---|
| **Saturation** | How crowded the space is with relevant products |
| **Opportunity** | Overall room for a new entrant (gap, competition, similarity, confidence) |
| **Market Gap** | Room for a differentiated product |
| **Competition** | How many strong competitors exist |
| **Similarity** | How closely existing products match your idea |
| **Confidence** | How much relevant evidence the research found |

Only products that pass a relevance threshold count toward scoring. If too few relevant products are found, confidence is lowered rather than guessing.

---

## 🛠 Tech Stack

- **Frontend / API:** <!-- TODO: e.g. Next.js, React -->
- **ML service:** <!-- TODO: e.g. Python, FastAPI, sentence-transformers -->
- **Data source:** Product Hunt
- **LLM:** <!-- TODO -->

---

## ⚠️ Known Limitations

- Product Hunt skews toward recent AI/SaaS launches, so consumer apps (fitness, habits, etc.) may be under-represented
- Results depend on the quality of the generated search query
- Scores are directional signals, not market research

---

## 🗺 Roadmap

- [ ] Additional data sources (App Store, Google Play, web search)
- [ ] Relevance filtering with embedding similarity threshold
- [ ] Structured (JSON) LLM output
- [ ] Shareable report pages
- [ ] Idea history per user

---
