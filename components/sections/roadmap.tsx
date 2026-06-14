"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type RoadmapDictionary = {
  title: string;
};

type RoadmapItem = {
  id: string;
  year: string;
  description: string;
  tags: string[];
};

type RoadmapContent = {
  description: string;
  items: RoadmapItem[];
};

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dictionary, contents } = useLanguage();

  const roadmapText = dictionary.roadmap as RoadmapDictionary;
  const roadmap = contents.roadmap as RoadmapContent;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={containerRef}
      id="roadmap"
      className="relative overflow-hidden border-t border-border/50 py-32 xl:py-48"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-full max-w-lg -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[500px] w-full max-w-lg translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        style={{ y: yBackground }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.02]"
      >
        <div className="whitespace-nowrap text-[20vw] font-black uppercase tracking-tighter">
          {roadmapText.title}
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-6xl px-container">
        <div className="mb-24 flex flex-col gap-4 text-center md:mb-40 md:items-center">
          <BlurReveal>
            <span className="title-counter">[04]</span>
          </BlurReveal>

          <BlurReveal>
            <h2 className="title">{roadmapText.title}</h2>
          </BlurReveal>

          <BlurReveal>
            <p className="mt-3 max-w-xl text-lg font-medium italic tracking-tight text-foreground/60">
              {roadmap.description}
            </p>
          </BlurReveal>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-border/40 md:left-1/2" />

          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute bottom-0 left-6 top-0 z-10 w-[2px] -translate-x-1/2 bg-linear-to-b from-primary via-primary to-transparent md:left-1/2"
          />

          <div className="relative z-20 flex w-full flex-col gap-8 md:gap-24">
            {roadmap.items.map((item, index) => (
              <TimelineNode
                key={item.id}
                item={item}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  item,
  isEven,
}: {
  item: RoadmapItem;
  isEven: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between",
        isEven ? "flex-row" : "flex-row-reverse",
      )}
    >
      <div className="hidden w-[calc(50%-3rem)] md:block" />

      <div className="absolute left-6 z-20 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border/50 bg-background shadow-lg transition-colors duration-500 md:left-1/2 md:size-10">
        <div className="size-2.5 rounded-full bg-primary md:size-3" />
      </div>

      <div className="group relative w-full pl-16 md:w-[calc(50%-3rem)] md:pl-0">
        <BlurReveal>
          <div
            className={cn(
              "relative overflow-hidden border border-border/50 bg-secondary/5 p-8 backdrop-blur-md transition-all duration-700 ease-out hover:border-border hover:bg-secondary/20 hover:shadow-2xl md:p-10",
              isEven ? "md:text-right" : "md:text-left",
            )}
          >
            <span
              className={cn(
                "mb-4 hidden text-xs font-mono uppercase tracking-widest text-muted-foreground sm:flex",
                isEven ? "md:justify-end" : "md:justify-start",
              )}
            >
              {item.id}
            </span>

            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="mt-2 font-serif text-4xl font-semibold uppercase italic tracking-tighter text-foreground transition-colors duration-500 group-hover:text-primary md:text-5xl lg:text-6xl">
                {item.year}
              </h3>

              <p
                className="ml-0 mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:max-w-md md:text-base"
                style={{ marginLeft: isEven ? "auto" : "0" }}
              >
                {item.description}
              </p>

              <div
                className={cn(
                  "mt-6 flex flex-wrap gap-2",
                  isEven ? "md:justify-end" : "justify-start",
                )}
              >
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute top-1/2 select-none text-[10rem] font-black italic text-foreground/3 transition-all duration-700",
                isEven
                  ? "-left-12 -translate-y-1/2"
                  : "-right-12 -translate-y-1/2 text-right",
              )}
            >
              {item.year.slice(2)}
            </div>
          </div>
        </BlurReveal>
      </div>
    </div>
  );
}
