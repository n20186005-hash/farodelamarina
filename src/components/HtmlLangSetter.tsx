"use client";

import { useEffect } from "react";

export default function HtmlLangSetter({ htmlLang }: { htmlLang: string }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);

  return null;
}
