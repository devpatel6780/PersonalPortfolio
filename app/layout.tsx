import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ChatWidget } from "@/components/ChatWidget";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://devpatel.ai";
const TITLE = "Dev Patel — AI Engineer";
const DESCRIPTION =
  "AI engineer building multi-agent systems, retrieval pipelines, and inference infrastructure — evaluated against golden sets, not eyeballed. Currently building healthcare RAG at Tempus AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Dev Patel",
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
    <html lang="en" className={`${instrumentSans.variable} ${plexMono.variable}`}>
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
        <NoiseOverlay />
        <Nav />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
