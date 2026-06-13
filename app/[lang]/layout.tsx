import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { isValidLocale } from "@/lib/i18n";
import { getContents, getDictionary } from "@/lib/loaders";

import { LanguageProvider } from "@/providers/language-provider";
import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { Preloader } from "@/components/layout/preloader";
import Navbar from "@/components/layout/navbar";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Joon Portfolio",
  description: "Personal portfolio website",
};

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const [dictionary, contents] = await Promise.all([
    getDictionary(lang),
    getContents(lang),
  ]);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}
      >
        <LanguageProvider
          lang={lang}
          dictionary={dictionary}
          contents={contents}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
            <Preloader />
            <SmoothScroll>
              <Navbar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
