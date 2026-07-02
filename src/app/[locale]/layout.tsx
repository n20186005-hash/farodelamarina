import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const baseUrl = `https://${process.env.CURRENT_SITE_DOMAIN || "lovepark.com"}`;

// 语言配置：HTML lang 属性 + OG locale 映射
const localeConfig: Record<string, { htmlLang: string; ogLocale: string }> = {
  es: { htmlLang: "es", ogLocale: "es_PE" },
  en: { htmlLang: "en", ogLocale: "en_US" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN" },
  qu: { htmlLang: "qu", ogLocale: "qu_PE" },
};

// 生成绝对 URL 的 hreflang 映射
function getHreflangAlternates(baseUrl: string) {
  return {
    es: `${baseUrl}/es`,
    en: `${baseUrl}/en`,
    zh: `${baseUrl}/zh`,
    qu: `${baseUrl}/qu`,
    "x-default": `${baseUrl}/es`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hreflangs = getHreflangAlternates(baseUrl);
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default:
        locale === "es"
          ? "Parque del Amor — Miraflores, Lima"
          : locale === "zh"
          ? "爱情公园 — 利马米拉弗洛雷斯"
          : locale === "qu"
          ? "Love Park — Lima, Piruw"
          : "Love Park — Miraflores, Lima, Peru",
      template:
        locale === "es"
          ? "%s | Parque del Amor"
          : locale === "zh"
          ? "%s | 爱情公园"
          : locale === "qu"
          ? "%s | Love Park"
          : "%s | Love Park",
    },
    description:
      locale === "es"
        ? "Guía de viaje al Parque del Amor en Miraflores, Lima. Parque romántico con vista al Pacífico."
        : locale === "zh"
        ? "爱情公园旅行指南——探索利马米拉弗洛雷斯的浪漫地标，欣赏太平洋美景。"
        : locale === "qu"
        ? "Love Park rikuy, Lima, Piruw. Romantic park."
        : "A travel guide to Love Park in Miraflores, Lima, Peru. The romantic park with Pacific Ocean view.",
    keywords: [
      "Love Park",
      "Parque del Amor",
      "Miraflores",
      "Lima tourism",
      "Peru tourism",
      "Romantic park",
      "Pacific Ocean view",
      "Kiss Sculpture",
    ],
    authors: [{ name: "Love Park Travel Guide" }],
    creator: "Love Park Travel Guide",
    publisher: "Love Park Travel Guide",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: localeConfig[locale]?.ogLocale || "es_PE",
      alternateLocale: Object.values(localeConfig)
        .map((c) => c.ogLocale)
        .filter(
          (l) => l !== (localeConfig[locale]?.ogLocale || "es_PE")
        ),
      url: `${baseUrl}/${locale}`,
      title:
        locale === "es"
          ? "Parque del Amor — Miraflores, Lima"
          : locale === "zh"
          ? "爱情公园 — 利马米拉弗洛雷斯"
          : locale === "qu"
          ? "Love Park — Lima, Piruw"
          : "Love Park — Miraflores, Lima, Peru",
      description:
        locale === "es"
          ? "Guía de viaje al Parque del Amor en Miraflores, Lima."
          : locale === "zh"
          ? "爱情公园旅行指南——探索利马的浪漫地标。"
          : locale === "qu"
          ? "Love Park rikuy, Lima."
          : "A travel guide to Love Park in Miraflores, Lima, Peru.",
      siteName:
        locale === "es"
          ? "Parque del Amor Guía de Viaje"
          : locale === "zh"
          ? "爱情公园旅行指南"
          : locale === "qu"
          ? "Love Park rikuy"
          : "Love Park Travel Guide",
      images: [
        {
          url: "/gallery/love-park (1).jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Parque del Amor - Miraflores, Lima"
              : locale === "zh"
              ? "爱情公园 - 利马米拉弗洛雷斯"
              : locale === "qu"
              ? "Love Park - Lima, Piruw"
              : "Love Park - Miraflores, Lima, Peru",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "es"
          ? "Parque del Amor — Miraflores, Lima"
          : locale === "zh"
          ? "爱情公园 — 利马米拉弗洛雷斯"
          : locale === "qu"
          ? "Love Park — Lima, Piruw"
          : "Love Park — Miraflores, Lima, Peru",
      description:
        locale === "es"
          ? "Guía de viaje al Parque del Amor en Miraflores, Lima."
          : locale === "zh"
          ? "爱情公园旅行指南——探索利马的浪漫地标。"
          : locale === "qu"
          ? "Love Park rikuy, Lima."
          : "A travel guide to Love Park in Miraflores, Lima, Peru.",
      images: ["/gallery/love-park (1).jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: hreflangs,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" },
    { locale: "zh" },
    { locale: "qu" },
  ];
}

import { generateSchema } from "../schema";
import HtmlLangSetter from "@/components/HtmlLangSetter";

function SchemaScript({ locale }: { locale: string }) {
  const schema = generateSchema(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const htmlLang = localeConfig[locale]?.htmlLang || "es";

  return (
    <>
      {/* 动态设置 <html lang> 属性（客户端组件） */}
      <HtmlLangSetter htmlLang={htmlLang} />
      <SchemaScript locale={locale} />
      {children}
    </>
  );
}
