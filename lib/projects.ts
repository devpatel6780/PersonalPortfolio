export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  index: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  year: string;
  status: "Shipped" | "In Progress" | "Research" | "Open Source";
  gradient: string;
  results: ProjectResult[];
  detail: {
    problem: string;
    approach: string;
    outcome: string;
    highlights: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "careerpilot",
    index: "01",
    category: "Multi-Agent Systems",
    title: "CareerPilot — AI Career Assistant",
    description:
      "An eval-first, multi-agent system that analyzes a resume, ingests real job postings, scores fit, tailors resume content, drafts cover letters, and tracks applications — architected as independent LangGraph subgraphs behind a FastAPI backend.",
    stack: ["FastAPI", "LangGraph", "ChromaDB", "Next.js", "NVIDIA NIM", "SQLite"],
    year: "2026",
    status: "In Progress",
    gradient: "from-[#a855f7] to-[#7c3aed]",
    results: [
      { label: "Match Target", value: "ρ > 0.6" },
      { label: "Score Formula", value: "40% embed + 60% LLM" },
      { label: "Agent Subgraphs", value: "5" },
    ],
    detail: {
      problem:
        "Job seekers can't tell how well their resume actually matches a role, and manually tailoring a resume and cover letter for every application doesn't scale — while most \"AI apply\" tools cross into scraping and ToS-risk territory to get there.",
      approach:
        "Built as independent LangGraph subgraphs — resume analysis, job ingestion, matching, tailoring, and cover letter generation — each with its own state schema, orchestrated behind a FastAPI backend and a Next.js frontend. Jobs are ingested from the Greenhouse and Lever public APIs (no scraping, no ToS risk). Fit is scored as 40% embedding similarity (ChromaDB, cosine) plus 60% LLM-judged fit across strengths, gaps, and missing skills. Resume tailoring runs through a two-step chain: rewrite bullets toward the job's terminology using only facts already in the resume, then a second \"truthfulness guard\" LLM call flags — never silently deletes — any claim it can't trace back to the original resume.",
      outcome:
        "Matching quality is measured against a hand-labeled golden set rather than eyeballed, targeting Spearman ρ > 0.6, with precision/recall on missing-skill detection and a confusion matrix. The truthfulness guard is backed by a regression test that feeds it a deliberately fabricated claim and confirms it gets caught. Phases 0-2 (foundation, resume analysis, job ingestion) are done and verified end-to-end; matching, tailoring, cover letters, and the tracking dashboard are built and locally tested, currently going through live verification.",
      highlights: [
        "Each agent is a self-contained LangGraph subgraph — no agent reaches into another's internals",
        "Job ingestion via Greenhouse/Lever public APIs, deliberately avoiding LinkedIn/Indeed scraping",
        "Truthfulness guard catches fabricated resume claims, backed by a dedicated regression test",
        "Golden-set eval harness reports Spearman correlation and a missing-skill confusion matrix",
        "SQLite schema designed so a future Postgres swap is just a connection-string change",
      ],
    },
  },
  {
    slug: "rag-architecture",
    index: "02",
    category: "RAG / Retrieval",
    title: "RAG-Architecture — RAG Built From Scratch",
    description:
      "A from-scratch Retrieval-Augmented Generation pipeline built to understand what each LangChain call actually does under the hood, extended with a real evaluation harness instead of eyeballed correctness.",
    stack: ["LangChain", "ChromaDB", "Ollama", "sentence-transformers", "Streamlit"],
    year: "2026",
    status: "Research",
    gradient: "from-[#00d4ff] to-[#0080ff]",
    results: [
      { label: "Hit@5", value: "0.95" },
      { label: "MRR", value: "0.83" },
      { label: "Eval Set", value: "21 questions" },
    ],
    detail: {
      problem:
        "It's easy to call a high-level RAG chain and get something that looks right, without actually knowing what's happening at each stage — or having any numeric way to tell if retrieval quality is good, mediocre, or actively hurting answers.",
      approach:
        "Built the indexing and query pipeline stage by stage — load (TextLoader/PyPDFLoader), split (RecursiveCharacterTextSplitter), embed (local all-MiniLM-L6-v2, no API key), store (ChromaDB) — reading the library source at each step rather than trusting a black-box chain. Generation runs against a local Ollama model (qwen3:1.7b), called through raw http.client after tracing a low-level OpenSSL/Windows crash down to the HTTP client implementation itself. Added a hand-curated 21-question golden set scored for Hit@1/3/5 and MRR, plus an LLM-as-judge layer scoring faithfulness, relevance, and completeness.",
      outcome:
        "Hit@1 0.76, Hit@3 0.90, Hit@5 0.95, MRR 0.83 on the golden set. One retrieval weakness — a densely-packed clause that dilutes the embedding — is documented and kept as a known miss rather than hidden. The LLM-as-judge scores (4.95/4.86/4.86 avg) carry an explicit caveat that the judge is the same model generating the answers, so they reflect self-consistency, not independent ground truth. Part 1 (core pipeline) is done and re-verified, including correctly refusing an out-of-scope question instead of hallucinating; Part 2 (the eval harness) is in progress.",
      highlights: [
        "Every library call traced and understood, not just invoked",
        "Golden-set eval: Hit@1/3/5 and MRR, not eyeballed correctness",
        "Documents its own known retrieval weakness instead of hiding it",
        "LLM-as-judge scoring ships with an explicit self-consistency caveat",
        "Debugging log in the README traces an OpenSSL crash down to the HTTP client layer",
      ],
    },
  },
  {
    slug: "agenttrace",
    index: "03",
    category: "Developer Tools",
    title: "AgentTrace — LangGraph Debugger & Visualizer",
    description:
      "A local-first observability tool for LangGraph multi-agent runs — attach one callback to an existing graph and get a graph view, a Gantt timeline, and per-step cost/latency, with nothing leaving the machine.",
    stack: ["Python", "LangGraph", "SQLite", "WebSocket", "Vite"],
    year: "2026",
    status: "Open Source",
    gradient: "from-[#22c55e] to-[#16a34a]",
    results: [
      { label: "Setup", value: "1-line callback" },
      { label: "Storage", value: "100% local SQLite" },
      { label: "Live Updates", value: "WebSocket streaming" },
    ],
    detail: {
      problem:
        "Debugging a multi-agent LangGraph run usually means print statements or reading raw trace JSON — there's no visual way to see which node called what, how long each step took, or what a retry actually did, without changing the agent's code or sending traces anywhere.",
      approach:
        "Ships as a single callback (AgentTraceCallback) that plugs into an existing graph invocation with no changes to agent logic. Every node execution, tool call, and LLM call is captured with timestamps, latency, token usage, and a best-effort USD cost estimate that degrades to \"cost unavailable\" instead of showing a wrong number for unrecognized models. Retries are linked to their prior attempt and rendered as a grouped, dashed edge rather than a disconnected node. Traces write to a local SQLite file, and a Vite-built dashboard reads that same file and streams in-progress runs live over WebSocket.",
      outcome:
        "A read-only, local-first, single-user debugging tool — deliberately scoped to not include hosted/multi-user deployment, auth, replaying a run from the UI, or support for agent frameworks other than LangGraph. Ships with full trace export to JSON per run.",
      highlights: [
        "One callback, zero changes to existing agent code",
        "Retries rendered as linked, dashed edges instead of orphaned nodes",
        "Cost estimation degrades gracefully instead of guessing wrong",
        "Live WebSocket streaming of in-progress runs into the dashboard",
        "Nothing leaves the machine — traces and dashboard both read one local SQLite file",
      ],
    },
  },
  {
    slug: "brochure-generator",
    index: "04",
    category: "Agentic Systems",
    title: "brochure_generator — Navigation-Agent Brochure Generator",
    description:
      "A CLI that turns a company's homepage URL into a styled PDF brochure — not by scraping and dumping links into a prompt, but with a real LangGraph state machine that scores every link it finds and decides where to crawl next.",
    stack: ["Python", "LangGraph", "BeautifulSoup4", "WeasyPrint", "NVIDIA NIM"],
    year: "2026",
    status: "Shipped",
    gradient: "from-[#ec4899] to-[#db2777]",
    results: [
      { label: "Approach", value: "Agentic crawl, not scrape" },
      { label: "Link Scoring", value: "LLM-ranked per page" },
      { label: "Output", value: "Styled PDF" },
    ],
    detail: {
      problem:
        "The typical \"AI brochure\" script scrapes a homepage, dumps every link it finds, and prompts an LLM to write copy from whatever text landed in context — with no sense of which pages actually matter or any budget on how much it crawls.",
      approach:
        "A LangGraph navigation agent fetches a page, parses its links, scores each one for relevance with an LLM call, and decides whether to continue or stop — looping within a max-pages budget instead of a single-shot scrape. A content aggregator cleans and tags each visited page by source URL, a brochure-writer LLM call drafts sections from the aggregated content and chosen tone, and WeasyPrint renders the result into a PDF from an HTML/CSS template. Every LLM JSON output is Pydantic-validated. The console shows the agent's live reasoning — each link's relevance score and which page it visits next.",
      outcome:
        "Working end-to-end via a single CLI command (python -m brochure_gen <url> --tone investor --max-pages 5). Limitations are called out directly in the README rather than glossed over: no JS-rendered SPA support, no citation/grounding layer, no fact-checking critic pass, no prompt-injection sanitization of scraped content, single-page PDF only — each flagged as a v2 roadmap candidate.",
      highlights: [
        "Real agentic crawl: an LLM scores and chooses links within a page budget, not a fixed scrape",
        "Pydantic-validated JSON at every LLM call boundary",
        "Live console output of the agent's link-scoring reasoning",
        "Known limitations documented up front, not discovered by the user",
        "Roadmap already scoped: citation layer, fact-checking critic, Playwright for JS sites",
      ],
    },
  },
  {
    slug: "ppt-creation-agent",
    index: "05",
    category: "Generative Media",
    title: "PPT-Creation-agent — AI Narrated Presentation Generator",
    description:
      "Takes a slide deck, a narration script, and a short voice sample, and produces a video of the presentation narrated in that voice — running fully offline by default, with no per-request API cost.",
    stack: ["Python", "FFmpeg", "LibreOffice", "Chatterbox TTS", "ElevenLabs (optional)"],
    year: "2026",
    status: "Shipped",
    gradient: "from-[#f59e0b] to-[#ea580c]",
    results: [
      { label: "Generation Speed", value: "~11s / 18 words" },
      { label: "Pipeline Stages", value: "5/5 verified" },
      { label: "Voice Cost", value: "$0 local default" },
    ],
    detail: {
      problem:
        "Turning a slide deck and a script into a narrated video normally means either recording yourself reading it out loud, or paying per-request for cloud voice cloning — with no offline, zero-marginal-cost option that still sounds like you.",
      approach:
        "A pipeline converts the PPTX to slide images, maps narration to slides using [SLIDE N] markers in the script, generates speech from a short reference voice sample, and renders speech plus slide images into a final .mp4. Voice generation defaults to Chatterbox (Resemble AI, MIT-licensed) running fully offline in an isolated environment — no API key, no per-request cost, and the voice sample never leaves the machine, with optional GPU acceleration. ElevenLabs cloud cloning is available but opt-in only. A CLI ties the pipeline together, with a local browser GUI as an alternative for uploading files and generating videos without the command line.",
      outcome:
        "All five pipeline milestones are implemented, tested, and verified end-to-end against a real recorded voice sample, with measured performance documented (an 18-word clip generates in ~11s on a GTX 1070). Automated tests run offline against a fixture deck and a fake voice provider, so CI-style testing needs no GPU or API key. Chatterbox was chosen over Coqui XTTS-v2 after Coqui's parent company shut down and its license turned non-commercial-only.",
      highlights: [
        "Fully offline default voice path — no API key, no per-request cost, no data leaving the machine",
        "GPU or CPU-only voice generation, with an optional cloud provider for higher fidelity",
        "CLI and a local browser GUI cover both automation and one-off use",
        "Tests run against a fixture deck and fake voice provider — no GPU needed for CI",
        "Documented, measured performance rather than a vague \"it's fast\" claim",
      ],
    },
  },
  {
    slug: "react-web-search-agent",
    index: "06",
    category: "AI Agents",
    title: "react-web-search-agent — ReAct Web Search Agent",
    description:
      "A locally-running agent that searches the web, queries Wikipedia, and solves math — reasoning about which tool to use, calling it, and reading the result, with every step visible in the chat UI. No paid API keys anywhere.",
    stack: ["LangChain", "Ollama", "Streamlit", "Pydantic v2", "ddgs"],
    year: "2026",
    status: "Open Source",
    gradient: "from-[#a855f7] to-[#7c3aed]",
    results: [
      { label: "Pattern", value: "ReAct, visible reasoning" },
      { label: "Tools", value: "Search + Wiki + Calculator" },
      { label: "API Cost", value: "$0 fully local" },
    ],
    detail: {
      problem:
        "Small local models are noticeably less reliable at deciding when to call a tool versus just answering from memory — the usual fix (fine-tuning) is expensive and heavyweight for what's fundamentally a prompting problem.",
      approach:
        "Implements the ReAct (Reasoning + Acting) pattern with LangChain's create_agent over a local Ollama model (qwen3:1.7b by default): the agent reasons about which of three tools fits the question — DuckDuckGo search for current events/people/companies, Wikipedia for definitions and concepts, a calculator for arithmetic — calls it, reads the result, and repeats until confident. Every reasoning step is shown live in a Streamlit chat UI. Output is enforced through a Pydantic v2 schema (answer plus real source URLs) so the model can't fabricate a source.",
      outcome:
        "A well-written, strict system prompt — not fine-tuning — was the practical fix for the small 1.7B model's tendency to answer from memory instead of calling a tool. Three tools were deliberately chosen to cover three distinct retrieval patterns (live web, structured knowledge, computation), which also makes tool selection easy to demonstrate and verify.",
      highlights: [
        "Zero paid API keys — local Ollama model, DuckDuckGo search, Wikipedia library",
        "Pydantic-enforced output schema prevents fabricated source URLs",
        "Every ReAct reasoning step visible in the UI, not hidden behind a spinner",
        "System prompt engineering chosen over fine-tuning as the practical fix for a small model",
        "MIT licensed",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
