import { readFile, writeFile } from "fs/promises";
import { PDFParse } from "pdf-parse";

const RESUME_PATH = "./Dev_AI Engineer Intern.pdf";
const OUTPUT_PATH = "./lib/knowledge.generated.json";

const DATE_RANGE_RE = /\b(?:[A-Za-z]{3,9}\.?\s+)?\d{4}\s*[-–]\s*(?:[A-Za-z]{3,9}\.?\s+)?(?:\d{4}|Present)\b/;

function clean(text) {
  return text.replace(/\s+/g, " ").trim();
}

function extractSection(lines, startHeader, endHeader) {
  const startIdx = lines.findIndex((l) => l.trim() === startHeader);
  const endIdx = endHeader ? lines.findIndex((l) => l.trim() === endHeader) : lines.length;
  if (startIdx === -1) return [];
  return lines.slice(startIdx + 1, endIdx === -1 ? lines.length : endIdx);
}

function parseSkills(lines) {
  const joined = clean(lines.join(" "));
  // Split on the bullet character; each segment is "Category: item, item, ..."
  const segments = joined.split("•").map((s) => s.trim()).filter(Boolean);
  return segments.map((seg, i) => {
    const [category, ...rest] = seg.split(":");
    const items = rest.join(":").trim();
    return {
      id: `skills-${i}`,
      text: `Dev Patel's skills in ${category.trim()} include: ${items}`,
    };
  });
}

function parseExperience(lines) {
  const entries = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (DATE_RANGE_RE.test(line)) {
      if (current) entries.push(current);
      const dateMatch = line.match(DATE_RANGE_RE);
      const dates = dateMatch[0];
      const header = line.slice(0, dateMatch.index).trim();
      const [titlePart, ...companyParts] = header.split("|");
      current = {
        title: titlePart.trim(),
        company: companyParts.join("|").trim(),
        dates,
        bullets: [],
      };
    } else if (current) {
      if (line.startsWith("•")) {
        current.bullets.push(line.slice(1).trim());
      } else if (current.bullets.length > 0) {
        // Wrapped continuation of the previous bullet line
        current.bullets[current.bullets.length - 1] += " " + line;
      }
    }
  }
  if (current) entries.push(current);

  return entries.map((entry, i) => ({
    id: `experience-${i}`,
    text: `${entry.title} at ${entry.company} (${entry.dates}). ${entry.bullets
      .map((b) => clean(b))
      .join(" ")}`,
  }));
}

async function main() {
  const buffer = await readFile(RESUME_PATH);
  const parser = new PDFParse({ data: buffer });
  const { text } = await parser.getText();
  await parser.destroy();

  const lines = text.split("\n");

  const nameLine = lines[0]?.trim() ?? "";
  const contactLine = lines[1]?.trim() ?? "";
  const phoneMatch = contactLine.match(/\(\d{3}\)\s*\d{3}[-–]\d{4}/);

  const summaryLines = extractSection(lines, "SUMMARY", "TECHNICAL SKILLS");
  const skillsLines = extractSection(lines, "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE");
  const experienceLines = extractSection(lines, "PROFESSIONAL EXPERIENCE", "EDUCATION");
  const educationLines = extractSection(lines, "EDUCATION", null).filter(
    (l) => !l.includes("-- ") // strip pdf-parse page-break markers
  );

  const chunks = [
    { id: "summary", text: `${nameLine} — ${clean(summaryLines.join(" "))}` },
    ...parseSkills(skillsLines),
    ...parseExperience(experienceLines),
    { id: "education", text: clean(educationLines.join(" ")) },
    {
      id: "contact",
      text: `You can reach Dev Patel by email at devp70431@gmail.com${
        phoneMatch ? ` or by phone at ${phoneMatch[0]}` : ""
      }, on LinkedIn at linkedin.com/in/devrakeshpatel, or on GitHub at github.com/devpatel6780. He is currently open to remote work opportunities.`,
    },
  ];

  await writeFile(OUTPUT_PATH, JSON.stringify(chunks, null, 2) + "\n", "utf-8");
  console.log(`Ingested ${chunks.length} chunks from "${RESUME_PATH}" -> ${OUTPUT_PATH}`);
  chunks.forEach((c) => console.log(`  [${c.id}] ${c.text.slice(0, 90)}...`));
}

main();
