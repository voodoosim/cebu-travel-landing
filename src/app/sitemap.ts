import type { MetadataRoute } from 'next';
import products from '@/data/products.json';

const BASE = 'https://cebu.sasori.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const golfUrls = products.golf.map((c) => ({
    url: `${BASE}/golf/${c.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const resortUrls = products.resorts.map((r) => ({
    url: `${BASE}/resort/${r.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const activityUrls = products.activities.map((a) => ({
    url: `${BASE}/activity/${a.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: `${BASE}`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/golf/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/resort/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/activity/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/package/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq/`, changeFrequency: 'monthly', priority: 0.7 },
    ...golfUrls,
    ...resortUrls,
    ...activityUrls,
  ];
}
