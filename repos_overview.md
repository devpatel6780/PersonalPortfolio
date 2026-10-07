# Dev Patel — GitHub Repository Overview

_Compiled from github.com/devpatel6780 · September 2026_

This document walks through seven repositories, covering what each project does, how it's built, and what stage it's at.

---

## 1. PPT-Creation-agent — AI PPT Voice Video Generator

**What it does:** Takes a PowerPoint file, a narration script, and a short reference voice sample, and produces a narrated presentation video (`.mp4`) that sounds like the user presenting their own slides.

**Pipeline:**
1. PPTX → slide images (`app/services/ppt_processor.py`)
2. Narration → slide mapping (`app/services/script_processor.py`), using `[SLIDE N]` markers in the script
3. Voice sample → generated speech (`app/providers/`, `app/services/voice_service.py`)
4. Slide image + speech → rendered video (`audio_processor.py`, `video_renderer.py`)
5. A CLI (`app/cli.py`) ties it all together; there's also a local web GUI (`python main.py serve`) for uploading files and generating videos through a browser

**Tech stack:** Python backend, LibreOffice/FFmpeg for slide/video processing, and a pluggable voice-provider layer:
- **Local (default):** Chatterbox (Resemble AI, MIT-licensed) running fully offline in an isolated `.venv-tts` — no API key, no per-request cost, voice sample never leaves the machine. Supports GPU (CUDA) or CPU-only setup.
- **ElevenLabs (optional):** cloud voice cloning, used only if explicitly configured.

Chatterbox was chosen over Coqui XTTS-v2 because Coqui's license is non-commercial-only and the company behind it shut down; Chatterbox rated more natural in 2026 comparisons and carries no commercial restriction.

**Status:** Milestones 1–5 (the full CLI pipeline) are implemented, tested, and verified end-to-end with a real recorded voice sample. Measured performance is documented (e.g., an 18-word test clip takes ~11s to generate on a GTX 1070). Automated tests run offline against a fixture deck and a fake voice provider — no GPU or API key needed for CI-style testing.

---

## 2. AgentTrace — LangGraph Debugger/Visualizer

**What it does:** A local-first debugging and observability tool for LangGraph multi-agent runs. You attach one callback to an existing graph invocation (no changes to agent logic) and get a graph view, a Gantt-style timeline, and a per-step detail panel (inputs, outputs, latency, errors, cost) in a local web dashboard.

**How it works:**
```python
from agenttrace import AgentTraceCallback
tracer = AgentTraceCallback(agent_name="my-agent")
result = app.invoke(my_input, config={"callbacks": [tracer]})
```
Traces are written to a local SQLite file (`~/.agenttrace/traces.db`) and the dashboard reads from that same file — nothing leaves the machine.

**Captures:**
- Every node execution, tool call, and LLM/chat model call, with timestamps and latency
- Retries — a failed node/tool/LLM call that gets retried is linked to its prior attempt and shown as a grouped, dashed edge rather than a disconnected node
- Token usage and a best-effort USD cost estimate (degrades gracefully to "cost unavailable" for unrecognized models rather than showing a wrong number)
- Live streaming of in-progress runs into the dashboard via WebSocket
- Full trace export to JSON per run

**Tech stack:** Python package (installable via `pip install -e .`), a frontend built with Vite/npm, SQLite for storage, WebSocket for live updates.

**Scope (explicitly bounded):** Read-only visualization, local-first, single-user. No hosted/multi-user deployment, no auth, no replaying a run from the UI, and no support for agent frameworks other than LangGraph.

---

## 3. CareerPilot — AI Career Assistant

**What it does:** An AI-powered career assistant that analyzes a resume, ingests job descriptions from public job-board APIs, scores fit between resume and job, tailors resume content for a specific role, drafts cover letters, and tracks applications on a dashboard. Built as an eval-first, portfolio-level multi-agent system — matching quality is measured against a hand-labeled golden set with correlation metrics, not just "it seems to work."

**Explicitly out of scope:** browser automation, auto-apply, or scraping LinkedIn/Indeed/Glassdoor (ToS and account-ban risk) — noted as future work only.

**Architecture:**
```
Next.js Frontend  ──fetch/CORS──▶  FastAPI Backend
                                       │
                              LangGraph Agent Orchestrator ──▶ SQLite (resumes, jobs, matches, applications)
                                       │
        Resume Analysis · Job Ingestion · Matching · Tailoring · Cover Letter (each its own subgraph)
                                       │
                              ChromaDB (resume + job embeddings)
                                       │
                         NVIDIA NIM LLM client (swappable provider)
```
Each agent is a self-contained LangGraph subgraph with its own state schema — no agent calls another's internals directly.

**Tech stack:**
- Backend: FastAPI (Python)
- Orchestration: LangGraph (explicit state graphs, not opaque chains)
- LLM: NVIDIA NIM (`meta/llama-3.1-70b-instruct`, free tier), deterministic extraction (temperature=0, seed=0)
- Vector DB: ChromaDB for embedding similarity search
- Relational DB: SQLite (schema designed so a future Postgres swap is just a connection-string change)
- Job ingestion: Greenhouse and Lever public APIs (unauthenticated, ToS-safe)
- Frontend: Next.js 15 (App Router, TypeScript, React 19)
- Embeddings: `all-MiniLM-L6-v2` via `sentence-transformers`

**Matching logic:** combined score of 40% embedding similarity (cosine) + 60% LLM-judged fit score (0–100, with structured strengths/gaps/missing skills). Evaluated with a golden-set harness reporting Spearman correlation, precision/recall on missing-skill detection, and a confusion matrix; target bar is Spearman ρ > 0.6.

**Tailoring safety:** a two-step chain — rewrite bullets toward the job's terminology using only facts already in the resume, then a separate "truthfulness guard" LLM call that flags (never silently deletes) any claim not traceable to the original resume. Backed by a regression test that feeds it a deliberately fabricated claim and confirms it's caught.

**Frontend pages:** Resume upload/view, Jobs (ingest by company slug), Matches (match → tailor → cover letter → track, in one flow), and a Tracker table with application status (Not Applied/Applied/Interview/Rejected/Offer).

**Status:** Phases 0–2 (foundation, resume analysis, job ingestion) done and verified end-to-end. Phases 3–6 (matching, tailoring, cover letters, tracking dashboard) are built and locally tested with mocked LLM calls, going through live verification.

---

## 4. brochure_generator — AI Company Brochure Generator (Navigation-Agent Edition)

**What it does:** A CLI tool that takes a company's homepage URL and produces a styled one-page PDF brochure. Instead of a "scrape homepage → dump links → prompt an LLM" approach, it uses a real LangGraph state machine that scores every discovered link for relevance and decides where to crawl next within a page budget — an agentic crawl rather than a single-shot scrape.

**Architecture:**
```
CLI (company URL, tone)
   └─▶ Navigation Agent (LangGraph): fetch_page → parse_links → score_links (LLM) → decide (continue/stop), looped within a max_pages budget
        └─▶ Content Aggregator: cleans/truncates text per page, tags with source URL
             └─▶ Brochure Writer (LLM call): drafts sections from aggregated content + chosen tone
                  └─▶ PDF Renderer (WeasyPrint): fills an HTML/CSS template → PDF
```

**Tech stack:** Python 3.11+, LangGraph for the navigation agent, `requests` + BeautifulSoup4 for fetching/parsing (no headless browser), NVIDIA NIM (free tier) for link scoring and copywriting, Pydantic for schema validation of all LLM JSON output, WeasyPrint + Jinja2 for PDF rendering.

**Usage:**
```
python -m brochure_gen https://stripe.com --tone investor --max-pages 5
```
Console output shows the agent's live reasoning — every discovered link's relevance score and which page it visits next.

**Known limitations (documented in the README):** JS-rendered SPAs are out of scope (no headless browser); no grounding/citation layer tying claims back to source pages; no fact-checking critic pass; no prompt-injection sanitization of scraped content; single-page PDF output only.

**Roadmap (v2 candidates):** a citation/grounding layer, a critic agent for fact-checking, Playwright-based fetching for JS sites, a Streamlit front end, and multi-agent structured per-page extraction.

---

## 5. RAG-Architecture — RAG Built From Scratch

**What it does:** A step-by-step, from-scratch implementation of a full Retrieval-Augmented Generation pipeline using LangChain, built specifically to understand what each library call is actually doing (reading library source at each stage) rather than just invoking a high-level chain. Extended with a real evaluation harness to measure retrieval quality numerically.

**Pipeline:**
```
Indexing:  Load (TextLoader/PyPDFLoader) → Split (RecursiveCharacterTextSplitter) → Embed (HuggingFaceEmbeddings) → Store (Chroma)
Querying:  Embed query → Similarity search (top-K) → LLM generation grounded in retrieved chunks
```

**Tech stack:** LangChain core + community loaders, `pypdf` for PDF parsing, `sentence-transformers`/`langchain-huggingface` with the local `all-MiniLM-L6-v2` model (384-dim, no API key), ChromaDB (SQLite + HNSW index) as the vector store, and a local Ollama server (`qwen3:1.7b`) for generation — called via raw `http.client` rather than any SDK, after tracing a low-level OpenSSL/Windows crash down to the HTTP client implementation itself (documented in detail in the README as a debugging log).

**Evaluation harness (`eval/`):** a hand-curated 21-question golden set scored for Hit@1/3/5 and MRR:

| Metric | Score |
|---|---|
| Hit@1 | 0.76 |
| Hit@3 | 0.90 |
| Hit@5 | 0.95 |
| MRR | 0.83 |

One retrieval weakness is documented and kept as an intentional known miss rather than hidden (a densely-packed Annex A clause that dilutes the embedding). An LLM-as-judge layer additionally scores faithfulness/relevance/completeness (avg. 4.95/4.86/4.86 across 21 questions), with an explicit caveat printed alongside every report that the judge model is the same model generating the answers, so scores reflect self-consistency rather than independent ground truth. CI runs ruff + pytest (static-only, since a hosted runner can't reach local Ollama).

**Extras:** a Streamlit UI with chat history, error handling, and a "System Health" sidebar showing the latest eval snapshot.

**Status:** Part 1 (core pipeline) is done and re-verified, including correctly refusing an out-of-scope question ("What is the capital of France?") instead of hallucinating. Part 2 (evaluation harness) is in progress.

---

## 6. PersonalPortfolio — Dev Patel: AI Engineer Portfolio

**What it does:** A personal portfolio site (live at devpatelassistant.vercel.app) built around a RAG-powered chat assistant on the homepage that answers questions about Dev's background — by typing or voice — grounded in his actual resume and project case studies, rather than a static About page.

**How the RAG pipeline works:**

| Stage | Implementation |
|---|---|
| Ingestion | `scripts/ingest-resume.mjs` parses the resume PDF (`pdf-parse`), splitting it into structured chunks (summary, 11 skill categories, 3 job entries, education, contact) via section-header/date-range regex |
| Embedding | `lib/nvidia.ts` calls NVIDIA NIM's `nv-embedqa-e5-v5` model |
| Retrieval | `lib/retrieval.ts` embeds the knowledge base once, caches it in memory, ranks by cosine similarity, returns top 4 chunks |
| Generation | `app/api/chat/route.ts` builds a guardrailed system prompt from retrieved chunks and streams the completion from `meta/llama-3.1-8b-instruct` |
| UI | `components/ChatWidget.tsx` — a floating chat bubble with voice input/output |

Note from the README: the vector "store" is a plain in-memory array, not a dedicated vector DB — a deliberate choice, since brute-force cosine similarity over ~21 chunks is faster than building an index would be at that scale.

**Voice interface:** built entirely on the browser-native Web Speech API (no external speech service or key) — `SpeechRecognition` for speech-to-text input, `speechSynthesis` for spoken replies, a continuous back-and-forth loop that reopens the mic after a voice reply ends, and a "Done talking" control. Degrades gracefully to plain text chat on unsupported browsers.

**Other features:** a chat-teaser hero mockup, real project case studies with results, an experience/education timeline and tech-stack breakdown, and a working contact form (Resend) with reply-to wired to the visitor's address.

**Tech stack:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Framer Motion, `lucide-react` icons, NVIDIA NIM for chat/embeddings, Web Speech API for voice, Resend for email, `pdf-parse` for resume parsing.

---

## 7. react-web-search-agent — ReAct Web Search Agent

**What it does:** A locally-running AI agent with a browser-based chat interface that searches the web, queries Wikipedia, and solves math problems — using only a local LLM, no paid API keys. Implements the ReAct (Reasoning + Acting) pattern: it thinks about which tool to use, calls it, reads the result, and repeats until confident, with every reasoning step visible in the UI.

**Tool routing:**

| Question type | Tool |
|---|---|
| Current events, news, people, companies | `duckduckgo_search` |
| Definitions, history, science, concepts | `wikipedia_search` |
| Arithmetic/numeric calculation | `calculator` |

**Tech stack:** LangChain's `create_agent`, Ollama running locally (default model `qwen3:1.7b`), Streamlit for the chat UI, `ddgs` (DuckDuckGo search, no API key), the `wikipedia` Python library, Pydantic v2 for structured output (answer + real source URLs), `uv` for dependency management.

**Design decisions called out in the README:**
- Local LLM over OpenAI: zero API cost, no data leaving the machine, full control — tradeoff is a small (1.7B) model is less reliable at tool selection, addressed with a strict system prompt.
- Three tools cover three distinct retrieval patterns (live web, structured knowledge, computation), making tool selection easy to demonstrate.
- Pydantic-enforced output schema prevents the model from fabricating source URLs.
- A well-written system prompt was chosen over fine-tuning as the practical fix for small local models defaulting to answering from memory instead of calling tools.

**License:** MIT.

---

## At a glance

| Repo | Core idea | Primary stack |
|---|---|---|
| PPT-Creation-agent | Slides + script + voice sample → narrated video | Python, Chatterbox/ElevenLabs TTS, FFmpeg |
| AgentTrace | Local debugger/visualizer for LangGraph runs | Python, SQLite, WebSocket, Vite frontend |
| CareerPilot | Multi-agent resume-to-job matching & tracking system | FastAPI, LangGraph, ChromaDB, Next.js, NVIDIA NIM |
| brochure_generator | Agentic site crawl → PDF company brochure | Python, LangGraph, WeasyPrint, NVIDIA NIM |
| RAG-Architecture | RAG pipeline built from scratch, with eval harness | LangChain, ChromaDB, Ollama |
| PersonalPortfolio | Portfolio site with a RAG voice chat assistant | Next.js 16, NVIDIA NIM, Web Speech API |
| react-web-search-agent | ReAct agent with visible reasoning steps | LangChain, Ollama, Streamlit |

A common thread across all seven: LangGraph/LangChain-based agentic orchestration, a preference for free/local models (NVIDIA NIM free tier, Ollama) over paid APIs, and — notably on CareerPilot and RAG-Architecture — a deliberate emphasis on evaluation harnesses and golden sets rather than eyeballed correctness.
