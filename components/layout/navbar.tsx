"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/providers/language-provider";

type NavDictionary = {
  home: string;
  about: string;
  stack: string;
  projects: string;
  roadmap: string;
  contact: string;
};

export default function Navbar() {
  const { dictionary } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nav = dictionary.nav as NavDictionary;

  const navLinks = useMemo(
    () => [
      { name: nav.home, href: "#home" },
      { name: nav.about, href: "#about" },
      { name: nav.stack, href: "#stack" },
      { name: nav.projects, href: "#projects" },
      { name: nav.roadmap, href: "#roadmap" },
      { name: nav.contact, href: "#contact" },
    ],
    [nav],
  );

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-container">
        <Link
          href="#home"
          onClick={handleNavClick}
          className="text-xl font-black uppercase tracking-normal text-foreground"
        >
          parkhaejun
        </Link>

        <ul className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex size-10 items-center justify-center text-foreground xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background xl:hidden">
          <ul className="flex flex-col gap-1 px-container py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-4 text-3xl font-black uppercase tracking-normal text-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
