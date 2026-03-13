import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '@/app/components/SiteHeader';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: '세부 관광 & 액티비티',
  description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
  alternates: { canonical: 'https://세부.com/activity/' },
  openGraph: {
    title: '세부 관광 & 액티비티',
    description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
    url: 'https://세부.com/activity/',
  },
};

const activities = products.activities;

export default function ActivityListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="activity" />

      <main>
        <PageHero
          label="Experiences"
          title="관광 & 액티비티"
          description="골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다."
          bgImage={activities[0].image}
        />

        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a) => (
              <Link
                key={a.id}
                href={`/activity/${a.slug}/`}
                className="group bg-white border border-navy-900/5 overflow-hidden hover:shadow-lg transition-shadow duration-300 block"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                  {a.duration && (
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/90 text-[11px]">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {a.duration}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">
                    {a.name}
                  </h3>
                  {a.description && (
                    <p className="text-xs text-navy-600/50 leading-relaxed line-clamp-2 mb-3">{a.description}</p>
                  )}
                  {a.features.length > 0 && (
                    <ul className="space-y-1">
                      {a.features.slice(0, 2).map((f) => (
                        <li key={f} className="text-xs text-navy-600/40 flex items-start gap-2">
                          <span className="text-gold-400 mt-0.5" aria-hidden="true">-</span>
                          {f}
                        </li>
                      ))}
                    </ul>
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
