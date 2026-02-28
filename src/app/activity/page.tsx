import Link from 'next/link';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: '세부 관광 & 액티비티',
  description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
  alternates: { canonical: 'https://cebu.sasori.dev/activity/' },
  openGraph: {
    title: '세부 관광 & 액티비티',
    description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
    url: 'https://cebu.sasori.dev/activity/',
  },
};

const activities = products.activities;

export default function ActivityListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="activity" />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Experiences</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-navy-900 mb-4">관광 & 액티비티</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-navy-600/60 max-w-xl mx-auto text-sm leading-relaxed">
            골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/10 max-w-5xl mx-auto">
          {activities.map((a) => (
            <Link
              key={a.id}
              href={`/activity/${a.slug}/`}
              className="bg-white p-6 group hover:bg-ivory transition-colors"
            >
              <h3 className="font-[family-name:var(--font-serif)] text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">
                {a.name}
              </h3>
              {a.duration && (
                <p className="text-[10px] tracking-[0.15em] text-gold-500 font-medium mb-3 uppercase">{a.duration}</p>
              )}
              {a.description && (
                <p className="text-xs text-navy-600/50 leading-relaxed line-clamp-2">{a.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
