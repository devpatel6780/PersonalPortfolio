import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { Capabilities } from "@/components/Capabilities";
import { Experience } from "@/components/Experience";
import { AboutSection } from "@/components/AboutSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <main id="main">
        <Hero />
        <WorkSection />
        <Capabilities />
        <Experience />
        <AboutSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
