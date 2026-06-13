import "server-only";
import type { Locale } from "./i18n";

type JsonObject = Record<string, unknown>;
type Loader = () => Promise<JsonObject>;

const dictionaries: Record<Locale, Loader> = {
  ko: () =>
    import("@/dictionaries/ko.json").then(
      (module) => module.default as JsonObject,
    ),
  en: () =>
    import("@/dictionaries/en.json").then(
      (module) => module.default as JsonObject,
    ),
};

const contents: Record<Locale, Loader> = {
  ko: () =>
    import("@/contents/ko.json").then((module) => module.default as JsonObject),
  en: () =>
    import("@/contents/en.json").then((module) => module.default as JsonObject),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export const getContents = (locale: Locale) => contents[locale]();
