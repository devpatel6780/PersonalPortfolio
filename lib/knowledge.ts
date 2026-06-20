import resumeChunks from "./knowledge.generated.json";

export interface KnowledgeChunk {
  id: string;
  text: string;
}

// Project chunks aren't on the resume PDF — they come from the actual
// project case studies on this site (lib/projects.ts).
const projectChunks: KnowledgeChunk[] = [
  {
    id: "project-rag-pipeline",
    text: "Dev's flagship personal project is a Self-Correcting RAG Pipeline: an agentic retrieval system that grades its own answers and re-queries when confidence falls below a threshold, eliminating silent retrieval failures. It's built with LangGraph, FAISS, Ollama, Python, and FastAPI, using a Retriever-Generator-Evaluator loop. It reduced hallucination rate by 63% over a baseline RAG chain, with P95 latency under 4 seconds.",
  },
  {
    id: "project-agent-orchestrator",
    text: "Dev built a Multi-Agent Task Orchestrator: a planner/executor agent architecture using LangGraph and AutoGen that decomposes complex tasks into a DAG, delegates to specialized sub-agents, and reconciles outputs with a critic pass. It achieved a 91% end-to-end task success rate and cut token cost by 38% versus a single large-context agent.",
  },
  {
    id: "project-inference-gateway",
    text: "Dev built a Local Inference Gateway: an open-source, OpenAI-compatible API gateway that routes between Ollama, vLLM, and cloud LLM providers based on latency, cost, and data-sensitivity policy. It cut inference cost by 54% by routing routine traffic to local vLLM instances.",
  },
  {
    id: "project-eval-harness",
    text: "Dev built an LLM Regression Eval Harness: a CI-integrated evaluation suite with 140+ golden test cases that scores groundedness, latency, and cost per pull request, gating merges on regressions. It caught 27 regressions pre-merge in its first quarter of use, running in under 6 minutes inside GitHub Actions.",
  },
];

// Resume-derived chunks (summary, skills, experience, education, contact)
// are generated from the actual resume PDF — see scripts/ingest-resume.mjs.
// Run `npm run ingest` after updating the resume file to regenerate them.
export const knowledgeBase: KnowledgeChunk[] = [...(resumeChunks as KnowledgeChunk[]), ...projectChunks];
