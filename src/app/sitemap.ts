import { MetadataRoute } from 'next';
import { siteUrl } from '@/site.config';

import places from '@/data/nearby-index.json';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  const languages = {
    es: `${baseUrl}/es`,
    en: `${baseUrl}/en`,
    zh: `${baseUrl}/zh`,
    qu: `${baseUrl}/qu`,
  };

  const paths = ["nearby", ...places.map(p => "nearby/" + p.slug)];
  const nearby = paths.flatMap(path => Object.keys(languages).map(locale => ({url: baseUrl + "/" + locale + "/" + path, alternates: {languages: Object.fromEntries(Object.keys(languages).map(lang => [lang, baseUrl + "/" + lang + "/" + path]))}})));
  return [
    ...nearby,
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${baseUrl}/qu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages,
      },
    },
  ];
}
