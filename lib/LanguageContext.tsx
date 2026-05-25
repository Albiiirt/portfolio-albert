"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "es" | "ca";

const LANGS: Lang[] = ["en", "es", "ca"];

type LangContextType = {
  lang: Lang;
  toggle: () => void;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () =>
    setLang((l) => LANGS[(LANGS.indexOf(l) + 1) % LANGS.length]);

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
