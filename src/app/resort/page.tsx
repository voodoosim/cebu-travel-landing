import Link from 'next/link';
import products from '@/data/products.json';

export const metadata = {
  title: '세부 리조트 & 호텔',
  description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
};

const resorts = products.resorts;

export default function ResortListPage() {
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

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Resorts & Hotels</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-navy-900 mb-4">리조트 & 호텔</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-navy-600/60 max-w-xl mx-auto text-sm leading-relaxed">
            세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내.
          </p>
        </div>

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
