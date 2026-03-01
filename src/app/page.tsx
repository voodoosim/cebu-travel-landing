import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CircleDot,
  Compass,
  Gift,
  Hotel,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import BookingForm from "@/app/components/BookingForm";
import products from "@/data/products.json";

const services = [
  { icon: CircleDot, label: "골프", desc: `${products.golf.length}개 코스`, href: "/golf/" },
  { icon: Hotel, label: "리조트", desc: `${products.resorts.length}곳`, href: "/resort/" },
  { icon: Compass, label: "액티비티", desc: `${products.activities.length}개 투어`, href: "/activity/" },
  { icon: Gift, label: "패키지", desc: `${products.packages.length}개 구성`, href: "/package/" },
];

const collections = [
  {
    title: "시그니처 골프",
    description: "명문부터 리조트형까지 코스 큐레이션",
    image: products.golf[0].image,
    href: "/golf/",
  },
  {
    title: "오션 리조트",
    description: "막탄 & 세부 시티 프리미엄 리조트",
    image: products.resorts[0].image,
    href: "/resort/",
  },
  {
    title: "아일랜드 어드벤처",
    description: "호핑, 캐녀닝, 다이빙까지 액티비티",
    image: products.activities[0].image,
    href: "/activity/",
  },
  {
    title: "맞춤 패키지",
    description: "골프 + 관광 조합 일정 설계",
    image: products.packages[0].image,
    href: "/package/",
  },
];

const editorPicks = [
  {
    category: "Golf",
    title: products.golf[1].nameKo,
    subtitle: products.golf[1].distance,
    image: products.golf[1].image,
    href: `/golf/${products.golf[1].slug}/`,
    tags: products.golf[1].features.slice(0, 3),
  },
  {
    category: "Resort",
    title: products.resorts[0].nameKo,
    subtitle: products.resorts[0].feature,
    image: products.resorts[0].image,
    href: `/resort/${products.resorts[0].slug}/`,
    tags: products.resorts[0].features.slice(0, 3),
  },
  {
    category: "Activity",
    title: products.activities[2].name,
    subtitle: products.activities[2].duration,
    image: products.activities[2].image,
    href: `/activity/${products.activities[2].slug}/`,
    tags: products.activities[2].features.slice(0, 3),
  },
];

const highlights = [
  {
    title: "로컬 한국인 운영",
    description: "세부 현지에서 바로 연결되는 실시간 상담",
    icon: MapPin,
  },
  {
    title: "투명한 일정 설계",
    description: "원하는 취향과 예산에 맞춘 맞춤형 제안",
    icon: ShieldCheck,
  },
  {
    title: "경험 기반 큐레이션",
    description: "검증된 리조트와 투어 중심으로 제안",
    icon: Sparkles,
  },
];

const steps = [
  {
    title: "상담 요청",
    description: "원하는 일정과 예산을 알려주세요.",
  },
  {
    title: "맞춤 제안",
    description: "동선과 취향을 반영한 추천안을 드립니다.",
  },
  {
    title: "예약 확정",
    description: "확정 후 바로 여행 준비를 도와드립니다.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-navy-900 page-wash">
      <SiteHeader />

      <main className="flex-grow">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.25),_transparent_55%)]" />
          <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-gold-100/70 blur-3xl animate-[float-slow_10s_ease-in-out_infinite]" />
          <div className="absolute -bottom-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-navy-900/10 blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="space-y-7 animate-[fade-up_0.8s_ease-out_both]">
              <p className="text-gold-500 text-xs tracking-[0.35em] uppercase">Cebu Premium Travel Guide</p>
              <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl lg:text-6xl text-navy-900 font-medium leading-[1.1]">
                세부 여행을
                <br />
                하나의 설계로
              </h1>
              <p className="text-navy-600/70 text-base md:text-lg max-w-lg leading-relaxed">
                골프, 리조트, 관광, 교통까지. 현지 한국인이 운영하는 세부 여행 원스톱 가이드입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/package/"
                  className="bg-navy-900 text-white px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-navy-800"
                >
                  패키지 보기
                </Link>
                <Link
                  href="/#cta"
                  className="border border-navy-900/20 text-navy-900 px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:border-gold-500/60 hover:text-gold-500"
                >
                  빠른 상담
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {services.map((service) => (
                  <div key={service.href} className="rounded-2xl bg-white/80 border border-white/80 px-4 py-3 text-center shadow-sm">
                    <p className="text-lg font-semibold text-navy-900">{service.desc}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy-600/60">{service.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative aspect-[16/9] rounded-[30px] overflow-hidden border border-white/70 shadow-xl">
                  <Image
                    src="/images/hero-golf.webp"
                    alt="세부 여행"
                    fill
                    sizes="(min-width: 1024px) 46vw, 90vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />
                </div>
                <div className="relative aspect-[4/5] rounded-[26px] overflow-hidden border border-white/70 shadow-lg">
                  <Image
                    src={products.resorts[1].image}
                    alt="세부 리조트"
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-[26px] overflow-hidden border border-white/70 shadow-lg">
                  <Image
                    src={products.activities[0].image}
                    alt="세부 액티비티"
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -left-6 -bottom-6 bg-white/90 backdrop-blur-md border border-white/70 rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-500">Local Desk</p>
                <p className="text-sm font-medium text-navy-900">현지 한국인 운영 상담</p>
              </div>
              <div className="absolute -right-4 top-8 hidden sm:flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur-md border border-white/70 rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs text-navy-600/60">대표 상담 채널</p>
                  <p className="text-sm font-medium">카카오톡 · 텔레그램</p>
                </div>
                <div className="bg-navy-900 text-white rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-xs text-white/60">맞춤 일정 설계</p>
                  <p className="text-sm font-medium">취향 기반 큐레이션</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl bg-white/90 backdrop-blur border border-white/70 p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-11 h-11 rounded-full bg-gold-100/80 flex items-center justify-center mb-3">
                  <service.icon className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-sm mb-1 text-navy-900">{service.label}</p>
                <p className="text-navy-600/50 text-xs mb-4">{service.desc}</p>
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold-500 group-hover:text-gold-400">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-500 mb-3">Collections</p>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900">
                  취향별로 큐레이션한 세부 여행
                </h2>
              </div>
              <Link
                href="/package/"
                className="text-xs uppercase tracking-[0.2em] text-navy-600 hover:text-gold-500 transition-colors inline-flex items-center gap-2"
              >
                전체 패키지 보기 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
                  </div>
                  <div className="relative z-10 min-h-[260px] p-5 flex flex-col justify-end">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold-200">Collection</p>
                    <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.description}</p>
                    <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold-200 inline-flex items-center gap-2">
                      Explore <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gold-50/80 border-y border-gold-100/60">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-500 mb-3">Editor&apos;s Picks</p>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900">
                  실시간 인기 코스 & 투어 추천
                </h2>
              </div>
              <Link
                href="/golf/"
                className="text-xs uppercase tracking-[0.2em] text-navy-600 hover:text-gold-500 transition-colors inline-flex items-center gap-2"
              >
                전체 일정 보기 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {editorPicks.map((pick) => (
                <Link
                  key={pick.title}
                  href={pick.href}
                  className="group rounded-3xl overflow-hidden border border-white/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <Image
                      src={pick.image}
                      alt={pick.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-gold-200 bg-navy-900/70 px-3 py-1 rounded-full">
                      {pick.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900">{pick.title}</h3>
                      <p className="text-xs text-navy-600/60 mt-1">{pick.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pick.tags.map((tag) => (
                        <span key={tag} className="text-[11px] text-navy-600/70 bg-ivory px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gold-500 inline-flex items-center gap-2">
                      자세히 보기 <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-500">Why Cebu Guide</p>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900">
                여행의 번거로움을 덜어주는
                <br />
                현지 운영 파트너
              </h2>
              <p className="text-navy-600/70 leading-relaxed">
                세부 현지에서 바로 연결되는 상담과 동선 설계로, 불필요한 이동과 비용을 줄이고 만족도를 높입니다.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-navy-900/10 bg-white/90 p-5">
                    <div className="w-10 h-10 rounded-full bg-gold-100/80 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                    </div>
                    <p className="font-medium text-sm text-navy-900 mb-1">{item.title}</p>
                    <p className="text-xs text-navy-600/60 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-navy-900 text-white p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.25),_transparent_60%)]" />
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-gold-200 mb-2">Process</p>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl">여행 준비는 간결하게</h3>
                </div>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="w-9 h-9 rounded-full border border-gold-200/40 flex items-center justify-center text-xs text-gold-200">
                        0{index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{step.title}</p>
                        <p className="text-xs text-white/60">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {services.map((service) => (
                    <div key={service.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-lg font-semibold">{service.desc}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">{service.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 bg-ivory/90 border-t border-gold-100/70">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-gold-500">Contact</p>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900">
                  빠른 상담으로
                  <br />
                  일정부터 확정하세요
                </h2>
                <p className="text-navy-600/70 leading-relaxed">
                  카카오톡, 텔레그램, 전화 상담을 통해 일정과 예산을 알려주시면 맞춤 플랜을 드립니다.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://open.kakao.com/o/cebuguide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-navy-900/10 bg-white/80 p-4 transition-colors hover:border-gold-500/40"
                  >
                    <MessageCircle className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">KakaoTalk</p>
                      <p className="text-xs text-navy-600/50">실시간 1:1 상담</p>
                    </div>
                  </a>
                  <a
                    href="https://t.me/cebu_guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-navy-900/10 bg-white/80 p-4 transition-colors hover:border-gold-500/40"
                  >
                    <MessageCircle className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">Telegram</p>
                      <p className="text-xs text-navy-600/50">빠른 응답</p>
                    </div>
                  </a>
                  <a
                    href="tel:+639175550123"
                    className="flex items-center gap-3 rounded-2xl border border-navy-900/10 bg-white/80 p-4 transition-colors hover:border-gold-500/40"
                  >
                    <Phone className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">+63 917 555 0123</p>
                      <p className="text-xs text-navy-600/50">전화 상담</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-navy-900/10 bg-white p-8 shadow-lg">
                <h3 className="font-[family-name:var(--font-serif)] text-2xl mb-4">맞춤 견적 문의</h3>
                <p className="text-sm text-navy-600/60 mb-6">
                  일정과 희망사항을 남겨주시면, 빠르게 맞춤 제안을 드립니다.
                </p>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>

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
