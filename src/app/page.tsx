import Image from "next/image";
import Link from "next/link";
import { Star, ChevronDown, Phone, MessageCircle, ArrowRight } from "lucide-react";
import MobileMenu from "./components/MobileMenu";
import ExchangeRate from "./components/ExchangeRate";
import BookingForm from "./components/BookingForm";

const services = [
  {
    title: "Golf",
    titleKo: "골프 예약",
    description: "세부 전역 6개 명문 골프장. 그린피, 캐디, 카트 올인원 패키지.",
    href: "/golf/",
  },
  {
    title: "Resort",
    titleKo: "리조트 & 호텔",
    description: "샹그릴라, 크림슨, 플랜테이션베이 등 5성급 리조트 예약.",
    href: "/resort/",
  },
  {
    title: "Activity",
    titleKo: "관광 & 액티비티",
    description: "아일랜드 호핑, 고래상어, 카와산 폭포, 다이빙, 시티투어.",
    href: "/activity/",
  },
  {
    title: "Package",
    titleKo: "맞춤 패키지",
    description: "골프 + 리조트 + 관광을 원하는 대로 조합하는 올인원 패키지.",
    href: "/package/",
  },
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gold-200/50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-[family-name:var(--font-serif)] font-semibold tracking-wide text-navy-900">
              CEBU<span className="text-gold-500">GUIDE</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex gap-10">
            <Link href="/golf/" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">골프</Link>
            <Link href="/resort/" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">액티비티</Link>
            <Link href="/package/" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">패키지</Link>
            <Link href="/faq/" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">FAQ</Link>
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <Link href="/login" className="text-[13px] tracking-wider text-navy-600 hover:text-gold-500 transition-colors">Sign In</Link>
            <Link href="#cta" className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-2.5 text-[13px] tracking-wider uppercase transition-all">
              Contact
            </Link>
          </div>
          <MobileMenu />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-golf.webp"
              alt="세부 골프장 전경"
              fill
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
              <Link href="#services" className="border border-white/30 hover:bg-white hover:text-navy-900 text-white px-10 py-4 text-[13px] tracking-widest uppercase transition-all duration-300">
                Explore
              </Link>
              <Link href="#cta" className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-4 text-[13px] tracking-widest uppercase font-medium transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-5 h-5 text-white/40" />
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-navy-900 text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <p className="font-[family-name:var(--font-serif)] text-4xl text-gold-400">6</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">Golf Courses</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-serif)] text-4xl text-gold-400">10+</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">Premium Resorts</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-serif)] text-4xl text-gold-400">15+</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">Activities</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-serif)] text-4xl text-gold-400">24/7</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-2">Korean Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-32 bg-ivory">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Our Services</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">통합 서비스</h2>
              <div className="line-gold mx-auto mt-6 mb-6" />
              <p className="text-navy-600/60 max-w-lg mx-auto">
                세부 여행에 필요한 모든 것을 원스톱으로 대행합니다
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy-900/10">
              {services.map((s) => (
                <Link key={s.title} href={s.href} className="group bg-ivory p-10 hover:bg-white transition-colors duration-300">
                  <p className="text-gold-500 text-[11px] tracking-[0.3em] uppercase mb-3">{s.title}</p>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl text-navy-900 mb-3">{s.titleKo}</h3>
                  <p className="text-navy-600/60 text-sm leading-relaxed mb-6">{s.description}</p>
                  <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Testimonials</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">고객 후기</h2>
              <div className="line-gold mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {testimonials.map((t) => (
                <div key={t.name}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
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

        {/* Contact */}
        <section className="py-16 bg-navy-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
              <a href="https://open.kakao.com/" target="_blank" rel="noopener noreferrer" className="bg-navy-900 hover:bg-navy-800 text-white p-8 transition-colors text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-3 text-gold-400" />
                <p className="text-sm font-medium mb-1">KakaoTalk</p>
                <p className="text-white/30 text-xs">실시간 1:1 상담</p>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="bg-navy-900 hover:bg-navy-800 text-white p-8 transition-colors text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-3 text-gold-400" />
                <p className="text-sm font-medium mb-1">Telegram</p>
                <p className="text-white/30 text-xs">빠른 응답</p>
              </a>
              <a href="tel:+639123456789" className="bg-navy-900 hover:bg-navy-800 text-white p-8 transition-colors text-center">
                <Phone className="w-6 h-6 mx-auto mb-3 text-gold-400" />
                <p className="text-sm font-medium mb-1">Phone</p>
                <p className="text-white/30 text-xs">+63 912 345 6789</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-32 bg-ivory">
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
                <li>KakaoTalk: 세부가이드</li>
                <li>Telegram: @cebu_guide</li>
                <li>+63 912 345 6789</li>
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
