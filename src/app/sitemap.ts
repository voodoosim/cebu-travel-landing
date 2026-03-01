import type { MetadataRoute } from 'next';
import products from '@/data/products.json';

const BASE = 'https://세부.com';
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const golfUrls = products.golf.map((c) => ({
    url: `${BASE}/golf/${c.slug}/`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const resortUrls = products.resorts.map((r) => ({
    url: `${BASE}/resort/${r.slug}/`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const activityUrls = products.activities.map((a) => ({
    url: `${BASE}/activity/${a.slug}/`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: `${BASE}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/golf/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/resort/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/activity/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/package/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ...golfUrls,
    ...resortUrls,
    ...activityUrls,
  ];
}
