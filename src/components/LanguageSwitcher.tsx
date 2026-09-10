"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import type { Locale } from "@/i18n/translations";

const LANG_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  es: "ES",
  qu: "QU",
};

/** 可访问性与 hreflang 语义使用的完整语言名 */
const LANG_NAMES: Record<Locale, string> = {
  zh: "中文",
  en: "English",
  es: "Español",
  qu: "Runasimi (Quechua)",
};

const LOCALES: Locale[] = ["zh", "en", "es", "qu"];

/**
 * 语言切换器
 * ------------------------------------------------------------------
 * 输出真实 <a href hreflang> 链接而不是按钮：<button> 无法被爬虫跟随，
 * 只有可抓取的链接才是 Google 认可的语言互指信号（配合 <head> 中的 hreflang）。
 * 同时保留当前锚点，切换语言后仍停留在同一区块。
 */
export function LanguageSwitcher() {
  const { locale } = useLang();
  const [hash, setHash] = useState("");

  // 首屏保持与 SSR 输出一致（空 hash），挂载后再补上锚点，避免 hydration 不一致
  useEffect(() => {
    setHash(window.location.hash);
  }, [locale]);

  return (
    <div className="lang-switcher">
      {LOCALES.map((l) => (
        <a
          key={l}
          href={`/${l}${hash}`}
          hrefLang={l}
          rel="alternate"
          aria-label={LANG_NAMES[l]}
          aria-current={locale === l ? "true" : undefined}
          className={`lang-btn ${locale === l ? "active" : ""}`}
        >
          {LANG_LABELS[l]}
        </a>
      ))}
    </div>
  );
}
