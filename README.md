# Dev Patel — AI Engineer Portfolio

A portfolio site with a twist: instead of just describing my work, it **answers questions about it** — out loud, if you'd rather talk than type. A RAG-powered chat assistant lives on the homepage, grounded in my actual resume and project case studies. Ask it anything about my background — by typing or by voice — and it retrieves real facts before answering, streaming the reply back token-by-token, rather than guessing or making you wait.

**Live site:** [devpatelassistant.vercel.app](https://devpatelassistant.vercel.app/)
**Repo:** [github.com/devpatel6780/PersonalPortfolio](https://github.com/devpatel6780/PersonalPortfolio)

---

## Why this isn't just another portfolio template

Most portfolio sites are static — a list of projects and a contact form. This one ships an actual piece of AI infrastructure alongside the marketing copy:

- A **document ingestion script** parses my real resume PDF and chunks it by section (skills, each job, education) — not hand-typed text.
- Each chunk is converted into a **real vector embedding** via NVIDIA NIM's embedding model.
- Every question a visitor asks gets embedded too, and matched against those vectors with cosine similarity to find the most relevant facts.
- Only the retrieved facts are handed to an LLM to generate the answer — the model can't make things up about me that aren't in the source data, and it's instructed to say so (and point to my email) when it doesn't know something.
- It also knows when to **refuse**: ask it about something unrelated to me, and it redirects instead of answering off-topic questions.
- The answer **streams in token-by-token** instead of appearing all at once, and you can **speak your question and hear the answer back** instead of typing.

This page exists because I wanted my portfolio to demonstrate the exact class of system I actually build — retrieval-augmented generation — rather than just claim it in a bullet point. The Hero section even previews it directly: a small chat mockup with a "Try asking me something" button that opens the real assistant.

---

## How the chatbot works

```mermaid
flowchart TD
    A[Resume PDF] -->|pdf-parse| B[Ingestion script]
    B -->|chunk by section| C[knowledge.generated.json]
    C -->|embed once, cache| D[In-memory vector store]
    E[Visitor question] -->|typed or spoken| F[Query text]
    F -->|embed| G[Query vector]
    G -->|cosine similarity| D
    D -->|top 4 chunks| H[System prompt + context]
    H -->|streamed chat completion| I[NVIDIA NIM - Llama 3.1 8B]
    I -->|tokens stream in live| J[Chat widget: text + spoken aloud]
```

| Stage | Implementation |
|---|---|
| **Ingestion** | [`scripts/ingest-resume.mjs`](scripts/ingest-resume.mjs) parses the resume PDF with `pdf-parse`, splitting it into structured chunks (summary, 11 skill categories, 3 job entries, education, contact) using section-header and date-range regex matching. |
| **Embedding** | [`lib/nvidia.ts`](lib/nvidia.ts) calls NVIDIA NIM's `nv-embedqa-e5-v5` model (OpenAI-compatible API) to turn each chunk — and every incoming question — into a vector. |
| **Retrieval** | [`lib/retrieval.ts`](lib/retrieval.ts) embeds the knowledge base once and caches it in memory, then ranks chunks against the query by cosine similarity, returning the top 4. |
| **Generation** | [`app/api/chat/route.ts`](app/api/chat/route.ts) builds a guardrailed system prompt from the retrieved chunks and streams the completion from NVIDIA NIM's `meta/llama-3.1-8b-instruct` back to the browser as a raw text stream. |
| **UI** | [`components/ChatWidget.tsx`](components/ChatWidget.tsx) — a floating chat bubble available on every page, with voice input/output built in. |

**Worth knowing — what this is and isn't:** the vector "store" is an in-memory array, not a dedicated vector database (FAISS/Pinecone). At ~21 chunks, brute-force cosine similarity is the *correct* engineering choice — it's faster than building an index would be at this scale, and a real vector DB only pays off with much larger corpora or persistence requirements neither of which apply here. Embeddings and retrieval are genuinely computed on every request; nothing is hardcoded.

To regenerate the knowledge base after updating the resume:
```bash
npm run ingest
```

---

## Voice chat — talk to it instead of typing

The chat widget is a full voice interface, built entirely on the browser-native **Web Speech API** — no extra speech service, SDK, or API key required.

- **Speech-to-text input** — tapping the mic button spins up a `SpeechRecognition` instance that transcribes what you say and submits it as your message, exactly as if you'd typed it.
- **Streamed, spoken replies** — the answer types out live in the chat bubble as NVIDIA streams it back, then the full reply (plus a closing "Do you have any further questions?") is read aloud via `speechSynthesis`. A mute/unmute toggle in the widget header turns voice output off for anyone who'd rather read silently.
- **Continuous back-and-forth loop** — if your last turn came in by voice, the mic automatically re-opens the moment the assistant stops talking, so a conversation can run hands-free without reaching for the keyboard. A **"Done talking"** pill lets you end your turn explicitly instead of waiting on silence detection. Typed questions never trigger this — the mic only opens automatically once you've already opted into voice.
- **Graceful fallback** — the mic and speaker controls only render if `SpeechRecognition`/`webkitSpeechRecognition` and `speechSynthesis` are actually present, so the widget degrades to plain text chat on unsupported browsers instead of showing broken controls.

---

## Features

- **Chat-teaser hero** — a live mockup of the assistant with a one-click "Try asking me something" button, instead of a static headline
- **Selected Work** — real project case studies with results, not just descriptions
- **Experience timeline**, **Education**, and a full **Tech Stack** breakdown pulled from my actual resume
- **Working contact form** that sends real email via Resend, with reply-to wired to the visitor's address
- **RAG chat assistant** with streamed replies and full voice input/output (see above) — the centerpiece
- Clean, light UI with Framer Motion micro-interactions throughout

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | lucide-react |
| Chat LLM + embeddings | NVIDIA NIM (OpenAI-compatible API), streamed responses |
| Voice input/output | Web Speech API (`SpeechRecognition` + `speechSynthesis`) — no extra service or key |
| Email | Resend |
| PDF parsing | pdf-parse |

---

## Getting started

```bash
git clone https://github.com/devpatel6780/PersonalPortfolio.git
cd PersonalPortfolio
npm install
```

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key       # resend.com — powers the contact form
NVIDIA_API_KEY=your_nvidia_api_key       # build.nvidia.com — powers the chat assistant
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # lint
npm run ingest    # re-parse the resume PDF into lib/knowledge.generated.json
```

> Note: the actual resume PDF is gitignored and not included in this repo. The parsed knowledge chunks it produces (`lib/knowledge.generated.json`) are committed, so the chatbot works out of the box without needing the source PDF.

---

## Project structure

```
app/
  api/chat/route.ts        RAG endpoint: retrieval + streamed generation
  api/contact/route.ts     Contact form email endpoint (Resend)
  work/[slug]/page.tsx     Project case-study detail pages
  page.tsx                 Home page — composes all sections

components/
  ChatWidget.tsx           Floating RAG chat UI — streaming + voice input/output
  ChatTeaserPanel.tsx      Hero-side chat mockup that opens the real widget
  Hero.tsx                 Animated hero
  AboutSection.tsx, Services.tsx, WorkSection.tsx,
  Experience.tsx, Education.tsx, TechStack.tsx, Contact.tsx, Footer.tsx
  ui/                      Nav, custom cursor, shared primitives

lib/
  knowledge.ts             Merges resume-derived + project chunks
  knowledge.generated.json Output of the ingestion script
  retrieval.ts             Embedding cache + cosine-similarity search
  nvidia.ts                NVIDIA NIM client (embeddings + streamed chat)
  projects.ts              Project case-study data

scripts/
  ingest-resume.mjs        Resume PDF -> structured knowledge chunks
```

---

## Contact

- Email: devp70431@gmail.com
- LinkedIn: [linkedin.com/in/devrakeshpatel](https://www.linkedin.com/in/devrakeshpatel/)
- GitHub: [github.com/devpatel6780](https://github.com/devpatel6780)

Or just ask the chatbot on the site — that's what it's for.
