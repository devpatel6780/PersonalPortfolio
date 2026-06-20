export interface KnowledgeChunk {
  id: string;
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "summary",
    text: "Dev Patel is an entry-level AI/ML Engineer with hands-on experience building end-to-end machine learning and LLM-powered applications, including RAG systems, semantic search, and scalable inference pipelines. He is currently pursuing a Master of Science in Computer Science.",
  },
  {
    id: "current-role",
    text: "Dev is currently an AI Engineer Intern at Tempus AI, United States (Apr 2026 – Present). He assists in developing RAG-based semantic search workflows using embeddings and vector databases such as FAISS and Pinecone, supports FastAPI-based inference pipeline development for LLM-powered question-answering applications, works on preprocessing and ETL workflows for structured and unstructured healthcare datasets, contributes to AWS SageMaker model deployment and monitoring, performs prompt engineering experiments, and assists in experiment tracking and model evaluation using MLflow.",
  },
  {
    id: "research-role",
    text: "From Jul 2025 to Mar 2026, Dev was a Research Assistant at the University of Wisconsin–Milwaukee. He developed deep learning-based multi-class image classification models (EfficientNet-B3, MobileNetV3) achieving 90.63% accuracy on medical imaging datasets. He implemented attention modules (P_scSE, ECA) and advanced preprocessing techniques (MixUp, ROI extraction) to improve minority-class prediction, built data pipelines for image augmentation and feature extraction, and used Grad-CAM for interpretability and explainable AI analysis. He optimized training performance with PyTorch and GPU-based workflows.",
  },
  {
    id: "hcl-role",
    text: "From Apr 2022 to Jul 2024, Dev worked as a Junior ML Engineer at HCL Technologies, India. He improved ML model performance by 5–10% through feature engineering, hyperparameter tuning, and preprocessing with Scikit-learn and XGBoost. He developed end-to-end ML pipelines including ETL workflows, model training, and evaluation using Python and SQL. He designed REST API-based deployment solutions using Flask/FastAPI for real-time inference, built NLP-based chatbot systems using transformer embeddings and early-stage semantic search, and automated training workflows with Docker and CI/CD pipelines.",
  },
  {
    id: "education",
    text: "Dev is completing a Master of Science in Computer Science at the University of Wisconsin–Milwaukee, with a GPA of 3.38 out of 4.00, expected to graduate in May 2026.",
  },
  {
    id: "skills-programming-ml",
    text: "Dev's core technical skills include Python and SQL for programming; Scikit-learn, XGBoost, Pandas, and NumPy for machine learning; and PyTorch and TensorFlow for deep learning.",
  },
  {
    id: "skills-nlp-llm",
    text: "In NLP and LLM work, Dev has experience with Hugging Face, the OpenAI API, LangChain, prompt engineering, RAG (retrieval-augmented generation), and semantic search.",
  },
  {
    id: "skills-data-cloud",
    text: "Dev's data engineering experience covers ETL pipelines, data workflows, and feature engineering. He has worked with PostgreSQL, MySQL, and MongoDB databases, FAISS and Pinecone vector databases, and AWS (S3, EC2, SageMaker) and Azure ML cloud platforms.",
  },
  {
    id: "skills-mlops-deploy",
    text: "For MLOps, Dev uses MLflow for experiment tracking and versioning, along with CI/CD pipelines and Docker. For deployment, he builds FastAPI and REST API services, model deployment workflows, and inference pipelines. He also uses Git, GitHub Actions, Linux, and Spark.",
  },
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
  {
    id: "contact",
    text: "You can reach Dev Patel by email at devp70431@gmail.com, on LinkedIn at linkedin.com/in/devrakeshpatel, or on GitHub at github.com/devpatel6780. He is currently open to remote work opportunities.",
  },
];
