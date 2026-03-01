import Image from "next/image";
import Link from "next/link";
import { Star, Phone, MessageCircle, ArrowRight } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import ExchangeRate from "@/app/components/ExchangeRate";
import BookingForm from "@/app/components/BookingForm";
import products from "@/data/products.json";

const featuredGolf = products.golf[0];
const featuredActivity = products.activities[0];
const featuredResort = products.resorts[0];

const mixedGrid = [
  { ...products.resorts[0], type: "resort" as const, displayName: products.resorts[0].nameKo, sub: products.resorts[0].feature },
  { ...products.activities[0], type: "activity" as const, displayName: products.activities[0].name, sub: products.activities[0].duration },
  { ...products.activities[1], type: "activity" as const, displayName: products.activities[1].name, sub: products.activities[1].duration },
  { ...products.resorts[1], type: "resort" as const, displayName: products.resorts[1].nameKo, sub: products.resorts[1].feature },
  { ...products.resorts[2], type: "resort" as const, displayName: products.resorts[2].nameKo, sub: products.resorts[2].feature },
  { ...products.activities[2], type: "activity" as const, displayName: products.activities[2].name, sub: products.activities[2].duration },
];

const testimonials = [
  {
    name: "김정호",
    location: "서울",
    rating: 5,
    text: "알타비스타 라운딩 + 아일랜드 호핑 + 리조트까지 전부 한번에 해결됐습니다. 한국어 가이드가 있어서 정말 편했어요.",
  },
  {
    name: "박성민",
    location: "부산",
    rating: 5,
    text: "골프 패키지로 왔다가 카와산 폭포까지 추가했는데 인생 여행이었습니다. 픽업부터 모든 게 완벽했어요.",
  },
  {
    name: "이준혁",
    location: "대구",
    rating: 5,
    text: "가족 여행으로 리조트 풀패키지 이용했습니다. 아내는 스파, 저는 골프, 아이들은 워터파크. 모두 만족!",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-navy-900">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero (축소) + Stats 오버레이 */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-golf.webp"
              alt="세부 골프장 전경"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-navy-900/60" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <div className="line-gold mx-auto mb-8" />
            <p className="text-gold-300 text-sm tracking-[0.3em] uppercase mb-6">Cebu Premium Travel Guide</p>
            <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-7xl lg:text-8xl font-medium mb-8 leading-[1.1] tracking-tight">
              The Finest<br />
              <span className="text-gold-gradient">Cebu Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed">
              골프, 리조트, 관광, 교통<br className="sm:hidden" /> 세부 여행의 모든 것을 한번에
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#featured" className="border border-white/30 hover:bg-white hover:text-navy-900 text-white px-10 py-4 text-[13px] tracking-widest uppercase transition-all duration-300">
                Explore
              </Link>
              <Link href="#cta" className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-4 text-[13px] tracking-widest uppercase font-medium transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Stats 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 bg-navy-900/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="font-[family-name:var(--font-serif)] text-3xl text-gold-400">6</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Golf Courses</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-serif)] text-3xl text-gold-400">10+</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Premium Resorts</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-serif)] text-3xl text-gold-400">15+</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Activities</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-serif)] text-3xl text-gold-400">24/7</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Korean Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editor's Pick - 비대칭 그리드 */}
        <section id="featured" className="py-20 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Editor&apos;s Pick</p>
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-10">추천 콘텐츠</h2>

            <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
              {/* 큰 카드 - 골프 */}
              <Link href={`/golf/${featuredGolf.slug}/`} className="group lg:col-span-2 lg:row-span-2 relative h-80 lg:h-auto overflow-hidden">
                <Image src={featuredGolf.image} alt={featuredGolf.nameKo} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                <div className="absolute top-5 left-5 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                  GOLF
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl lg:text-3xl text-white mb-2">{featuredGolf.nameKo}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{featuredGolf.description}</p>
                </div>
              </Link>

              {/* 작은 카드 - 액티비티 */}
              <Link href={`/activity/${featuredActivity.slug}/`} className="group relative h-48 lg:h-auto overflow-hidden">
                <Image src={featuredActivity.image} alt={featuredActivity.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                  ACTIVITY
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-white mb-1">{featuredActivity.name}</h3>
                  <p className="text-white/60 text-xs line-clamp-1">{featuredActivity.description}</p>
                </div>
              </Link>

              {/* 작은 카드 - 리조트 */}
              <Link href={`/resort/${featuredResort.slug}/`} className="group relative h-48 lg:h-auto overflow-hidden">
                <Image src={featuredResort.image} alt={featuredResort.nameKo} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                  RESORT
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-white mb-1">{featuredResort.nameKo}</h3>
                  <p className="text-white/60 text-xs line-clamp-1">{featuredResort.description}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Golf Courses - 가로 스크롤 */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Golf Courses</p>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl">세부 골프장</h2>
              </div>
              <Link href="/golf/" className="text-sm text-navy-600/50 hover:text-gold-500 transition-colors flex items-center gap-1">
                전체 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {products.golf.map((course) => (
                <Link
                  key={course.id}
                  href={`/golf/${course.slug}/`}
                  className="group flex-shrink-0 w-72 snap-start"
                >
                  <div className="relative h-48 overflow-hidden mb-4">
                    <Image src={course.image} alt={course.nameKo} fill sizes="288px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {course.badge && (
                      <div className="absolute top-3 right-3 bg-gold-500 text-navy-900 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase">
                        {course.badge}
                      </div>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-lg mb-1 group-hover:text-gold-500 transition-colors">{course.nameKo}</h3>
                  <p className="text-navy-600/40 text-xs">{course.holes}홀 / Par {course.par} / {course.yards.toLocaleString()}yd / {course.courseType}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Resort & Activity Grid */}
        <section className="py-20 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Destinations & Experiences</p>
            <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-10">리조트 & 액티비티</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {mixedGrid.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.type}/${item.slug}/`}
                  className="group relative h-64 overflow-hidden"
                >
                  <Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
                  <div className="absolute top-4 left-4 border border-white/30 text-white px-2.5 py-1 text-[9px] tracking-[0.15em] uppercase">
                    {item.type === "resort" ? "RESORT" : "ACTIVITY"}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-[family-name:var(--font-serif)] text-xl text-white mb-1">
                      {item.displayName}
                    </h3>
                    <p className="text-white/50 text-xs">
                      {item.sub}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-8 justify-center mt-10">
              <Link href="/resort/" className="text-sm text-navy-600/50 hover:text-gold-500 transition-colors flex items-center gap-1">
                리조트 전체 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/activity/" className="text-sm text-navy-600/50 hover:text-gold-500 transition-colors flex items-center gap-1">
                액티비티 전체 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Packages</p>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-4">맞춤 패키지</h2>
              <div className="line-gold mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.packages.map((pkg) => (
                <div key={pkg.id} className="group border border-navy-900/5 hover:border-gold-500/30 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={pkg.image} alt={pkg.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {"badge" in pkg && pkg.badge && (
                      <div className="absolute top-3 right-3 bg-gold-500 text-navy-900 px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase">
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-serif)] text-lg mb-1">{pkg.name}</h3>
                    <p className="text-navy-600/40 text-xs mb-4">{pkg.duration}</p>
                    <p className="text-navy-600/60 text-sm leading-relaxed mb-5">{pkg.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.slice(0, 4).map((inc) => (
                        <span key={inc} className="text-[10px] text-navy-600/50 border border-navy-900/10 px-2.5 py-1 tracking-wide">
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="#cta" className="inline-block bg-navy-900 hover:bg-navy-800 text-white px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors">
                맞춤 패키지 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-20 bg-ivory">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">Testimonials</p>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl mb-4">고객 후기</h2>
              <div className="line-gold mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {testimonials.map((t) => (
                <div key={t.name}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-navy-700 leading-relaxed mb-8 text-[15px]">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-navy-900/10 pt-4">
                    <p className="font-medium text-navy-900 text-sm">{t.name}</p>
                    <p className="text-navy-600/40 text-xs">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Contact 통합 */}
        <section id="cta" className="bg-ivory">
          {/* Contact 바 */}
          <div className="bg-navy-900">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
                <a href="https://open.kakao.com/o/cebuguide" target="_blank" rel="noopener noreferrer" className="bg-navy-900 hover:bg-navy-800 text-white p-6 transition-colors text-center">
                  <MessageCircle className="w-5 h-5 mx-auto mb-2 text-gold-400" aria-hidden="true" />
                  <p className="text-sm font-medium mb-0.5">KakaoTalk</p>
                  <p className="text-white/30 text-xs">실시간 1:1 상담</p>
                </a>
                <a href="https://t.me/cebu_guide" target="_blank" rel="noopener noreferrer" className="bg-navy-900 hover:bg-navy-800 text-white p-6 transition-colors text-center">
                  <MessageCircle className="w-5 h-5 mx-auto mb-2 text-gold-400" aria-hidden="true" />
                  <p className="text-sm font-medium mb-0.5">Telegram</p>
                  <p className="text-white/30 text-xs">빠른 응답</p>
                </a>
                <a href="tel:+639175550123" className="bg-navy-900 hover:bg-navy-800 text-white p-6 transition-colors text-center">
                  <Phone className="w-5 h-5 mx-auto mb-2 text-gold-400" aria-hidden="true" />
                  <p className="text-sm font-medium mb-0.5">Phone</p>
                  <p className="text-white/30 text-xs">+63 917 555 0123</p>
                </a>
              </div>
            </div>
          </div>

          {/* CTA 폼 */}
          <div className="py-20">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
                  <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900 mb-6 leading-tight">
                    세부 여행,<br />지금 문의하세요
                  </h2>
                  <p className="text-navy-600/60 leading-relaxed mb-10">
                    골프, 리조트, 관광 -- 원하시는 조합을 알려주시면<br className="hidden md:block" /> 최적의 패키지를 안내합니다.
                  </p>
                  <ExchangeRate />
                </div>
                <div className="bg-white p-10 border border-navy-900/5">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl text-navy-900 mb-8">무료 상담</h3>
                  <BookingForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white/40 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-lg text-white tracking-wide mb-6">
                CEBU<span className="text-gold-500">GUIDE</span>
              </p>
              <p className="text-sm leading-relaxed">
                세부 현지 한국인 운영.<br />골프, 리조트, 관광, 교통<br />세부 여행 토탈 솔루션.
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-6">Golf Courses</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/golf/alta-vista/" className="hover:text-gold-400 transition-colors">Alta Vista Golf & CC</Link></li>
                <li><Link href="/golf/mactan-airbase/" className="hover:text-gold-400 transition-colors">Mactan Airbase Golf</Link></li>
                <li><Link href="/golf/cebu-country-club/" className="hover:text-gold-400 transition-colors">Cebu Country Club</Link></li>
                <li><Link href="/golf/club-filipino/" className="hover:text-gold-400 transition-colors">Club Filipino de Cebu</Link></li>
                <li><Link href="/golf/liloan/" className="hover:text-gold-400 transition-colors">Liloan Golf & Leisure</Link></li>
                <li><Link href="/golf/queens-island/" className="hover:text-gold-400 transition-colors">Queen&apos;s Island Golf</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/golf/" className="hover:text-gold-400 transition-colors">골프 예약</Link></li>
                <li><Link href="/resort/" className="hover:text-gold-400 transition-colors">리조트 예약</Link></li>
                <li><Link href="/activity/" className="hover:text-gold-400 transition-colors">관광 액티비티</Link></li>
                <li><Link href="/package/" className="hover:text-gold-400 transition-colors">맞춤 패키지</Link></li>
                <li><Link href="/faq/" className="hover:text-gold-400 transition-colors">자주 묻는 질문</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>KakaoTalk: cebuguide</li>
                <li>Telegram: @cebu_guide</li>
                <li>+63 917 555 0123</li>
                <li>Cebu City, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/20">
            &copy; {new Date().getFullYear()} CEBUGUIDE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
