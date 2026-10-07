import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ChatWidget } from "@/components/ChatWidget";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const SITE_URL = "https://devpatel.ai";
const TITLE = "Dev Patel - AI Engineer";
const DESCRIPTION =
  "Dev Patel is an AI/ML engineer in Farmington Hills, Michigan, building deep learning workflows, production ML systems, multi-agent applications, and RAG pipelines with Python and PyTorch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s - Dev Patel",
  },
  description: DESCRIPTION,
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM",
    "RAG",
    "LangGraph",
    "Multi-agent systems",
    "Retrieval-Augmented Generation",
  ],
  authors: [{ name: "Dev Patel" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Dev Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="light"){document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[999] -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
