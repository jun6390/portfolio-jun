import ScrollProgress from "@/components/layout/scroll-progress";
import Hero from "@/components/sections/hero";

const sections = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "roadmap", label: "Roadmap" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main className="relative bg-background text-foreground">
        <Hero />

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-screen items-end border-b border-border px-container py-24"
          >
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 2).padStart(2, "0")}
              </p>
              <h2 className="title">{section.label}</h2>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
