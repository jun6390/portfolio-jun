"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
] as const;

export default function LanguageSwitcher() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  const getLocalizedPath = (targetLang: string) => {
    return pathname.replace(`/${lang}`, `/${targetLang}`);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="group relative flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/50 text-foreground shadow-sm backdrop-blur-md transition-all duration-500 hover:border-foreground/30 hover:bg-foreground hover:text-background focus:outline-none">
          <div className="absolute inset-0 flex h-full w-full -translate-x-full -skew-x-12 justify-center group-hover:translate-x-full group-hover:duration-1000">
            <div className="relative h-full w-4 bg-background/20 dark:bg-background/20" />
          </div>

          <span className="relative z-10 flex items-center justify-center">
            <Globe className="size-4 transition-transform duration-500 group-hover:rotate-12" />
          </span>

          <span className="sr-only">Switch Language</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-[120] min-w-36 rounded-2xl border-border/50 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            asChild
            className="my-0.5 cursor-pointer rounded-xl focus:bg-secondary"
          >
            <Link href={getLocalizedPath(language.code)}>
              <span
                className={cn("mr-2 flex size-3.5 items-center justify-center")}
              >
                {lang === language.code && <Check className="size-3.5" />}
              </span>
              <span className="text-xs uppercase tracking-widest">
                {language.label}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
