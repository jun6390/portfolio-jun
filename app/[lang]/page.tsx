import ManifestoFlow from "@/components/effects/manifesto-flow";
import ScrollProgress from "@/components/layout/scroll-progress";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Roadmap from "@/components/sections/roadmap";
import Skill from "@/components/sections/skill";

const sections = [{ id: "contact", label: "Contact" }];

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
        <Roadmap />
        <ManifestoFlow reverse />

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-screen items-end border-b border-border px-container py-24"
          >
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                [05]
              </p>
              <h2 className="title">{section.label}</h2>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
