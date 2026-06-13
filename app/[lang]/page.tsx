import ScrollProgress from "@/components/layout/scroll-progress";

const sections = [
  { id: "home", label: "Home" },
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

      <main className="bg-background text-foreground">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-screen items-end border-b border-border px-container py-24"
          >
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h1 className="font-display text-6xl font-black uppercase tracking-normal">
                {section.label}
              </h1>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
