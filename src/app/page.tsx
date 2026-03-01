import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, CircleDot, Hotel, Compass, Gift } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import products from "@/data/products.json";

const services = [
  { icon: CircleDot, label: "골프", desc: `${products.golf.length}개 코스`, href: "/golf/" },
  { icon: Hotel, label: "리조트", desc: `${products.resorts.length}곳`, href: "/resort/" },
  { icon: Compass, label: "액티비티", desc: `${products.activities.length}개 투어`, href: "/activity/" },
  { icon: Gift, label: "패키지", desc: `${products.packages.length}개 구성`, href: "/package/" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-navy-900">
      <SiteHeader />

      <main className="flex-grow">
        {/* 히어로 */}
        <section className="relative h-[50vh] min-h-[400px] max-h-[520px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hero-golf.webp" alt="세부 여행" fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-navy-900/55" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
            <p className="text-gold-300 text-xs tracking-[0.3em] uppercase mb-3">Cebu Premium Travel Guide</p>
            <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.15] mb-4">
              세부 여행의<br />모든 것
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
              골프 · 리조트 · 관광 · 교통 — 현지 한국인이 운영하는 원스톱 가이드
            </p>
          </div>
        </section>

        {/* 서비스 네비게이션 */}
        <section className="-mt-10 relative z-20 max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="group bg-white border border-navy-900/5 hover:border-gold-500/40 p-5 text-center transition-all hover:shadow-lg">
                <s.icon className="w-6 h-6 mx-auto mb-3 text-gold-500" strokeWidth={1.5} />
                <p className="font-medium text-sm mb-0.5">{s.label}</p>
                <p className="text-navy-600/40 text-xs">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 소개 + 연락처 */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-2xl mb-4">왜 세부가이드?</h2>
              <ul className="space-y-3 text-sm text-navy-700">
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>세부 현지 한국인 운영 — 언어 걱정 없는 상담</span>
                </li>
                <li className="flex gap-2.5">
                  <Gift className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>골프, 리조트, 관광, 교통을 한번에 해결</span>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>24시간 카카오톡 · 텔레그램 실시간 상담</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h2 className="font-[family-name:var(--font-serif)] text-2xl mb-4">문의하기</h2>
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
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white/40 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-lg text-white tracking-wide mb-3">
                CEBU<span className="text-gold-500">GUIDE</span>
              </p>
              <p className="text-xs leading-relaxed">세부 현지 한국인 운영<br />여행 토탈 솔루션</p>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/golf/" className="hover:text-gold-400 transition-colors">골프</Link></li>
                <li><Link href="/resort/" className="hover:text-gold-400 transition-colors">리조트</Link></li>
                <li><Link href="/activity/" className="hover:text-gold-400 transition-colors">액티비티</Link></li>
                <li><Link href="/package/" className="hover:text-gold-400 transition-colors">패키지</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-4">Info</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq/" className="hover:text-gold-400 transition-colors">자주 묻는 질문</Link></li>
                <li><Link href="/login/" className="hover:text-gold-400 transition-colors">로그인</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-4">Contact</h4>
              <ul className="space-y-2 text-xs">
                <li>KakaoTalk: cebuguide</li>
                <li>Telegram: @cebu_guide</li>
                <li>+63 917 555 0123</li>
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
