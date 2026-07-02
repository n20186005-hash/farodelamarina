import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.CURRENT_SITE_DOMAIN 
    ? `https://${process.env.CURRENT_SITE_DOMAIN}`
    : 'https://navylighthouse.com';

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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
