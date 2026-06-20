import { knowledgeBase, type KnowledgeChunk } from "./knowledge";
import { embedTexts, cosineSimilarity } from "./nvidia";

interface EmbeddedChunk extends KnowledgeChunk {
  embedding: number[];
}

let cachedEmbeddings: Promise<EmbeddedChunk[]> | null = null;

function getKnowledgeEmbeddings(): Promise<EmbeddedChunk[]> {
  if (!cachedEmbeddings) {
    cachedEmbeddings = (async () => {
      const vectors = await embedTexts(knowledgeBase.map((c) => c.text), "passage");
      return knowledgeBase.map((chunk, i) => ({ ...chunk, embedding: vectors[i] }));
    })();
  }
  return cachedEmbeddings;
}

export async function retrieveContext(query: string, topK = 4): Promise<KnowledgeChunk[]> {
  const [knowledge, [queryVector]] = await Promise.all([
    getKnowledgeEmbeddings(),
    embedTexts([query], "query"),
  ]);

  return knowledge
    .map((chunk) => ({ chunk, score: cosineSimilarity(chunk.embedding, queryVector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.chunk);
}
