"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="group relative flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/50 text-foreground shadow-sm backdrop-blur-md transition-all duration-500 hover:border-foreground/30 hover:bg-foreground hover:text-background focus:outline-none">
          <div className="absolute inset-0 flex h-full w-full -translate-x-full -skew-x-12 justify-center group-hover:translate-x-full group-hover:duration-1000">
            <div className="relative h-full w-4 bg-background/20 dark:bg-background/20" />
          </div>

          <span className="relative z-10 flex items-center justify-center">
            <Sun className="size-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          </span>

          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-[120] min-w-36 rounded-2xl border-border/50 bg-background/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="my-0.5 cursor-pointer rounded-xl focus:bg-secondary"
        >
          <Sun className="mr-2 size-3.5" />
          <span className="text-xs uppercase tracking-widest">Light</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="my-0.5 cursor-pointer rounded-xl focus:bg-secondary"
        >
          <Moon className="mr-2 size-3.5" />
          <span className="text-xs uppercase tracking-widest">Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
