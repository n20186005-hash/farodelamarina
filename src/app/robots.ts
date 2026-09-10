import { MetadataRoute } from 'next';
import { siteUrl } from '@/site.config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/gallery/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
