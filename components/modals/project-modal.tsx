import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";
import type { ProjectItem } from "@/types/project";
import { ExternalLink, FileText, Github, Youtube } from "lucide-react";
import Image from "next/image";

type ProjectDictionary = {
  project_details?: string;
  about_project?: string;
  technologies?: string;
  live_demo?: string;
  source_code?: string;
};

type ProjectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectItem | null;
};

export function ProjectModal({
  open,
  onOpenChange,
  project,
}: ProjectModalProps) {
  const { dictionary } = useLanguage();
  const projectText = (dictionary.others ?? {}) as ProjectDictionary;

  useLenisModal(open);

  if (!project) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="flex max-h-[90vh] w-[95vw] flex-col gap-0 border-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-200"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            {projectText.project_details ?? "Project details"} {project.title}
          </DialogDescription>
        </DialogHeader>

        <div className="absolute left-0 right-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        <div
          className="h-full flex-1 overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div className="relative h-[40vh] w-full shrink-0 sm:h-[50vh]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="95vw"
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 sm:bottom-10 sm:left-10 sm:right-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mb-2 text-4xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
                  {project.title}
                </h2>

                <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  <span>{project.category}</span>
                  <span className="size-1 rounded-full bg-border" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 p-6 sm:p-10">
            <div>
              <h3 className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                {projectText.about_project ?? "About the Project"}
              </h3>

              <p className="text-lg font-light leading-relaxed text-foreground/80">
                {project.description}
              </p>
            </div>

            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">
                  {projectText.technologies ?? "Technologies"}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.demo || project.repo || project.pdf || project.video) && (
              <div className="flex gap-4 overflow-x-auto border-t border-border/50 pt-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 text-background shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:bg-background hover:text-foreground sm:px-8"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest sm:text-sm">
                      {projectText.live_demo ?? "Live Demo"}
                      <ExternalLink className="size-3.5 sm:size-4" />
                    </span>
                  </a>
                )}

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 px-6 text-foreground shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground hover:text-background sm:px-8"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest sm:text-sm">
                      {projectText.source_code ?? "Source Code"}
                      <Github className="size-3.5 sm:size-4" />
                    </span>
                  </a>
                )}

                {project.pdf && (
                  <a
                    href={project.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 px-6 text-foreground shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground hover:text-background sm:px-8"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest sm:text-sm">
                      PDF
                      <FileText className="size-3.5 sm:size-4" />
                    </span>
                  </a>
                )}

                {project.video && (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-secondary/10 px-6 text-foreground shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-foreground/30 hover:bg-foreground hover:text-background sm:px-8"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest sm:text-sm">
                      Video
                      <Youtube className="size-3.5 sm:size-4" />
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </DialogContent>
    </Dialog>
  );
}
