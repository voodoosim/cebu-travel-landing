import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import MobileMenu from '../components/MobileMenu';

export const metadata: Metadata = {
  title: '세부 맞춤 패키지',
  description: '골프, 리조트, 관광을 원하는 대로 조합하는 세부 맞춤 패키지.',
  alternates: { canonical: 'https://cebu.sasori.dev/package/' },
  openGraph: {
    title: '세부 맞춤 패키지',
    description: '골프, 리조트, 관광을 원하는 대로 조합하는 세부 맞춤 패키지.',
    url: 'https://cebu.sasori.dev/package/',
  },
};

const packages = [
  {
    title: "골프 패키지",
    description: "세부 명문 골프장 3~4곳 라운딩 + 호텔 + 공항 픽업 + 전용 차량.",
    courses: "3박4일 ~ 4박5일",
    badge: "인기",
    image: "/images/golf-highland.webp",
    includes: ["그린피", "카트/캐디", "호텔 숙박", "공항 픽업", "전용 차량"],
  },
  {
    title: "골프 + 관광 패키지",
    description: "골프 라운딩과 세부 관광을 함께. 아일랜드 호핑, 시티투어 포함.",
    courses: "4박5일 ~ 5박6일",
    image: "/images/golf-coastal.webp",
    includes: ["골프 2~3회", "액티비티 2회", "리조트 숙박", "전용 차량", "한국어 가이드"],
  },
  {
    title: "리조트 풀패키지",
    description: "골프 + 리조트 + 관광 올인원. 세부의 모든 것을 한번에 즐기는 프리미엄.",
    courses: "5박6일 ~",
    badge: "프리미엄",
    image: "/images/golf-clubhouse.webp",
    includes: ["골프 3회+", "5성급 리조트", "액티비티", "전 일정 차량", "통역 동행"],
  },
];

export default function PackageListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gold-200/50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="text-xl font-[family-name:var(--font-serif)] font-semibold tracking-wide text-navy-900">
            CEBU<span className="text-gold-500">GUIDE</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10 text-[13px] tracking-widest">
            <Link href="/golf/" className="text-navy-700 hover:text-gold-500 transition-colors">골프</Link>
            <Link href="/resort/" className="text-navy-700 hover:text-gold-500 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-navy-700 hover:text-gold-500 transition-colors">액티비티</Link>
            <Link href="/package/" className="text-gold-500 font-medium">패키지</Link>
            <Link href="/faq/" className="text-navy-700 hover:text-gold-500 transition-colors">FAQ</Link>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Packages</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-navy-900 mb-4">맞춤 패키지</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-navy-600/60 max-w-xl mx-auto text-sm leading-relaxed">
            골프, 리조트, 관광을 원하는 대로 조합. 일정과 예산에 맞춰 최적의 패키지를 안내합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.title} className="bg-white border border-navy-900/5 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-900/30" />
                {pkg.badge && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-5">
                  <p className="text-white/70 text-xs tracking-wider">{pkg.courses}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-2">{pkg.title}</h3>
                <p className="text-navy-600/50 text-sm leading-relaxed mb-5">{pkg.description}</p>
                <div className="border-t border-navy-900/10 pt-4">
                  <p className="text-[10px] tracking-[0.15em] text-gold-500 mb-3 uppercase">Includes</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((item) => (
                      <span key={item} className="text-[11px] text-navy-600/40 border border-navy-900/10 px-2.5 py-1 tracking-wider">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
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
