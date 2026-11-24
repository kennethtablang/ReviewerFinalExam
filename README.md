# Final Exam Reviewer

A mobile-first final exam reviewer for **Advanced Java Programming (IT1908)** and **Data Structures and Algorithms (IT2503)**.
It is built with Next.js (App Router, plain JavaScript) and deploys to Vercel with no configuration.

## What's inside

| Section | What it does |
| --- | --- |
| **Notes** | Topic summaries for Prelims, Midterms, Prefinals and the final topics (Handouts 07, 08, 09) |
| **Flashcards** | Tap to flip. Swipe right for "Got it" or left for "Again". Missed cards come back later in the deck. |
| **Review mode** | Pick terms. Each answer locks and shows why it's right and why every other choice is wrong. |
| **Exam mode** | Shuffled mix like the real final: 20% each from Prelims, Midterms and Prefinals, and 40% from the final topics. Timed, scored at the end, then reviewed. |

- Questions **and** choices are reshuffled every time you start, retake or retry mistakes.
- Tap any number in the strip to jump to that question. Flag questions you don't know yet. Flags are saved on the device and feed the "Flagged only" review and flashcard decks.
- Light, dark and system themes. Liquid Glass styling with violet gradients. Reduced-motion is respected.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are pre-rendered as static files)
```

Requires Node 20.9 or newer.

## Deploy to Vercel

**Option A: GitHub**

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Keep the defaults (Framework: Next.js) and click **Deploy**.

**Option B: CLI**

```bash
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

The `resources/` folder (the source PDFs) is excluded from deployment by `.vercelignore`.

## Editing content

All content lives in `data/`:

- `java.js`, `ds.js` hold the notes and questions for each term. Question shape: `{ q, code?, c: [A, B, C, D], a: "B", e: "why B is right" }`.
- `why-java.js`, `why-ds.js` hold the "why the other choices are wrong" text:
  - `glossary` gives the meaning of recurring choice terms, reused everywhere.
  - `overrides` gives per-question reasons, keyed by the 0-based question index within a term. Entries are in original A–D order, with `null` for the correct choice.

After adding questions, make sure every wrong choice has a reason, either in the glossary or in an override. Otherwise the review panel will show that choice without an explanation.
