import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, MessageCircle, ArrowRight, CircleDot, Hotel, Compass, Gift } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import ExchangeRate from "@/app/components/ExchangeRate";
import BookingForm from "@/app/components/BookingForm";
import products from "@/data/products.json";

const services = [
  { icon: CircleDot, label: "골프", desc: "명문 6개 코스", href: "/golf/", count: products.golf.length },
  { icon: Hotel, label: "리조트", desc: "프리미엄 숙소", href: "/resort/", count: products.resorts.length },
  { icon: Compass, label: "액티비티", desc: "투어 & 체험", href: "/activity/", count: products.activities.length },
  { icon: Gift, label: "패키지", desc: "맞춤 조합", href: "/package/", count: products.packages.length },
];

const popular = [
  { ...products.golf[0], type: "golf" as const, label: products.golf[0].nameKo, sub: `${products.golf[0].holes}홀 · ${products.golf[0].courseType}` },
  { ...products.resorts[0], type: "resort" as const, label: products.resorts[0].nameKo ?? products.resorts[0].name, sub: products.resorts[0].feature ?? "" },
  { ...products.activities[0], type: "activity" as const, label: products.activities[0].name, sub: products.activities[0].duration },
  { ...products.golf[1], type: "golf" as const, label: products.golf[1].nameKo, sub: `${products.golf[1].holes}홀 · ${products.golf[1].courseType}` },
  { ...products.resorts[1], type: "resort" as const, label: products.resorts[1].nameKo ?? products.resorts[1].name, sub: products.resorts[1].feature ?? "" },
  { ...products.activities[1], type: "activity" as const, label: products.activities[1].name, sub: products.activities[1].duration },
];

const testimonials = [
  { name: "김정호", location: "서울", rating: 5, text: "알타비스타 라운딩 + 아일랜드 호핑 + 리조트까지 전부 한번에 해결됐습니다. 한국어 가이드가 있어서 정말 편했어요." },
  { name: "박성민", location: "부산", rating: 5, text: "골프 패키지로 왔다가 카와산 폭포까지 추가했는데 인생 여행이었습니다. 픽업부터 모든 게 완벽했어요." },
  { name: "이준혁", location: "대구", rating: 5, text: "가족 여행으로 리조트 풀패키지 이용했습니다. 아내는 스파, 저는 골프, 아이들은 워터파크. 모두 만족!" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-navy-900">
      <SiteHeader />

      <main className="flex-grow">
        {/* 1. 컴팩트 히어로 배너 */}
        <section className="relative h-[45vh] min-h-[360px] max-h-[480px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hero-golf.webp" alt="세부 여행" fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-navy-900/55" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
            <p className="text-gold-300 text-xs tracking-[0.3em] uppercase mb-3">Cebu Premium Travel Guide</p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.15] mb-4">
              세부 여행의<br />모든 것
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              골프 · 리조트 · 관광 · 교통 — 현지 한국인이 운영하는 원스톱 가이드
            </p>
          </div>
        </section>

        {/* 2. 서비스 네비게이션 카드 */}
        <section className="-mt-12 relative z-20 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="group bg-white border border-navy-900/5 hover:border-gold-500/40 p-5 text-center transition-all hover:shadow-lg">
                <s.icon className="w-6 h-6 mx-auto mb-3 text-gold-500" strokeWidth={1.5} />
                <p className="font-medium text-sm mb-0.5">{s.label}</p>
                <p className="text-navy-600/40 text-xs">{s.desc} ({s.count})</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. 인기 상품 */}
        <section className="py-16 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl">인기 상품</h2>
                <p className="text-navy-600/40 text-sm mt-1">가장 많이 찾는 서비스</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popular.map((item) => (
                <Link key={item.id} href={`/${item.type}/${item.slug}/`} className="group flex gap-4 bg-white border border-navy-900/5 hover:border-gold-500/30 p-3 transition-colors">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.label} fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[10px] text-gold-500 tracking-[0.15em] uppercase">{item.type}</span>
                    <h3 className="text-sm font-medium truncate group-hover:text-gold-600 transition-colors">{item.label}</h3>
                    <p className="text-xs text-navy-600/40 mt-0.5">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 패키지 하이라이트 */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl">추천 패키지</h2>
                <p className="text-navy-600/40 text-sm mt-1">원하는 조합으로 맞춤 구성</p>
              </div>
              <Link href="/package/" className="text-sm text-navy-600/40 hover:text-gold-500 transition-colors flex items-center gap-1">
                전체 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {products.packages.map((pkg) => (
                <div key={pkg.id} className="border border-navy-900/5 hover:border-gold-500/30 transition-colors">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={pkg.image} alt={pkg.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-sm mb-1">{pkg.name}</h3>
                    <p className="text-xs text-navy-600/40 mb-3">{pkg.duration}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.includes.slice(0, 3).map((inc) => (
                        <span key={inc} className="text-[10px] text-navy-600/50 border border-navy-900/10 px-2 py-0.5">{inc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. 왜 세부가이드? + 후기 (2열) */}
        <section className="py-16 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 왼쪽: 소개 */}
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl mb-6">왜 세부가이드?</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium">세부 현지 한국인 운영</p>
                      <p className="text-xs text-navy-600/50 mt-0.5">언어 걱정 없이 편하게 상담받으세요</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Gift className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium">원스톱 토탈 서비스</p>
                      <p className="text-xs text-navy-600/50 mt-0.5">골프, 리조트, 관광, 교통을 한번에 해결</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium">24시간 카카오톡 상담</p>
                      <p className="text-xs text-navy-600/50 mt-0.5">실시간 문의, 빠른 응답</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8">
                  <ExchangeRate />
                </div>
              </div>

              {/* 오른쪽: 후기 */}
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl mb-6">고객 후기</h2>
                <div className="space-y-5">
                  {testimonials.map((t) => (
                    <div key={t.name} className="bg-white border border-navy-900/5 p-5">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-sm text-navy-700 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                      <p className="text-xs text-navy-600/40">{t.name} · {t.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 문의 (컴팩트) */}
        <section id="cta" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-[family-name:var(--font-serif)] text-2xl md:text-3xl mb-4">문의하기</h2>
                <p className="text-navy-600/50 text-sm leading-relaxed mb-6">
                  원하시는 일정과 조합을 알려주시면 최적의 견적을 안내합니다.
                </p>
                <div className="flex flex-col gap-2">
                  <a href="https://open.kakao.com/o/cebuguide" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-navy-900/10 hover:border-gold-500/40 p-3.5 transition-colors">
                    <MessageCircle className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">KakaoTalk</p>
                      <p className="text-xs text-navy-600/40">실시간 1:1 상담</p>
                    </div>
                  </a>
                  <a href="https://t.me/cebu_guide" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-navy-900/10 hover:border-gold-500/40 p-3.5 transition-colors">
                    <MessageCircle className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">Telegram</p>
                      <p className="text-xs text-navy-600/40">빠른 응답</p>
                    </div>
                  </a>
                  <a href="tel:+639175550123" className="flex items-center gap-3 border border-navy-900/10 hover:border-gold-500/40 p-3.5 transition-colors">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">+63 917 555 0123</p>
                      <p className="text-xs text-navy-600/40">전화 상담</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="bg-ivory p-8 border border-navy-900/5">
                <h3 className="text-sm font-medium mb-6">무료 견적 요청</h3>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white/40 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-lg text-white tracking-wide mb-4">
                CEBU<span className="text-gold-500">GUIDE</span>
              </p>
              <p className="text-sm leading-relaxed">
                세부 현지 한국인 운영.<br />골프, 리조트, 관광, 교통<br />세부 여행 토탈 솔루션.
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-5">Golf</h4>
              <ul className="space-y-2.5 text-sm">
                {products.golf.map((c) => (
                  <li key={c.slug}><Link href={`/golf/${c.slug}/`} className="hover:text-gold-400 transition-colors">{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-5">Services</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/golf/" className="hover:text-gold-400 transition-colors">골프 예약</Link></li>
                <li><Link href="/resort/" className="hover:text-gold-400 transition-colors">리조트 예약</Link></li>
                <li><Link href="/activity/" className="hover:text-gold-400 transition-colors">관광 액티비티</Link></li>
                <li><Link href="/package/" className="hover:text-gold-400 transition-colors">맞춤 패키지</Link></li>
                <li><Link href="/faq/" className="hover:text-gold-400 transition-colors">자주 묻는 질문</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-5">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li>KakaoTalk: cebuguide</li>
                <li>Telegram: @cebu_guide</li>
                <li>+63 917 555 0123</li>
                <li>Cebu City, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/20">
            &copy; {new Date().getFullYear()} CEBUGUIDE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
