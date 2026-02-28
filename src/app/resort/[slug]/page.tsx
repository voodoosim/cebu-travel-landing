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
  const descParts = [resort.name];
  if (resort.grade) descParts.push(resort.grade);
  if (resort.area) descParts.push(resort.area);
  if (resort.feature) descParts.push(resort.feature);
  const desc = descParts.join(' - ') + '. 세부 리조트 예약 대행.';
  return {
    title: `${resort.name} - ${resort.grade || '리조트'}`,
    description: desc,
    alternates: { canonical: `https://cebu.sasori.dev/resort/${slug}/` },
    openGraph: {
      title: `${resort.name} - ${resort.grade || '리조트'}`,
      description: desc,
      url: `https://cebu.sasori.dev/resort/${slug}/`,
    },
  };
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);
  if (!resort) notFound();

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gold-200/50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="text-xl font-[family-name:var(--font-serif)] font-semibold tracking-wide text-navy-900">
            CEBU<span className="text-gold-500">GUIDE</span>
          </Link>
          <nav className="flex items-center gap-10 text-[13px] tracking-widest">
            <Link href="/golf/" className="text-navy-700 hover:text-gold-500 transition-colors">골프</Link>
            <Link href="/resort/" className="text-gold-500 font-medium">리조트</Link>
            <Link href="/activity/" className="text-navy-700 hover:text-gold-500 transition-colors">액티비티</Link>
            <Link href="/package/" className="text-navy-700 hover:text-gold-500 transition-colors">패키지</Link>
            <Link href="/faq/" className="text-navy-700 hover:text-gold-500 transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/resort/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-navy-600/40 hover:text-gold-500 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          RESORTS
        </Link>

        <div className="bg-white border border-navy-900/5 p-8 sm:p-10">
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-3xl font-[family-name:var(--font-serif)] text-navy-900">{resort.name}</h1>
            {resort.grade && (
              <span className="text-[11px] border border-gold-500/40 text-gold-500 px-3 py-1 tracking-wider font-medium">
                {resort.grade}
              </span>
            )}
          </div>
          {resort.nameKo && <p className="text-navy-600/40 text-sm mb-1">{resort.nameKo}</p>}
          {resort.area && <p className="text-xs text-navy-600/30 mb-8">{resort.area}</p>}

          {resort.feature && (
            <div className="mb-8">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-3 uppercase">Highlight</h2>
              <p className="text-sm text-navy-600/60 leading-relaxed">{resort.feature}</p>
            </div>
          )}

          {resort.features.length > 0 && (
            <div className="mb-8 pt-8 border-t border-navy-900/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">Facilities</h2>
              <ul className="space-y-2.5">
                {resort.features.map((f) => (
                  <li key={f} className="text-sm text-navy-600/60 flex items-start gap-2.5">
                    <span className="text-gold-400 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resort.description && (
            <div className="mb-8 pt-8 border-t border-navy-900/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">Details</h2>
              <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{resort.description}</p>
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
