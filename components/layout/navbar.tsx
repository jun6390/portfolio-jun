"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import LanguageSwitcher from "@/components/widgets/language-switcher";
import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";

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
  const lenis = useLenis();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [screenWidth, setScreenWidth] = useState(1920);
  const [containerWidth, setContainerWidth] = useState(1280);
  const [scrollHeight, setScrollHeight] = useState(800);

  const dummyRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const nav = dictionary.nav as NavDictionary;

  const bgOpacity = useTransform(scrollY, (value) =>
    Math.min(value / scrollHeight, 1),
  );

  const backdropBlur = useTransform(
    scrollY,
    (value) => Math.min(value / scrollHeight, 1) * 16,
  );

  const backdropFilter = useMotionTemplate`blur(${backdropBlur}px)`;

  const paddingY = useTransform(scrollY, (value) => {
    const ratio = Math.min(value / scrollHeight, 1);
    return 24 - ratio * 12;
  });

  const startWidth = Math.max(screenWidth, containerWidth);

  const navMaxWidth = useTransform(scrollY, (value) => {
    const ratio = Math.min(value / scrollHeight, 1);
    return startWidth - ratio * (startWidth - containerWidth);
  });

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

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScrollHeight(window.innerHeight);

      if (dummyRef.current) {
        setContainerWidth(dummyRef.current.getBoundingClientRect().width);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [navLinks]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement && targetId !== "home") {
      return;
    }

    setActiveHref(href);
    setIsMobileMenuOpen(false);

    window.setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(targetId === "home" ? 0 : targetElement!, {
          offset: targetId === "home" ? 0 : -80,
          duration: 1.5,
        });

        return;
      }

      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      targetElement?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.header
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed left-0 right-0 top-0 z-[100] transition-colors duration-300"
    >
      <div
        ref={dummyRef}
        className="pointer-events-none invisible absolute -z-50 mx-auto w-full max-w-7xl px-container"
      />

      <motion.div
        style={{
          opacity: bgOpacity,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className="pointer-events-none absolute inset-0 -z-10 border-b border-border/40 bg-background/75"
      />

      <motion.nav
        style={{
          maxWidth: navMaxWidth,
        }}
        className="mx-auto flex w-full items-center justify-between px-container"
      >
        <Link
          href="#home"
          onClick={(event) => scrollToSection(event, "#home")}
          className="group relative z-[110] flex items-center gap-2"
        >
          <span className="text-xl font-black uppercase tracking-tighter text-foreground transition-all duration-300 group-hover:opacity-70 sm:text-2xl">
            parkhaejun
          </span>
        </Link>

        <div className="hidden items-center gap-8 xl:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.href)}
                  className={cn(
                    "group relative py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                    activeHref === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-foreground transition-all duration-300",
                      activeHref === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="relative z-[110] inline-flex size-10 items-center justify-center text-foreground focus:outline-none xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex h-[100dvh] w-screen flex-col bg-background xl:hidden"
          >
            <div className="relative z-10 flex flex-1 flex-col overflow-y-auto px-container pb-24 pt-24 sm:pb-12 sm:pt-32">
              <ul className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(event) => scrollToSection(event, link.href)}
                      className="group flex items-baseline"
                    >
                      <span
                        className={cn(
                          "text-4xl font-black uppercase tracking-tighter transition-all duration-300 group-hover:pl-4",
                          activeHref === link.href
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary",
                        )}
                      >
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
