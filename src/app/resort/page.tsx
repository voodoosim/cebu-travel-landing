import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '@/app/components/SiteHeader';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: '세부 리조트 & 호텔',
  description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
  alternates: { canonical: 'https://세부.com/resort/' },
  openGraph: {
    title: '세부 리조트 & 호텔',
    description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
    url: 'https://세부.com/resort/',
  },
};

const resorts = products.resorts;

export default function ResortListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="resort" />

      <main>
        <PageHero
          label="Resorts & Hotels"
          title="리조트 & 호텔"
          description="세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내."
          bgImage={resorts[0].image}
        />

        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resorts.map((r) => (
              <Link
                key={r.id}
                href={`/resort/${r.slug}/`}
                className="group bg-white border border-navy-900/5 overflow-hidden hover:shadow-lg transition-shadow duration-300 block"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.nameKo}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                  {r.grade && (
                    <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-sm text-gold-300 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                      {r.grade}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-1 group-hover:text-gold-500 transition-colors">
                    {r.nameKo}
                  </h3>
                  <p className="text-navy-600/40 text-xs mb-3">{r.name}</p>
                  <div className="flex flex-wrap gap-3 text-[11px] text-navy-600/50 mb-3">
                    {r.area && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {r.area}
                      </span>
                    )}
                    {r.grade && (
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3 h-3" aria-hidden="true" />
                        {r.grade}
                      </span>
                    )}
                  </div>
                  {r.feature && (
                    <p className="text-xs text-navy-600/50 leading-relaxed">{r.feature}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
