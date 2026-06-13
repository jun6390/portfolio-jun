"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Locale;
  dictionary: Record<string, unknown>;
  contents: Record<string, unknown>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  lang,
  dictionary,
  contents,
}: {
  children: ReactNode;
  lang: Locale;
  dictionary: Record<string, unknown>;
  contents: Record<string, unknown>;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dictionary, contents }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
