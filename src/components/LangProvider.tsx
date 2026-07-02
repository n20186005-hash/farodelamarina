"use client";

import React, { createContext, useContext, useState } from "react";
import { translations, type Locale, type Translations } from "@/i18n/translations";

interface LangContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const defaultT: Translations = translations.es;

const LangContext = createContext<LangContextValue>({
  locale: "es",
  setLocale: () => {},
  t: defaultT,
});

export function LangProvider({ children, initialLocale = "es" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = translations[locale] || translations.es;
  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
