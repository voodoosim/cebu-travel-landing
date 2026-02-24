import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cebu.sasori.dev';

  const [courses, resorts, activities] = await Promise.all([
    prisma.golfCourse.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.resort.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.activity.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/golf`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/resort`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/activity`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  const coursePages = courses.map((c) => ({
    url: `${baseUrl}/golf/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const resortPages = resorts.map((r) => ({
    url: `${baseUrl}/resort/${r.slug}`,
    lastModified: r.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const activityPages = activities.map((a) => ({
    url: `${baseUrl}/activity/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages, ...resortPages, ...activityPages];
}
