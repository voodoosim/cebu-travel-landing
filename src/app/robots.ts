import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login/', '/mypage/', '/api/'],
    },
    sitemap: 'https://cebu.sasori.dev/sitemap.xml',
  };
}
