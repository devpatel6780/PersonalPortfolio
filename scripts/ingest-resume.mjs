import { readFile, writeFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const RESUME_PATH = "./AIML_Engineer___DevPatel.pdf";
const OUTPUT_PATH = "./lib/knowledge.generated.json";
const HEADERS = ["Summary", "Technical Skills", "Experience", "Projects", "Education"];
const DATE_RANGE_RE = /\b(?:[A-Za-z]{3,9}\.?\s+)?\d{4}\s*[-–]\s*(?:[A-Za-z]{3,9}\.?\s+)?(?:\d{4}|Present)\b/;
const PROJECT_IDS = [
  [/^CareerPilot\b/, "project-careerpilot"],
  [/^AgentTrace\b/, "project-agenttrace"],
  [/^RAG Pipeline\b/, "project-rag-architecture"],
  [/^AI Voice-Cloned\b/, "project-ppt-creation-agent"],
];

function clean(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractSection(lines, header) {
  const start = lines.findIndex((line) => line.toLowerCase() === header.toLowerCase());
  if (start === -1) throw new Error(`Missing resume section: ${header}`);
  const next = lines.findIndex((line, i) => i > start && HEADERS.some((h) => h.toLowerCase() === line.toLowerCase()));
  const section = lines.slice(start + 1, next === -1 ? lines.length : next);
  if (!section.length) throw new Error(`Empty resume section: ${header}`);
  return section;
}

function parseSkills(lines) {
  const entries = [];
  for (const line of lines) {
    if (line.includes(":")) entries.push(line.replace(/^•\s*/, ""));
    else if (entries.length) entries[entries.length - 1] += ` ${line}`;
    else throw new Error(`Skill has no category: ${line}`);
  }
  return entries.map((entry, i) => ({
    id: `skills-${i}`,
    text: `Dev Patel's skills in ${entry.replace(":", " include:")}`,
  }));
}

function parseEntries(lines, isHeader, makeId) {
  const entries = [];
  for (const line of lines) {
    if (isHeader(line)) entries.push({ header: line, lines: [line] });
    else if (entries.length) entries[entries.length - 1].lines.push(line);
    else throw new Error(`Entry has no heading: ${line}`);
  }
  return entries.map((entry, i) => ({
    id: makeId(entry.header, i),
    text: `Dev Patel: ${clean(entry.lines.join(" "))}`,
  }));
}

async function main() {
  const parser = new PDFParse({ data: await readFile(RESUME_PATH) });
  let text;
  try {
    ({ text } = await parser.getText());
  } finally {
    await parser.destroy();
  }
  // Strip page markers before grouping so bullets spanning pages stay together.
  const lines = text.split("\n").map(clean).filter((line) => line && !/^--\s*\d+ of \d+\s*--$/.test(line));
  const sections = Object.fromEntries(HEADERS.map((header) => [header, extractSection(lines, header)]));
  const contact = lines.slice(1, lines.findIndex((line) => line.toLowerCase() === "summary"));
  if (!contact.join(" ").includes("@")) throw new Error("Missing resume contact email");

  const chunks = [
    { id: "summary", text: `${lines[0]} — ${clean(sections.Summary.join(" "))}` },
    ...parseSkills(sections["Technical Skills"]),
    ...parseEntries(sections.Experience, (line) => DATE_RANGE_RE.test(line), (_, i) => `experience-${i}`),
    ...parseEntries(sections.Projects, (line) => /GitHub$/.test(line), (header) => {
      const match = PROJECT_IDS.find(([pattern]) => pattern.test(header));
      if (!match) throw new Error(`Unmapped resume project: ${header}`);
      return match[1];
    }),
    { id: "education", text: `Dev Patel's education: ${clean(sections.Education.join(" "))}` },
    { id: "contact", text: `Dev Patel's location and contact details: ${clean(contact.join(" "))}` },
  ];
  if (new Set(chunks.map((chunk) => chunk.id)).size !== chunks.length) {
    throw new Error("Duplicate knowledge chunk IDs");
  }
  await writeFile(OUTPUT_PATH, JSON.stringify(chunks, null, 2) + "\n", "utf-8");
  console.log(`Ingested ${chunks.length} chunks from "${RESUME_PATH}" -> ${OUTPUT_PATH}`);
  chunks.forEach((chunk) => console.log(`  [${chunk.id}] ${chunk.text.slice(0, 90)}...`));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
