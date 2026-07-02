export function generateSchema(locale: string) {
  const baseUrl = `https://${process.env.CURRENT_SITE_DOMAIN || "navylighthouse.com"}`;
  const localUrl = `${baseUrl}/${locale}`;

  const name = locale === "es"
    ? "Faro de la Marina"
    : locale === "zh"
    ? "海军灯塔"
    : locale === "qu"
    ? "Navy Lighthouse"
    : "Navy Lighthouse";

  const description = locale === "es"
    ? "Faro de la Marina en Miraflores, Lima. Faro histórico construido en 1900 e instalado por la Marina de Guerra del Perú en 1973."
    : locale === "zh"
    ? "利马米拉弗洛雷斯的海军灯塔（Navy Lighthouse），建于1900年，1973年由秘鲁海军安装于此。历史性灯塔，亮度射程45公里。"
    : locale === "qu"
    ? "Navy Lighthouse, Lima, Piruw. Historic lighthouse."
    : "Navy Lighthouse in Miraflores, Lima, built in 1900 and installed by the Peruvian Navy in 1973. Historic lighthouse with 45km range.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TouristAttraction", "Lighthouse", "Place"],
        "name": name,
        "alternateName": ["Faro de la Marina", "Navy Lighthouse", "海军灯塔", "Parque El Faro de la Marina"],
        "description": description,
        "url": localUrl,
        "image": `${baseUrl}/gallery/navy-lighthouse (1).jpg`,
        
        // 精确地理坐标
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -12.1264,
          "longitude": -77.0297
        },
        
        // 地址信息
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mal. Cisneros 18",
          "addressLocality": "Miraflores",
          "addressRegion": "Lima",
          "addressCountry": "PE",
          "postalCode": "15074"
        },
        
        // 开放时间 - 24小时
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        
        // 价格信息（免费）
        "priceRange": "Free",
        "isAccessibleForFree": true,
        
        // 灯塔技术参数
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "constructionYear",
            "value": "1900"
          },
          {
            "@type": "PropertyValue",
            "name": "installationYear",
            "value": "1973"
          },
          {
            "@type": "PropertyValue",
            "name": "height",
            "value": "22 meters"
          },
          {
            "@type": "PropertyValue",
            "name": "altitude",
            "value": "86 meters"
          },
          {
            "@type": "PropertyValue",
            "name": "range",
            "value": "45 km (25 nautical miles)"
          },
          {
            "@type": "PropertyValue",
            "name": "material",
            "value": "Cast iron"
          },
          {
            "@type": "PropertyValue",
            "name": "weight",
            "value": "60,000 kg"
          },
          {
            "@type": "PropertyValue",
            "name": "nonprofit",
            "value": "true"
          }
        ],
        
        // 联系电话（米拉弗洛雷斯区政府）
        "telephone": "+51 1 617-7000",
        
        // 社交媒体和地图链接
        "sameAs": [
          "https://maps.app.goo.gl/7FXLGcATHHeRnALv8",
          "https://www.miraflores.gob.pe/turismo",
          "https://en.wikipedia.org/wiki/La_Marina_Lighthouse"
        ]
      },
      
      // Website 结构化数据
      {
        "@type": "WebSite",
        "url": localUrl,
        "name": name,
        "inLanguage": locale === "es" ? "es-PE" : locale === "zh" ? "zh-CN" : locale === "qu" ? "qu-PE" : "en-US",
        "isAccessibleForFree": true,
        "publisher": {
          "@type": "Organization",
          "name": "Navy Lighthouse Guide",
          "nonprofit": true
        }
      }
    ]
  };
}
