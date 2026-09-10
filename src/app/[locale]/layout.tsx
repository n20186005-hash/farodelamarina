import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";
import { siteConfig, siteUrl } from "@/site.config";
import { entityContent } from "@/i18n/entity";
import type { Locale } from "@/i18n/translations";
import { generateSchema } from "../schema";
import HtmlLangSetter from "@/components/HtmlLangSetter";

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

const baseUrl = siteUrl;

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

/**
 * 搜索展现用 TDK
 * ------------------------------------------------------------------
 * 针对 GSC 中「history / height / location / official」四类长尾意图重写：
 * 标题把西班牙语真实搜索词（Faro de la Marina）前置，并带上 Historia / Altura 等修饰词；
 * 描述则把「1900 年历史 + 22 m 高度 + 位置 + 免费 + 日落」等高点击诱因写进前 155 字符，
 * 避免被 SERP 截断而丢失卖点。
 */
const TITLE: Record<string, string> = {
  es: "Faro de la Marina Miraflores: Historia, Altura y Guía de Visita",
  en: "Faro de la Marina (Navy Lighthouse Lima): History, Height & Map",
  zh: "海军灯塔 Faro de la Marina（米拉弗洛雷斯）：高度、历史与游览指南",
  qu: "Faro de la Marina (Navy Lighthouse) — Miraflores, Lima, Piruw",
};

const OG_TITLE: Record<string, string> = {
  es: "Faro de la Marina Miraflores: historia, altura y guía de visita",
  en: `Navy Lighthouse (Faro de la Marina) — ${siteConfig.city} history, height & map`,
  zh: "海军灯塔（Faro de la Marina）— 米拉弗洛雷斯：高度、历史与游览指南",
  qu: `Navy Lighthouse (Faro de la Marina) — ${siteConfig.city} Travel Guide`,
};

const DESCRIPTION: Record<string, string> = {
  es: `Faro de la Marina en Miraflores, Lima: historia desde 1900, ${siteConfig.heightMeters} m (${siteConfig.heightFeet} ft) de altura, ubicación exacta, entrada gratis y el mejor mirador para el atardecer.`,
  en: `Navy Lighthouse (Faro de la Marina), Miraflores, Lima: ${siteConfig.heightFeet} ft (${siteConfig.heightMeters} m) tall, ${siteConfig.rangeNauticalMiles}-nautical-mile range, history from 1900, free entry, map & sunset tips.`,
  zh: `海军灯塔（Faro de la Marina）位于秘鲁利马米拉弗洛雷斯：塔高 ${siteConfig.heightMeters} 米，1900 年建成、1973 年迁建，灯光射程 ${siteConfig.rangeNauticalMiles} 海里，免费开放。`,
  qu: `Navy Lighthouse (Faro de la Marina), Miraflores, Lima. ${siteConfig.heightMeters} m sayaynin, 1900 watapi ruwasqa, ${siteConfig.installationYear} watapi Miraflores-man apasqa. Mana qullqiyuq.`,
};

const OG_DESCRIPTION: Record<string, string> = {
  es: `Guía independiente del Faro de la Marina (Navy Lighthouse) en Miraflores, Lima: historia, altura, ubicación, mapa y consejos de visita.`,
  en: `Independent visitor guide to Navy Lighthouse (Faro de la Marina), Miraflores, Lima: history, height, location, map and visiting tips.`,
  zh: `海军灯塔（Faro de la Marina）位于秘鲁利马米拉弗洛雷斯：塔高 ${siteConfig.heightMeters} 米，1900 年建成、1973 年迁建，免费开放。`,
  qu: `Navy Lighthouse (Faro de la Marina) puriy yachay: Miraflores, Lima, Piruw.`,
};

const SITE_NAME: Record<string, string> = {
  es: "Guía del Faro de la Marina",
  en: "Navy Lighthouse Travel Guide",
  zh: "海军灯塔旅行指南",
  qu: "Faro de la Marina rikuy",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = (["zh", "en", "es", "qu"].includes(locale) ? locale : "es") as Locale;
  const entity = entityContent[l] || entityContent.es;
  const hreflangs = getHreflangAlternates(baseUrl);
  const ogImage = siteConfig.heroImage;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: TITLE[l] || TITLE.en,
      template: `%s | ${siteConfig.attractionShortName}`,
    },
    description: DESCRIPTION[l] || DESCRIPTION.en,
    applicationName: SITE_NAME[l] || SITE_NAME.en,
    keywords: [
      siteConfig.attractionFullName,
      siteConfig.attractionShortName,
      "Navy Lighthouse Miraflores",
      "Faro de la Marina",
      "Miraflores",
      "Lima tourism",
      "Peru tourism",
      "lighthouse Lima",
      "Pacific Ocean viewpoint",
      "Malecón Cisneros",
      "Parque del Amor",
      "Larcomar",
    ],
    authors: [{ name: SITE_NAME[l] || SITE_NAME.en }],
    creator: SITE_NAME[l] || SITE_NAME.en,
    publisher: SITE_NAME[l] || SITE_NAME.en,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: localeConfig[l]?.ogLocale || "es_PE",
      alternateLocale: Object.values(localeConfig)
        .map((c) => c.ogLocale)
        .filter((ol) => ol !== (localeConfig[l]?.ogLocale || "es_PE")),
      url: `${baseUrl}/${l}`,
      title: OG_TITLE[l] || OG_TITLE.en,
      description: OG_DESCRIPTION[l] || OG_DESCRIPTION.en,
      siteName: SITE_NAME[l] || SITE_NAME.en,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.attractionFullName} in ${siteConfig.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE[l] || TITLE.en,
      description: OG_DESCRIPTION[l] || OG_DESCRIPTION.en,
      images: [ogImage],
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
      canonical: `/${l}`,
      languages: hreflangs,
    },
    other: {
      "geo.region": "PE-LIM",
      "geo.placename": `${siteConfig.city}, ${siteConfig.state}, ${siteConfig.country}`,
      "geo.position": `${siteConfig.latitude};${siteConfig.longitude}`,
      ICBM: `${siteConfig.latitude}, ${siteConfig.longitude}`,
      ...(entity.plusCode ? { "attraction.pluscode": entity.plusCode } : {}),
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
