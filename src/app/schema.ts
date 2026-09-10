import { siteConfig, siteUrl } from "@/site.config";
import { translations, type Locale } from "@/i18n/translations";
import { entityContent } from "@/i18n/entity";
import galleryImagesData from "@/gallery-data.json";

/** 去除正文中的 ** 强调标记，用于纯文本字段（description） */
function stripMarkdown(text: string) {
  return text.replace(/\*\*/g, "");
}

/**
 * 生成单景点（TouristAttraction）实体绑定的 JSON-LD 结构化数据。
 * 一个 @graph 内包含：景点、网站、面包屑、FAQ，避免实体冲突。
 */
export function generateSchema(locale: string) {
  const l = (["zh", "en", "es", "qu"].includes(locale) ? locale : "es") as Locale;
  const t = translations[l] || translations.es;
  const entity = entityContent[l] || entityContent.es;

  const localUrl = `${siteUrl}/${l}`;
  const attractionId = `${siteUrl}/#attraction`;
  const websiteId = `${siteUrl}/#website`;

  const description = stripMarkdown(entity.about.content);

  const inLanguage =
    l === "es" ? "es-PE" : l === "zh" ? "zh-CN" : l === "qu" ? "qu-PE" : "en-US";

  // 主图 + 周边图片
  // 图片文件名已按 <前缀>-<序号>.<扩展名> 规范收敛（不含空格与括号），路径本身即可安全解析，
  // 故不再需要 encodeURIComponent 转义；清单与页面画廊同源，避免文件名在两处硬编码后漂移。
  const images = [
    `${siteUrl}${siteConfig.heroImage}`,
    ...galleryImagesData
      .filter((img) => img.src !== siteConfig.heroImage)
      .slice(0, 2)
      .map((img) => `${siteUrl}${img.src}`),
  ];

  const faqItems = [...t.faq.items, ...entity.faqExtra];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TouristAttraction", "Lighthouse", "Place"],
        "@id": attractionId,
        name: siteConfig.attractionFullName,
        alternateName: [
          siteConfig.attractionShortName,
          "Navy Lighthouse",
          "海军灯塔",
          "Parque El Faro de la Marina",
          `${siteConfig.city} ${siteConfig.attractionFullName}`,
        ],
        description,
        url: localUrl,
        image: images,
        isAccessibleForFree: true,
        publicAccess: true,
        priceRange: "Free",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.streetAddress,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.state,
          postalCode: siteConfig.postalCode,
          addressCountry: siteConfig.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.latitude,
          longitude: siteConfig.longitude,
        },
        hasMap: siteConfig.mapsShareUrl,
        containedInPlace: {
          "@type": "City",
          name: siteConfig.city,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: siteConfig.state,
            containedInPlace: {
              "@type": "Country",
              name: siteConfig.country,
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: siteConfig.ratingValue,
          reviewCount: siteConfig.reviewCount,
          bestRating: "5",
          worstRating: "1",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "constructionYear", value: siteConfig.constructionYear },
          { "@type": "PropertyValue", name: "installationYear", value: siteConfig.installationYear },
          { "@type": "PropertyValue", name: "originalLocation", value: siteConfig.originalLocation },
          { "@type": "PropertyValue", name: "height", value: `${siteConfig.heightMeters} meters (${siteConfig.heightFeet} ft)` },
          { "@type": "PropertyValue", name: "altitude", value: `${siteConfig.altitudeMeters} meters` },
          { "@type": "PropertyValue", name: "focalHeight", value: `${siteConfig.focalHeightMeters} meters` },
          { "@type": "PropertyValue", name: "range", value: `${siteConfig.rangeNauticalMiles} nautical miles (${siteConfig.rangeKm} km)` },
          { "@type": "PropertyValue", name: "luminosity", value: `${siteConfig.luminosityCandelas} cd` },
          { "@type": "PropertyValue", name: "material", value: siteConfig.material },
          { "@type": "PropertyValue", name: "weight", value: `${siteConfig.weightKg} kg` },
          { "@type": "PropertyValue", name: "plusCode", value: siteConfig.plusCode },
          { "@type": "PropertyValue", name: "nonprofit", value: "true" },
        ],
        telephone: "+51 1 617-7000",
        sameAs: [
          siteConfig.mapsShareUrl,
          siteConfig.govtTourismUrl,
          "https://www.miraflores.gob.pe/",
          "https://www.dhn.mil.pe/",
          "https://en.wikipedia.org/wiki/La_Marina_Lighthouse",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: localUrl,
        name: `${siteConfig.attractionFullName} — ${siteConfig.attractionShortName} Guide`,
        inLanguage,
        isAccessibleForFree: true,
        about: { "@id": attractionId },
        publisher: {
          "@type": "Organization",
          name: "Faro de la Marina Travel Guide",
          nonprofit: true,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.city,
            item: `${localUrl}#location`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: siteConfig.state,
            item: `${localUrl}#location`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: siteConfig.country,
            item: `${localUrl}#location`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${siteConfig.attractionFullName} (${siteConfig.attractionShortName})`,
            item: `${localUrl}#overview`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripMarkdown(item.answer),
          },
        })),
      },
    ],
  };
}
