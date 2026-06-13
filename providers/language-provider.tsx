"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { parseMarkdown } from "@/lib/markdown";

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
  const processedDictionary = useMemo(
    () => parseMarkdown(dictionary) as Record<string, unknown>,
    [dictionary],
  );
  const processedContents = useMemo(
    () => parseMarkdown(contents) as Record<string, unknown>,
    [contents],
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dictionary: processedDictionary,
        contents: processedContents,
      }}
    >
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
