import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';

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
  return {
    title: activity.name,
    description: activity.description || `세부 ${activity.name} 예약`,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">골프</Link>
            <Link href="/resort/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-gold-300/70 hover:text-gold-400 transition-colors">액티비티</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/activity/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-gold-300/40 hover:text-gold-300/70 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          ACTIVITIES
        </Link>

        <div className="border border-gold-500/15 p-8 sm:p-10">
          <h1 className="text-3xl font-[family-name:var(--font-serif)] text-ivory mb-3">{activity.name}</h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {activity.duration && (
              <span className="text-[11px] border border-gold-500/20 text-gold-400 px-4 py-2 tracking-wider">{activity.duration}</span>
            )}
          </div>

          {activity.description && (
            <div className="mb-8">
              <p className="text-sm text-gold-200/50 leading-relaxed whitespace-pre-line">{activity.description}</p>
            </div>
          )}

          {activity.features.length > 0 && (
            <div className="mb-8 pt-8 border-t border-gold-500/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-4 uppercase">Included</h2>
              <ul className="space-y-2.5">
                {activity.features.map((f) => (
                  <li key={f} className="text-sm text-gold-200/50 flex items-start gap-2.5">
                    <span className="text-gold-500/40 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/#cta"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-3.5 text-xs font-semibold tracking-[0.2em] transition-colors"
          >
            INQUIRE NOW
          </Link>
        </div>
      </main>
    </div>
  );
}
