# Planyx ✦
### Your outing, planned instantly.

Planyx is an AI-powered outing planner for Delhi NCR. Select your mood, budget, and time — and get 2–3 complete, realistic outing plans in seconds.

---

## What it does

- Pick your **mood** — Solo, Date, Friends, or Family
- Pick your **budget** — Under ₹500 to Above ₹2000
- Pick your **time** — Morning, Evening, Night, or Full Day
- Get **3 complete plans** instantly, each with a full timeline, real place suggestions, estimated cost, and Google Maps links

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| AI | Groq API (Llama 3.3 70b) |
| Deployment | Vercel |

---

## Project Structure

```
planyx/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # AI API route
│   ├── page.tsx                # Main page
│   └── layout.tsx              # Root layout
├── components/
│   ├── SelectorForm.tsx        # Mood / budget / time selector
│   └── PlanCard.tsx            # Individual plan display
├── types/
│   └── plan.ts                 # TypeScript interfaces
└── .env.local                  # API keys (not committed)
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/planyx.git
cd planyx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```
GROQ_API_KEY=your-groq-api-key-here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key | Yes |

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add `GROQ_API_KEY` as an environment variable in your Vercel project settings.

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments.

---

## Features

- 3 distinct outing plans per request (Best Pick, Chill Vibe, Hidden Gem)
- Real places in Delhi NCR with star ratings
- Each stop links directly to Google Maps
- Realistic cost estimates matching your budget
- Fully responsive, mobile-first UI
- Fast responses powered by Llama 3.3 70b on Groq

---

## Roadmap

- [ ] Add more cities (Mumbai, Bangalore, Hyderabad)
- [ ] Shareable plan links
- [ ] Streaming response (plans appear one by one)
- [ ] Regenerate individual plans
- [ ] Weather-aware suggestions

---

## License

MIT
