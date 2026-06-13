"use client";

import Image from "next/image";
import { ArrowRight, Mouse } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";

type HeroContent = {
  title: string;
  stats: string;
};

type AboutContent = {
  description: string;
};

type HeroDictionary = {
  cta_primary: string;
  cta_secondary: string;
  scroll: string;
};

export default function Hero() {
  const { dictionary, contents } = useLanguage();

  const hero = contents.hero as HeroContent;
  const about = contents.about as AboutContent;
  const heroText = dictionary.hero as HeroDictionary;

  const heroImages = [
    "/hero-slider/makise-kurisu-2.webp",
    "/hero-slider/atam-1.webp",
    "/hero-slider/kintaro-2.webp",
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden bg-background px-container pt-32 pb-16 text-foreground"
    >
      <div className="relative z-10 flex w-full flex-col justify-end gap-10 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {hero.stats}
          </p>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {hero.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-2xl flex-col gap-8"
        >
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            {about.description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex h-12 w-fit items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-colors hover:bg-muted hover:text-foreground"
            >
              {heroText.cta_primary}
              <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex h-12 w-fit items-center justify-center rounded-full border border-border px-6 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mouse className="mr-3 size-4" />
              {heroText.cta_secondary}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 top-24 hidden w-[34vw] min-w-80 max-w-xl gap-4 opacity-25 lg:flex">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: index % 2 === 0 ? -24 : 24 }}
            transition={{ delay: 0.2 + index * 0.12, duration: 0.8 }}
            className="relative h-full flex-1 overflow-hidden rounded-3xl border border-border/40"
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 16vw, 0vw"
              className="object-cover grayscale"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
