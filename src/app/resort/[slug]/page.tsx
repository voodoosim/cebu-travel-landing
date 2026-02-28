import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';

const resorts = products.resorts;

export function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);
  if (!resort) return { title: 'Not Found' };
  return {
    title: `${resort.name} - ${resort.grade || '리조트'}`,
    description: `${resort.name} - ${resort.area || '세부'}. ${resort.feature || ''}`,
  };
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);
  if (!resort) notFound();

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">GOLF</Link>
            <Link href="/resort/" className="text-gold-300/70 hover:text-gold-400 transition-colors">RESORTS</Link>
            <Link href="/activity/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">ACTIVITIES</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/resort/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-gold-300/40 hover:text-gold-300/70 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          RESORTS
        </Link>

        <div className="border border-gold-500/15 p-8 sm:p-10">
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-3xl font-[family-name:var(--font-serif)] text-ivory">{resort.name}</h1>
            {resort.grade && (
              <span className="text-[11px] border border-gold-500/30 text-gold-400 px-3 py-1 tracking-wider font-medium">
                {resort.grade}
              </span>
            )}
          </div>
          {resort.nameKo && <p className="text-gold-300/50 text-sm mb-1">{resort.nameKo}</p>}
          {resort.area && <p className="text-xs text-gold-300/30 mb-8">{resort.area}</p>}

          {resort.feature && (
            <div className="mb-8">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-3 uppercase">Highlight</h2>
              <p className="text-sm text-gold-200/50 leading-relaxed">{resort.feature}</p>
            </div>
          )}

          {resort.features.length > 0 && (
            <div className="mb-8 pt-8 border-t border-gold-500/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-4 uppercase">Facilities</h2>
              <ul className="space-y-2.5">
                {resort.features.map((f) => (
                  <li key={f} className="text-sm text-gold-200/50 flex items-start gap-2.5">
                    <span className="text-gold-500/40 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resort.description && (
            <div className="mb-8 pt-8 border-t border-gold-500/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-4 uppercase">Details</h2>
              <p className="text-sm text-gold-200/50 leading-relaxed whitespace-pre-line">{resort.description}</p>
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
