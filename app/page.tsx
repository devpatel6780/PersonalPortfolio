import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { Services } from "@/components/Services";
import { WorkSection } from "@/components/WorkSection";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <main id="home">
        <Hero />
        <AboutSection />
        <Services />
        <WorkSection />
        <Experience />
        <Education />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
