"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useLanguage } from "@/providers/language-provider";
import type { StackCategories, StackItem } from "@/types/stack";
import Image from "next/image";

type SkillDictionary = {
  stackTitle: string;
  frontendStack: string;
  backendStack: string;
  databaseStack: string;
  toolsStack: string;
};

export default function Skill() {
  const { dictionary, contents } = useLanguage();

  const skillText = dictionary as unknown as SkillDictionary;
  const stack = contents.stack as StackCategories;

  const categories = [
    {
      title: skillText.frontendStack || "Frontend",
      items: stack?.frontend || [],
    },
    {
      title: skillText.backendStack || "Backend",
      items: stack?.backend || [],
    },
    {
      title: skillText.databaseStack || "Database",
      items: stack?.database || [],
    },
    {
      title: skillText.toolsStack || "Tools",
      items: stack?.tools || [],
    },
  ];

  return (
    <section
      id="stack"
      className="relative w-full overflow-hidden bg-background py-16 text-foreground md:py-24 lg:py-32 xl:py-40 2xl:py-36"
    >
      <div className="container mx-auto flex h-full flex-col px-container">
        <div className="mb-16 flex flex-col gap-4">
          <BlurReveal>
            <span className="title-counter">[02]</span>
          </BlurReveal>

          <BlurReveal>
            <h2 className="title">{skillText.stackTitle || "Skill"}</h2>
          </BlurReveal>
        </div>

        <div className="mb-6 flex flex-col gap-container">
          {categories.map((category, categoryIndex) => (
            <BlurReveal key={category.title}>
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground/40">
                    0{categoryIndex + 1}
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-6">
                  {category.items.map((item: StackItem) => (
                    <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                      <HoverCardTrigger asChild>
                        <div className="group flex shrink-0 cursor-default items-center gap-3 px-1 py-2.5">
                          <div className="opacity-50 grayscale transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={20}
                              height={20}
                              className="size-5 object-contain"
                            />
                          </div>
                          <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                            {item.name}
                          </span>
                        </div>
                      </HoverCardTrigger>

                      <HoverCardContent
                        side="top"
                        align="center"
                        className="flex w-auto flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl"
                      >
                        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-foreground/5 to-transparent" />

                        <div className="relative rounded-xl bg-secondary/50 p-3 shadow-inner ring-1 ring-border/50 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={36}
                            height={36}
                            className="size-9 object-contain drop-shadow-lg"
                          />
                        </div>

                        <div className="z-10 flex flex-col items-center justify-center gap-1">
                          <span className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {category.title}
                          </span>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
