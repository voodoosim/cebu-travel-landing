import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../../components/SiteHeader';

const activities = products.activities;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) return { title: 'Not Found' };
  const desc = activity.description || `세부 ${activity.name} 예약`;
  return {
    title: activity.name,
    description: desc,
    alternates: { canonical: `https://cebu.sasori.dev/activity/${slug}/` },
    openGraph: {
      title: activity.name,
      description: desc,
      url: `https://cebu.sasori.dev/activity/${slug}/`,
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="activity" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/activity/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-navy-600/40 hover:text-gold-500 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          ACTIVITIES
        </Link>

        <div className="bg-white border border-navy-900/5 p-8 sm:p-10">
          <h1 className="text-3xl font-[family-name:var(--font-serif)] text-navy-900 mb-3">{activity.name}</h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {activity.duration && (
              <span className="text-[11px] border border-gold-500/30 text-gold-500 px-4 py-2 tracking-wider">{activity.duration}</span>
            )}
          </div>

          {activity.description && (
            <div className="mb-8">
              <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{activity.description}</p>
            </div>
          )}

          {activity.features.length > 0 && (
            <div className="mb-8 pt-8 border-t border-navy-900/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">Included</h2>
              <ul className="space-y-2.5">
                {activity.features.map((f) => (
                  <li key={f} className="text-sm text-navy-600/60 flex items-start gap-2.5">
                    <span className="text-gold-400 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/#cta"
            className="inline-block bg-navy-900 hover:bg-navy-800 text-white px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            INQUIRE NOW
          </Link>
        </div>
      </main>
    </div>
  );
}
