import Link from 'next/link';
import products from '@/data/products.json';

export const metadata = {
  title: '세부 관광 & 액티비티',
  description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
};

const activities = products.activities;

export default function ActivityListPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">GOLF</Link>
            <Link href="/resort/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">RESORTS</Link>
            <Link href="/activity/" className="text-gold-400">ACTIVITIES</Link>
            <Link href="/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">HOME</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 mb-4">EXPERIENCES</p>
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-ivory mb-4">관광 & 액티비티</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-gold-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold-500/10 max-w-5xl mx-auto">
          {activities.map((a) => (
            <Link
              key={a.id}
              href={`/activity/${a.slug}/`}
              className="bg-navy-900 p-6 group hover:bg-navy-800/50 transition-colors"
            >
              <h3 className="font-[family-name:var(--font-serif)] text-ivory mb-2 group-hover:text-gold-300 transition-colors">
                {a.name}
              </h3>
              {a.duration && (
                <p className="text-[10px] tracking-[0.15em] text-gold-500 font-medium mb-3 uppercase">{a.duration}</p>
              )}
              {a.description && (
                <p className="text-xs text-gold-200/40 leading-relaxed line-clamp-2">{a.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
