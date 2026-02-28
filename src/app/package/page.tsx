import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: '세부 맞춤 패키지',
  description: '골프, 리조트, 관광을 원하는 대로 조합하는 세부 맞춤 패키지.',
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
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">골프</Link>
            <Link href="/resort/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">액티비티</Link>
            <Link href="/package/" className="text-gold-400">패키지</Link>
            <Link href="/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">홈</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 uppercase mb-4">Packages</p>
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-ivory mb-4">맞춤 패키지</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-gold-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            골프, 리조트, 관광을 원하는 대로 조합. 일정과 예산에 맞춰 최적의 패키지를 안내합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-[1px] bg-gold-500/10 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.title} className="bg-navy-900 overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                {pkg.badge && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-5">
                  <p className="text-gold-300/60 text-xs tracking-wider">{pkg.courses}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-ivory mb-2">{pkg.title}</h3>
                <p className="text-gold-200/40 text-sm leading-relaxed mb-5">{pkg.description}</p>
                <div className="border-t border-gold-500/10 pt-4">
                  <p className="text-[10px] tracking-[0.15em] text-gold-400 mb-3 uppercase">Includes</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((item) => (
                      <span key={item} className="text-[11px] text-gold-300/40 border border-gold-500/15 px-2.5 py-1 tracking-wider">
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
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            INQUIRE NOW
          </Link>
        </div>
      </main>
    </div>
  );
}
