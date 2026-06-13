import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getContents, getDictionary } from "@/lib/loaders";
import { LanguageProvider } from "@/providers/language-provider";

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
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
