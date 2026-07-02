"use client";

import React from "react";
import { useLang } from "@/components/LangProvider";

export function StructuredData() {
  const { t, locale } = useLang();

  const baseUrl = `https://${process.env.CURRENT_SITE_DOMAIN || "farodelamarina.com"}`;

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": locale === "es" ? "Faro de la Marina" : locale === "zh" ? "海军灯塔" : locale === "qu" ? "Faro de la Marina" : "Navy Lighthouse",
    "description": t.history.intro,
    "url": `${baseUrl}/${locale}`,
    "image": `${baseUrl}/gallery/navy-lighthouse (1).jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "6599"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.126438853306795,
      "longitude": -77.02970492373255
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miraflores",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.items.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
