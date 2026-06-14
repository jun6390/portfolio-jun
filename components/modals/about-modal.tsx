import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";
import type { ReactNode } from "react";

type AboutDictionary = {
  title: string;
};

type AboutContent = {
  full: ReactNode;
};

type AboutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  const { dictionary, contents } = useLanguage();

  const aboutText = dictionary.about as AboutDictionary;
  const about = contents.about as AboutContent;

  useLenisModal(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="flex max-h-[85vh] flex-col gap-0 border-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-160"
      >
        <div className="absolute left-0 right-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

        <div className="relative shrink-0 px-8 pb-4 pt-8">
          <DialogHeader className="gap-3">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {aboutText.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div
          className="flex-1 overflow-y-auto px-8 pb-8 pt-2"
          data-lenis-prevent="true"
        >
          <div className="flex flex-col gap-6">
            <div className="text-sm font-light leading-relaxed text-foreground/80">
              {about.full}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </DialogContent>
    </Dialog>
  );
}
