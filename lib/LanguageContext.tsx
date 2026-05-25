"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "es";

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

  const toggle = () => setLang((l) => (l === "en" ? "es" : "en"));

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
