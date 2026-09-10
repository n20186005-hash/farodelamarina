import { MetadataRoute } from 'next';
import { siteUrl } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  const languages = {
    es: `${baseUrl}/es`,
    en: `${baseUrl}/en`,
    zh: `${baseUrl}/zh`,
    qu: `${baseUrl}/qu`,
  };

  return [
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
