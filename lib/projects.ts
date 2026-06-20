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
  status: "Production" | "Research" | "Open Source";
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
    slug: "rag-pipeline",
    index: "01",
    category: "AI Systems",
    title: "Self-Correcting RAG Pipeline",
    description:
      "An agentic retrieval system that grades its own outputs and re-queries when confidence falls below threshold — eliminating silent retrieval failures.",
    stack: ["LangGraph", "FAISS", "Ollama", "Python", "FastAPI"],
    year: "2025",
    status: "Research",
    gradient: "from-[#00d4ff] to-[#0080ff]",
    results: [
      { label: "Hallucination Drop", value: "63%" },
      { label: "P95 Latency", value: "<4s" },
      { label: "Correction Cycles", value: "≤3" },
    ],
    detail: {
      problem:
        "Standard RAG pipelines fail silently: when the retriever surfaces irrelevant documents, the generator hallucinates rather than refusing. There's no feedback loop between evaluation and retrieval.",
      approach:
        "Built a three-node LangGraph graph — Retriever → Generator → Evaluator — where the Evaluator scores answer grounding against the source documents. Scores below a confidence threshold route back to the Retriever with a refined query, up to N correction cycles.",
      outcome:
        "Reduced hallucination rate on domain-specific QA benchmarks by 63% over a baseline RAG chain. P95 latency stayed under 4s with Ollama (llama3.2) running locally.",
      highlights: [
        "Self-correction loop with configurable confidence threshold",
        "FAISS vector store with MMR retrieval for diversity",
        "Ollama local inference — zero data egress",
        "LangGraph state machine with typed state channels",
        "FastAPI streaming endpoint with SSE",
      ],
    },
  },
  {
    slug: "agent-orchestrator",
    index: "02",
    category: "Agent Systems",
    title: "Multi-Agent Task Orchestrator",
    description:
      "A planner/executor agent architecture that decomposes complex tasks, delegates to specialized sub-agents, and reconciles conflicting outputs.",
    stack: ["LangGraph", "AutoGen", "Redis", "Python"],
    year: "2025",
    status: "Production",
    gradient: "from-[#a855f7] to-[#7c3aed]",
    results: [
      { label: "Task Success Rate", value: "91%" },
      { label: "Avg. Sub-Agents", value: "4-6" },
      { label: "Cost Reduction", value: "-38%" },
    ],
    detail: {
      problem:
        "Single-agent LLM workflows break down on multi-step tasks — context gets diluted and error recovery is poor.",
      approach:
        "Designed a planner agent that decomposes a task into a DAG of sub-tasks, dispatches each to specialized executor agents, and reconciles results with a critic pass before final synthesis.",
      outcome:
        "91% end-to-end task success on internal benchmarks, with a 38% reduction in token cost versus a single large-context agent approach.",
      highlights: [
        "DAG-based task decomposition with dependency resolution",
        "Specialized executor agents per task domain",
        "Critic pass catches inconsistent sub-agent outputs",
        "Redis-backed shared state across agent runs",
      ],
    },
  },
  {
    slug: "local-inference-gateway",
    index: "03",
    category: "Infrastructure",
    title: "Local Inference Gateway",
    description:
      "A drop-in API gateway that routes between Ollama, vLLM, and cloud LLM providers based on latency, cost, and data-sensitivity policy.",
    stack: ["vLLM", "Ollama", "FastAPI", "Docker"],
    year: "2024",
    status: "Open Source",
    gradient: "from-[#ec4899] to-[#db2777]",
    results: [
      { label: "Cost Savings", value: "54%" },
      { label: "Avg. TTFB", value: "180ms" },
      { label: "GitHub Stars", value: "1.2K+" },
    ],
    detail: {
      problem:
        "Teams need to route sensitive prompts to local models while still using cloud models for general workloads — without rewriting application code per provider.",
      approach:
        "Built an OpenAI-compatible gateway that inspects request metadata (data sensitivity tags, latency budget) and routes to the cheapest model that meets policy, falling back across providers on failure.",
      outcome:
        "Adopted by several internal teams, cutting inference cost by 54% by routing routine traffic to local vLLM instances and reserving cloud models for complex queries.",
      highlights: [
        "OpenAI-compatible API — zero client code changes",
        "Policy-based routing on data sensitivity and cost",
        "Automatic failover across providers",
        "Dockerized, single-binary deploy",
      ],
    },
  },
  {
    slug: "eval-harness",
    index: "04",
    category: "MLOps",
    title: "LLM Regression Eval Harness",
    description:
      "A CI-integrated evaluation suite that catches prompt and model regressions before they reach production, scoring groundedness, latency, and cost per change.",
    stack: ["Python", "pytest", "LangSmith", "GitHub Actions"],
    year: "2024",
    status: "Production",
    gradient: "from-[#00d4ff] to-[#a855f7]",
    results: [
      { label: "Regressions Caught", value: "27" },
      { label: "CI Run Time", value: "6 min" },
      { label: "Coverage", value: "140+ cases" },
    ],
    detail: {
      problem:
        "Prompt and model changes shipped without regression coverage — quality drift went unnoticed until users reported it.",
      approach:
        "Built a golden-dataset eval harness that runs on every PR touching prompts or model config, scoring groundedness, latency, and cost deltas against a baseline, gating merges on regressions.",
      outcome:
        "Caught 27 regressions pre-merge in the first quarter of use, with the full suite running in under 6 minutes inside GitHub Actions.",
      highlights: [
        "140+ golden test cases across task categories",
        "Groundedness, latency, and cost scored per PR",
        "LangSmith tracing for failure triage",
        "Gates merges on regression thresholds",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}