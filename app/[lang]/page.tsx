import ManifestoFlow from "@/components/effects/manifesto-flow";
import ScrollProgress from "@/components/layout/scroll-progress";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skill from "@/components/sections/skill";

const sections = [
  { id: "roadmap", label: "Roadmap" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main className="relative bg-background text-foreground">
        <Hero />
        <About />
        <ManifestoFlow />
        <Skill />
        <ManifestoFlow reverse />
        <Projects />
        <ManifestoFlow />

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-screen items-end border-b border-border px-container py-24"
          >
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 4).padStart(3, "0")}
              </p>
              <h2 className="title">{section.label}</h2>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
