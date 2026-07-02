"use client";

import React from "react";
import { useLang } from "@/components/LangProvider";

export function StructuredData() {
  const { t, locale } = useLang();

  const baseUrl = `https://${process.env.CURRENT_SITE_DOMAIN || "lovepark.com"}`;

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": locale === "es" ? "Parque del Amor" : locale === "zh" ? "爱情公园" : locale === "qu" ? "Love Park" : "Love Park",
    "description": t.about.p1,
    "url": `${baseUrl}/${locale}`,
    "image": `${baseUrl}/gallery/love-park (1).jpg`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "30706"
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
