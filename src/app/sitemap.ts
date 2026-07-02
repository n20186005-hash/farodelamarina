import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${process.env.CURRENT_SITE_DOMAIN || 'navylighthouse.com'}`;

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
