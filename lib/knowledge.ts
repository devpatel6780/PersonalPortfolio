import resumeChunks from "./knowledge.generated.json";

export interface KnowledgeChunk {
  id: string;
  text: string;
}

// Project chunks aren't on the resume PDF — they come from the actual
// project case studies on this site (lib/projects.ts), sourced from Dev's
// real GitHub repos (github.com/devpatel6780).
const projectChunks: KnowledgeChunk[] = [
  {
    id: "project-careerpilot",
    text: "Dev's flagship personal project is CareerPilot, an eval-first, multi-agent AI career assistant. It analyzes a resume, ingests real job postings from the Greenhouse and Lever public APIs (deliberately avoiding LinkedIn/Indeed scraping), scores resume-to-job fit as 40% embedding similarity plus 60% LLM-judged fit, tailors resume content, drafts cover letters, and tracks applications on a dashboard. It's built with a FastAPI backend, LangGraph subgraphs (resume analysis, job ingestion, matching, tailoring, cover letters — each with its own state schema), ChromaDB for embeddings, a Next.js frontend, and NVIDIA NIM as the LLM provider. A two-step tailoring chain rewrites resume bullets toward a job's terminology, then a separate 'truthfulness guard' LLM call flags any claim not traceable to the original resume, backed by a regression test. Matching quality is measured against a hand-labeled golden set targeting Spearman correlation above 0.6, not eyeballed. Phases 0-2 are done and verified end-to-end; the rest is built and locally tested, going through live verification.",
  },
  {
    id: "project-rag-architecture",
    text: "Dev built RAG-Architecture, a Retrieval-Augmented Generation pipeline built entirely from scratch with LangChain to understand what each library call actually does, rather than trusting a high-level chain. It loads and splits documents, embeds them locally with all-MiniLM-L6-v2 (no API key), stores them in ChromaDB, and generates answers with a local Ollama model (qwen3:1.7b). He added a hand-curated 21-question evaluation harness scoring Hit@1 (0.76), Hit@3 (0.90), Hit@5 (0.95), and MRR (0.83), plus an LLM-as-judge layer for faithfulness and relevance — with an explicit caveat that judge scores reflect self-consistency since the judge is the same model generating answers. One known retrieval weakness is documented rather than hidden. The core pipeline is done and verified; the eval harness is in progress.",
  },
  {
    id: "project-agenttrace",
    text: "Dev built AgentTrace, a local-first debugging and observability tool for LangGraph multi-agent runs. You attach a single callback to an existing graph with no changes to agent code, and get a graph view, a Gantt-style timeline, and per-step latency/cost in a local dashboard. It captures every node, tool, and LLM call, links retries to their prior attempt instead of showing them as disconnected nodes, and streams in-progress runs live over WebSocket. Traces are written to and read from a local SQLite file — nothing leaves the machine. Built in Python with a Vite frontend, installable via pip. It's deliberately scoped to read-only, local-first, single-user use, with no hosted deployment or support for frameworks other than LangGraph.",
  },
  {
    id: "project-brochure-generator",
    text: "Dev built brochure_generator, a CLI tool that turns a company's homepage URL into a styled PDF brochure using a real agentic crawl instead of a scrape-and-prompt approach. A LangGraph navigation agent fetches pages, scores every discovered link for relevance with an LLM call, and decides where to crawl next within a page budget. A content aggregator tags cleaned text by source page, an LLM drafts brochure copy in a chosen tone, and WeasyPrint renders it to PDF. Built with Python, LangGraph, BeautifulSoup4, and NVIDIA NIM, with Pydantic validating every LLM JSON output. The README documents its own limitations directly (no JS-rendered site support, no citation layer, no fact-checking pass) alongside a scoped v2 roadmap.",
  },
  {
    id: "project-ppt-creation-agent",
    text: "Dev built PPT-Creation-agent, a tool that takes a PowerPoint file, a narration script, and a short voice sample, and produces a narrated presentation video that sounds like the user presenting their own slides. The pipeline converts slides to images, maps narration to slides, generates speech from the voice sample, and renders it all into an .mp4. Voice generation defaults to Chatterbox (Resemble AI, MIT-licensed) running fully offline — no API key, no per-request cost, voice sample never leaves the machine — with optional cloud voice cloning via ElevenLabs. Built in Python with FFmpeg and LibreOffice for slide/video processing. All five pipeline milestones are implemented and verified end-to-end against a real recorded voice sample; an 18-word clip generates in about 11 seconds on a GTX 1070. Automated tests run offline with no GPU or API key required.",
  },
  {
    id: "project-react-web-search-agent",
    text: "Dev built react-web-search-agent, a locally-running AI agent with a Streamlit chat interface that implements the ReAct (Reasoning + Acting) pattern: it reasons about which tool fits a question, calls it, reads the result, and repeats until confident, with every reasoning step visible in the UI. It routes between DuckDuckGo web search, Wikipedia, and a calculator depending on the question type, using LangChain's create_agent over a local Ollama model (qwen3:1.7b) — zero paid API keys anywhere. A Pydantic v2 schema enforces structured output with real source URLs so the model can't fabricate a source. A strict system prompt, rather than fine-tuning, was the practical fix for the small model's tendency to answer from memory instead of calling a tool. MIT licensed.",
  },
];

// Resume-derived chunks (summary, skills, experience, education, contact)
// are generated from the actual resume PDF — see scripts/ingest-resume.mjs.
// Run `npm run ingest` after updating the resume file to regenerate them.
export const knowledgeBase: KnowledgeChunk[] = [...(resumeChunks as KnowledgeChunk[]), ...projectChunks];
