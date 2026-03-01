import Link from 'next/link';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '@/app/components/SiteHeader';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: '세부 리조트 & 호텔',
  description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
  alternates: { canonical: 'https://cebu.sasori.dev/resort/' },
  openGraph: {
    title: '세부 리조트 & 호텔',
    description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
    url: 'https://cebu.sasori.dev/resort/',
  },
};

const resorts = products.resorts;

export default function ResortListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="resort" />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <PageHero
          label="Resorts & Hotels"
          title="리조트 & 호텔"
          description="세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/10 max-w-5xl mx-auto">
          {resorts.map((r) => (
            <Link
              key={r.id}
              href={`/resort/${r.slug}/`}
              className="bg-white p-6 group hover:bg-ivory transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-[family-name:var(--font-serif)] text-navy-900 text-sm leading-tight group-hover:text-gold-500 transition-colors">
                  {r.name}
                </h3>
                {r.grade && (
                  <span className="text-[10px] border border-gold-500/40 text-gold-500 px-2 py-0.5 tracking-wider whitespace-nowrap ml-2">
                    {r.grade}
                  </span>
                )}
              </div>
              {r.area && <p className="text-[11px] text-navy-600/30 mb-2">{r.area}</p>}
              {r.feature && <p className="text-xs text-navy-600/50 leading-relaxed">{r.feature}</p>}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
