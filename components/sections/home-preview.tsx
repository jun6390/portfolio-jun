"use client";

import { useLanguage } from "@/providers/language-provider";

export default function HomePreview() {
  const { lang, dictionary, contents } = useLanguage();

  const nav = dictionary.nav as {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };

  const hero = contents.hero as {
    title: string;
    stats: string;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {lang}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold">{hero.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{hero.stats}</p>

        <nav className="mt-10 flex flex-wrap gap-3 text-sm">
          <span>{nav.home}</span>
          <span>{nav.about}</span>
          <span>{nav.projects}</span>
          <span>{nav.contact}</span>
        </nav>
      </section>
    </main>
  );
}
