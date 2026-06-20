import OpenAI from "openai";

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const CHAT_MODEL = "meta/llama-3.1-8b-instruct";
const EMBED_MODEL = "nvidia/nv-embedqa-e5-v5";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is not configured.");
  }
  if (!client) {
    client = new OpenAI({ apiKey, baseURL: NVIDIA_BASE_URL });
  }
  return client;
}

export async function embedTexts(
  texts: string[],
  inputType: "query" | "passage"
): Promise<number[][]> {
  const res = await getClient().embeddings.create({
    model: EMBED_MODEL,
    input: texts,
    // NVIDIA's QA embedding model requires this extra field to distinguish
    // a search query from the passages it will be matched against.
    // @ts-expect-error -- NVIDIA-specific extension to the OpenAI embeddings API
    input_type: inputType,
    encoding_format: "float",
  });
  return res.data.map((d) => d.embedding);
}

export async function chatComplete(messages: { role: "system" | "user" | "assistant"; content: string }[]) {
  const res = await getClient().chat.completions.create({
    model: CHAT_MODEL,
    messages,
    temperature: 0.4,
    max_tokens: 350,
  });
  return res.choices[0]?.message?.content ?? "";
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
