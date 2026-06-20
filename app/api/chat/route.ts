import { NextResponse } from "next/server";
import { chatComplete } from "@/lib/nvidia";
import { retrieveContext } from "@/lib/retrieval";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 6;

// Best-effort in-memory rate limit. Serverless instances are ephemeral, so
// this isn't airtight, but it stops casual abuse within a warm instance.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const SYSTEM_PROMPT = `You are the AI assistant embedded on Dev Patel's personal portfolio website. \
You answer visitor questions about Dev — his experience, skills, projects, and education — using ONLY the context provided below. \
Speak about Dev in the third person. Be concise (2-4 sentences), friendly, and specific. \
If the answer isn't in the provided context, say you don't have that information and suggest the visitor contact Dev directly at devp70431@gmail.com. \
If asked something unrelated to Dev (general knowledge, coding help, etc.), politely redirect: explain you can only answer questions about Dev Patel's background and work.`;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages — please wait a moment and try again." },
      { status: 429 }
    );
  }

  const { message, history } = await request.json();

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!process.env.NVIDIA_API_KEY) {
    return NextResponse.json(
      { error: "Chat assistant is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const context = await retrieveContext(message);
    const contextBlock = context.map((c) => `- ${c.text}`).join("\n");

    const priorMessages = Array.isArray(history)
      ? history.slice(-MAX_HISTORY).filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
        )
      : [];

    const reply = await chatComplete([
      { role: "system", content: `${SYSTEM_PROMPT}\n\nContext about Dev Patel:\n${contextBlock}` },
      ...priorMessages,
      { role: "user", content: message },
    ]);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Failed to get a response." }, { status: 500 });
  }
}
