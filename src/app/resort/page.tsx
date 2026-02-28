import Link from 'next/link';
import products from '@/data/products.json';

export const metadata = {
  title: '세부 리조트 & 호텔',
  description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
};

const resorts = products.resorts;

export default function ResortListPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">골프</Link>
            <Link href="/resort/" className="text-gold-400">리조트</Link>
            <Link href="/activity/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">액티비티</Link>
            <Link href="/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">홈</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 mb-4">ACCOMMODATIONS</p>
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-ivory mb-4">리조트 & 호텔</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-gold-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold-500/10 max-w-5xl mx-auto">
          {resorts.map((r) => (
            <Link
              key={r.id}
              href={`/resort/${r.slug}/`}
              className="bg-navy-900 p-6 group hover:bg-navy-800/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-[family-name:var(--font-serif)] text-ivory text-sm leading-tight group-hover:text-gold-300 transition-colors">
                  {r.name}
                </h3>
                {r.grade && (
                  <span className="text-[10px] border border-gold-500/30 text-gold-400 px-2 py-0.5 tracking-wider whitespace-nowrap ml-2">
                    {r.grade}
                  </span>
                )}
              </div>
              {r.area && <p className="text-[11px] text-gold-300/30 mb-2">{r.area}</p>}
              {r.feature && <p className="text-xs text-gold-200/40 leading-relaxed">{r.feature}</p>}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
