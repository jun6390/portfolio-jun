import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
