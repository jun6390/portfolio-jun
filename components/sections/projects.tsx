"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import { BREAKPOINTS, useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/providers/language-provider";
import type { ProjectItem } from "@/types/project";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type ProjectsDictionary = {
  title: string;
  scroll_text: string;
  end_text: string;
};

type ProjectsContent = {
  intro: React.ReactNode;
  items: ProjectItem[];
};

export default function Projects() {
  const { dictionary, contents } = useLanguage();

  const projectText = dictionary.projects as ProjectsDictionary;
  const projects = contents.projects as ProjectsContent;

  const isDesktop = useMediaQuery(BREAKPOINTS.xl);

  const targetRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  const [measurements, setMeasurements] = useState({
    scrollRange: 0,
    dynamicHeight: "auto",
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateMeasurements = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        if (!isDesktop || !horizontalContainerRef.current) {
          setMeasurements((current) => {
            if (current.scrollRange === 0 && current.dynamicHeight === "auto") {
              return current;
            }

            return { scrollRange: 0, dynamicHeight: "auto" };
          });

          return;
        }

        const totalWidth = horizontalContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const range = Math.max(totalWidth - viewportWidth, 0);

        setMeasurements((current) => {
          const nextHeight = `${range + window.innerHeight}px`;

          if (
            current.scrollRange === range &&
            current.dynamicHeight === nextHeight
          ) {
            return current;
          }

          return {
            scrollRange: range,
            dynamicHeight: nextHeight,
          };
        });
      });
    };

    updateMeasurements();

    const timeout = window.setTimeout(updateMeasurements, 100);
    const resizeObserver = new ResizeObserver(updateMeasurements);

    if (horizontalContainerRef.current) {
      resizeObserver.observe(horizontalContainerRef.current);
    }

    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateMeasurements);
      resizeObserver.disconnect();
    };
  }, [isDesktop, projects.items]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -measurements.scrollRange],
  );

  const smoothX = useSpring(x, {
    stiffness: 400,
    damping: 60,
    restDelta: 0.5,
  });

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      ref={targetRef}
      id="projects"
      data-slot="projects"
      className="relative py-16 md:py-24 lg:py-32 xl:py-0"
      style={{ height: measurements.dynamicHeight }}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 flex h-screen items-center overflow-hidden"
            : "relative flex w-full flex-col"
        }
      >
        {!isDesktop ? (
          <>
            <div className="mb-10 flex flex-col gap-4 px-container">
              <BlurReveal>
                <span className="title-counter">[03]</span>
              </BlurReveal>

              <BlurReveal>
                <h2 className="title">{projectText.title}</h2>
              </BlurReveal>

              <BlurReveal>
                <p className="mt-4 text-lg text-muted-foreground">
                  {projects.intro}
                </p>
              </BlurReveal>
            </div>

            <div className="flex w-full max-w-full flex-col gap-container px-container">
              {projects.items.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleOpenProject(project)}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            ref={horizontalContainerRef}
            style={{ x: smoothX }}
            className="flex w-max items-center px-container"
          >
            <div className="flex w-[40vw] shrink-0 flex-col justify-center">
              <div className="flex flex-col gap-4">
                <BlurReveal>
                  <span className="title-counter">[03]</span>
                </BlurReveal>

                <BlurReveal>
                  <h2 className="title">{projectText.title}</h2>
                </BlurReveal>

                <BlurReveal>
                  <p className="mt-4 text-5xl font-light leading-tight">
                    {projects.intro}
                  </p>
                </BlurReveal>

                <BlurReveal>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-px w-24 bg-border" />
                    <span className="font-mono text-sm text-foreground/40">
                      {projectText.scroll_text}
                    </span>
                  </div>
                </BlurReveal>
              </div>
            </div>

            {projects.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleOpenProject(project)}
              />
            ))}

            <div className="flex h-[70vh] w-[40vw] shrink-0 flex-col items-center justify-center">
              <h3 className="text-[10vw] font-black tracking-tighter text-border">
                {projectText.end_text}
              </h3>
            </div>
          </motion.div>
        )}
      </div>

      <ProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        project={selectedProject}
      />
    </section>
  );
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectItem;
  onClick?: () => void;
}) {
  return (
    <BlurReveal>
      <button
        type="button"
        onClick={onClick}
        className="group relative aspect-4/3 w-full shrink-0 cursor-pointer text-left perspective-1000 xl:mx-6 xl:w-[45vw]"
      >
        <div className="relative size-full overflow-hidden border border-border/50 bg-muted transition-all duration-700 ease-out group-hover:border-foreground/20">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 45vw"
              loading="lazy"
              className="object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-12">
            <div className="flex items-start justify-between">
              <div className="overflow-hidden">
                <span className="block translate-y-full text-xs font-mono uppercase tracking-widest text-muted-foreground transition-transform delay-100 duration-500 group-hover:translate-y-0 xl:text-sm">
                  {project.category}
                </span>
              </div>

              <div className="overflow-hidden">
                <span className="block translate-y-full text-xs font-mono text-muted-foreground transition-transform delay-200 duration-500 group-hover:translate-y-0 xl:text-sm">
                  {project.year}
                </span>
              </div>
            </div>

            <h3 className="pointer-events-none absolute bottom-6 left-6 text-4xl font-black uppercase tracking-tighter text-foreground opacity-10 transition-opacity delay-100 duration-500 group-hover:opacity-100 sm:text-5xl md:text-6xl lg:text-7xl xl:bottom-12 xl:left-12 xl:text-8xl">
              {project.title}
            </h3>
          </div>
        </div>
      </button>
    </BlurReveal>
  );
});
