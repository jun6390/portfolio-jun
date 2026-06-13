import { ArrowUpRight, Mail, Phone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { useLanguage } from "@/providers/language-provider";

type ContactDictionary = {
  modal_title: string;
  modal_description: string;
};

type ContactContent = {
  email: string;
  phone: string;
};

type SocialItem = {
  label: string;
  href: string;
};

type SocialContent = {
  items: SocialItem[];
};

type ContactModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { dictionary, contents } = useLanguage();

  const contactText = dictionary.contact as ContactDictionary;
  const contact = contents.contact as ContactContent;
  const social = contents.social as SocialContent;

  useLenisModal(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="gap-0 overflow-hidden border-border/50 bg-background/95 p-0 backdrop-blur-xl sm:max-w-[560px]"
      >
        <div className="relative px-8 pt-8 pb-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <DialogHeader className="gap-3">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {contactText.modal_title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {contactText.modal_description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex flex-col flex-wrap gap-4 sm:mt-8 sm:flex-row">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-4 rounded-full border border-border/50 bg-secondary/20 px-5 py-2.5 backdrop-blur-sm transition-all duration-500 ease-out hover:border-foreground/30 hover:bg-foreground"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background transition-transform duration-500 group-hover:scale-110 group-hover:bg-background">
                <Mail className="size-3.5 text-foreground" />
              </div>
              <span className="text-sm font-medium tracking-wide text-foreground transition-colors duration-500 group-hover:text-background">
                {contact.email}
              </span>
            </a>

            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="group flex items-center gap-4 rounded-full border border-border/50 bg-secondary/20 px-5 py-2.5 backdrop-blur-sm transition-all duration-500 ease-out hover:border-foreground/30 hover:bg-foreground"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background transition-transform duration-500 group-hover:scale-110 group-hover:bg-background">
                <Phone className="size-3.5 text-foreground" />
              </div>
              <span className="text-sm font-medium tracking-wide text-foreground transition-colors duration-500 group-hover:text-background">
                {contact.phone}
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            {social.items.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background px-5 text-foreground transition-all duration-500 hover:border-foreground/30 hover:bg-foreground hover:text-background"
              >
                <div className="absolute inset-0 flex h-full w-full -translate-x-full -skew-x-13 justify-center group-hover:translate-x-full group-hover:duration-1000">
                  <div className="relative h-full w-4 bg-background/20 dark:bg-background/20" />
                </div>
                <span className="relative z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest">
                  {link.label}
                  <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      </DialogContent>
    </Dialog>
  );
}
