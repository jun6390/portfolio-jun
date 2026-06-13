"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, Mouse } from "lucide-react";
import {
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { InteractiveParticles } from "@/components/effects/interactive-particles";
import { ContactModal } from "@/components/modals/contact-modal";
import { useLanguage } from "@/providers/language-provider";

type HeroContent = {
  title: ReactNode;
  stats: ReactNode;
};

type AboutContent = {
  description: ReactNode;
};

type HeroDictionary = {
  cta_primary: string;
  cta_secondary: string;
  scroll: string;
};

type TechName =
  | "HTML5"
  | "CSS3"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next.js";

type TechSlide = {
  name: TechName;
  color: string;
  glow: string;
};

function TechLogo({ name, className }: { name: TechName; className?: string }) {
  if (name === "HTML5") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <path
          d="M12 5h40l-3.6 45.5L32 59l-16.4-8.5L12 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M23 19h19l-.5 6H29l.3 5.5h11.8l-1 13L32 46l-8.1-2.5-.5-6h5.8l.2 2.3 2.6.8 2.7-.8.3-3.7H23l-1-17.1z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "CSS3") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <path
          d="M12 5h40l-3.6 45.5L32 59l-16.4-8.5L12 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        <g fill="currentColor">
          <rect x="21" y="18" width="23" height="5.5" rx="2.75" />
          <rect x="28" y="29" width="15" height="5.5" rx="2.75" />
          <rect x="21" y="40" width="23" height="5.5" rx="2.75" />
          <rect x="38.5" y="22" width="5.5" height="11" rx="2.75" />
          <rect x="38.5" y="33" width="5.5" height="11" rx="2.75" />
        </g>
      </svg>
    );
  }

  if (name === "JavaScript") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <path
          d="M12 5h40l-3.6 45.5L32 59l-16.4-8.5L12 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M24 19h8v20.5c0 5-3.2 8-8.2 8-3.2 0-5.7-1.2-7.5-3.2l3.5-4.2c1.1 1.2 2.1 1.9 3.6 1.9 1.8 0 2.8-1 2.8-3.3V25H24v-6z"
          fill="currentColor"
        />
        <path
          d="M39.8 47.5c-4 0-7.1-1.4-9.4-3.7l3.4-4.1c1.7 1.5 3.7 2.5 6.1 2.5 1.9 0 3-.7 3-1.9 0-1.1-.8-1.7-4.1-2.5-4.4-1.1-7.5-2.6-7.5-7.2 0-4.3 3.4-7.4 8.4-7.4 3.3 0 5.9 1 8 2.8l-3.1 4.3c-1.6-1.2-3.4-1.9-5.1-1.9-1.6 0-2.4.7-2.4 1.7 0 1.2.9 1.7 4.3 2.6 4.7 1.2 7.3 3 7.3 7.1 0 4.7-3.6 7.7-8.9 7.7z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "TypeScript") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path d="M18 24h22v5.5h-8v20h-6v-20h-8V24z" fill="currentColor" />
        <path
          d="M44.4 50c-3.8 0-6.6-1.2-8.8-3.2l3.1-3.9c1.7 1.3 3.5 2 5.8 2 1.6 0 2.5-.5 2.5-1.5 0-.9-.7-1.4-3.6-2.1-4-.9-6.9-2.2-6.9-6.4 0-3.8 3-6.5 7.5-6.5 3.1 0 5.5.9 7.4 2.4l-2.8 4.1c-1.5-1-3.1-1.6-4.8-1.6-1.4 0-2.1.6-2.1 1.4 0 1 .7 1.4 3.8 2.1 4.2 1 6.6 2.5 6.6 6.3 0 4.3-3.3 6.9-7.7 6.9z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "React") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          transform="rotate(60 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          transform="rotate(120 32 32)"
        />
        <circle cx="32" cy="32" r="5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M21 43V21h5.2l17 22V21H48v22h-5.2l-17-22v22H21z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Hero() {
  const { dictionary, contents } = useLanguage();

  const hero = contents.hero as HeroContent;
  const about = contents.about as AboutContent;
  const heroText = dictionary.hero as HeroDictionary;

  const [contactOpen, setContactOpen] = useState(false);

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
  const y = useTransform(scrollY, [0, 800], [0, -150]);
  const blurValue = useTransform(scrollY, [0, 800], [0, 10]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const techSlides: TechSlide[] = [
    {
      name: "HTML5",
      color: "#f97316",
      glow: "rgba(249, 115, 22, 0.24)",
    },
    {
      name: "CSS3",
      color: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.24)",
    },
    {
      name: "JavaScript",
      color: "#facc15",
      glow: "rgba(250, 204, 21, 0.24)",
    },
    {
      name: "TypeScript",
      color: "#2563eb",
      glow: "rgba(37, 99, 235, 0.24)",
    },
    {
      name: "React",
      color: "#22d3ee",
      glow: "rgba(34, 211, 238, 0.24)",
    },
    {
      name: "Next.js",
      color: "var(--foreground)",
      glow: "color-mix(in oklch, var(--foreground) 20%, transparent)",
    },
  ];

  const firstColumnSlides = [...techSlides, ...techSlides];
  const reversedTechSlides = [...techSlides].reverse();
  const secondColumnSlides = [...reversedTechSlides, ...reversedTechSlides];

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const renderTechCard = (slide: TechSlide, index: number) => (
    <div
      key={`${slide.name}-${index}`}
      className="group/card relative z-10 flex aspect-3/4 w-full flex-col items-center justify-center overflow-hidden rounded-4xl border border-border/10 bg-foreground/[0.03] px-4 py-6 text-[var(--tech-color)] backdrop-blur-sm transition-all duration-700 ease-out hover:z-20 hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground/[0.08] hover:shadow-[0_0_45px_rgba(255,255,255,0.08)]"
      style={
        {
          "--tech-color": slide.color,
          "--tech-glow": slide.glow,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, var(--tech-glow), transparent 62%)",
        }}
      />

      <div className="relative flex size-20 items-center justify-center sm:size-24 xl:size-28">
        <TechLogo
          name={slide.name}
          className="size-16 opacity-80 contrast-[1.08] brightness-95 transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:opacity-100 group-hover/card:brightness-110 group-hover/card:drop-shadow-[0_0_18px_rgba(255,255,255,0.24)] sm:size-20 xl:size-24"
        />
      </div>

      <span className="relative mt-5 translate-y-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        {slide.name}
      </span>
    </div>
  );

  return (
    <section
      id="home"
      className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background px-container pt-28 pb-12 text-foreground sm:pt-32 sm:pb-16 md:px-16 2xl:pb-24"
    >
      <InteractiveParticles />

      <motion.div
        style={{ opacity }}
        className="group/slider absolute bottom-0 right-6 top-0 z-[5] flex h-full w-55 select-none gap-3 overflow-hidden px-2 opacity-60 mix-blend-normal transition-all duration-700 hover:opacity-90 sm:right-12 sm:w-65 sm:gap-4 md:right-16 md:w-85 dark:opacity-70 dark:hover:opacity-90 lg:right-24 lg:w-100 xl:right-36 xl:w-110 2xl:right-48 2xl:w-120"
      >
        <div className="relative hidden h-full flex-1 overflow-hidden md:block">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3 pt-4 sm:gap-4"
          >
            {firstColumnSlides.map(renderTechCard)}
          </motion.div>
        </div>

        <div className="relative h-full flex-1 overflow-hidden max-md:opacity-50">
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
            className="flex flex-col gap-3 pt-4 sm:gap-4"
          >
            {secondColumnSlides.map(renderTechCard)}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-background via-transparent to-background" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-background via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y, filter }}
        className="pointer-events-none relative z-20 flex h-full w-full flex-1 flex-col justify-end gap-6 will-change-[opacity,transform,filter] sm:gap-12 xl:gap-16"
      >
        <div className="flex w-full items-start justify-between">
          <div className="absolute right-0 top-32 flex flex-col items-center gap-3 sm:top-36 lg:top-40">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-muted-foreground"
              aria-hidden="true"
            >
              <ArrowDown className="h-8 w-4 stroke-[1.5]" />
            </motion.div>

            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-lr]">
              {heroText.scroll}
            </span>
          </div>
        </div>

        <div className="relative z-20 mt-auto flex w-full flex-col justify-center mix-blend-difference">
          <div className="overflow-hidden">
            <h1 className="whitespace-nowrap text-5xl font-black uppercase leading-[0.85] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[140px]">
              {hero.title}
              <br />
              <span className="text-foreground/80">{hero.stats}</span>
            </h1>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-10">
          <p className="max-w-xl font-light leading-relaxed text-muted-foreground mix-blend-difference sm:text-lg 2xl:text-xl">
            {about.description}
          </p>

          <div className="pointer-events-auto flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group relative flex h-12 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 text-background shadow-2xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-background hover:text-foreground xl:h-16 xl:px-10"
            >
              <div className="absolute inset-0 flex h-full w-full -translate-x-full -skew-x-12 justify-center group-hover:translate-x-full group-hover:duration-1000">
                <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
              </div>
              <span className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] xl:gap-3 xl:text-base">
                {heroText.cta_primary}
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1 xl:size-5" />
              </span>
            </button>

            <button
              type="button"
              onClick={scrollToProjects}
              className="group relative flex h-12 w-fit cursor-pointer items-center justify-center rounded-full border border-border px-6 text-muted-foreground backdrop-blur-sm transition-all duration-500 hover:border-border/30 hover:bg-secondary/15 hover:text-foreground sm:border-transparent xl:h-16 xl:px-10"
            >
              <span className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] xl:gap-3 xl:text-base">
                <Mouse className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100 xl:size-5" />
                {heroText.cta_secondary}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}
