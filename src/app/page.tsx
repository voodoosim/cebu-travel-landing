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
  Star,
  User,
} from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import BookingForm from "@/app/components/BookingForm";
import products from "@/data/products.json";

const services = [
  { icon: CircleDot, label: "골프", desc: `${products.golf.length}개 코스`, href: "/golf/", emoji: "🏌️" },
  { icon: Hotel, label: "리조트", desc: `${products.resorts.length}곳`, href: "/resort/", emoji: "🏨" },
  { icon: Compass, label: "액티비티", desc: `${products.activities.length}개 투어`, href: "/activity/", emoji: "🏄" },
  { icon: Gift, label: "패키지", desc: `${products.packages.length}개 구성`, href: "/package/", emoji: "✈️" },
];

const collections = [
  {
    title: "시그니처 골프",
    description: "명문부터 리조트형까지 코스 큐레이션",
    image: products.golf[0].image,
    href: "/golf/",
    rating: "4.9",
    isBest: true,
  },
  {
    title: "오션 리조트",
    description: "막탄 & 세부 시티 프리미엄 리조트",
    image: products.resorts[0].image,
    href: "/resort/",
    rating: "4.8",
    isBest: false,
  },
  {
    title: "아일랜드 어드벤처",
    description: "호핑, 캐녀닝, 다이빙까지 액티비티",
    image: products.activities[0].image,
    href: "/activity/",
    rating: "4.9",
    isBest: true,
  },
  {
    title: "맞춤 패키지",
    description: "골프 + 관광 조합 일정 설계",
    image: products.packages[0].image,
    href: "/package/",
    rating: "4.8",
    isBest: false,
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
    rating: "4.9",
    isBest: true,
  },
  {
    category: "Resort",
    title: products.resorts[0].nameKo,
    subtitle: products.resorts[0].feature,
    image: products.resorts[0].image,
    href: `/resort/${products.resorts[0].slug}/`,
    tags: products.resorts[0].features.slice(0, 3),
    rating: "4.8",
    isBest: false,
  },
  {
    category: "Activity",
    title: products.activities[2].name,
    subtitle: products.activities[2].duration,
    image: products.activities[2].image,
    href: `/activity/${products.activities[2].slug}/`,
    tags: products.activities[2].features.slice(0, 3),
    rating: "4.9",
    isBest: true,
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

const reviews = [
  {
    tag: "골프 투어",
    name: "김민준",
    date: "2025년 11월",
    rating: 5,
    text: "막탄 세부에서 처음 골프 투어를 했는데 정말 완벽했습니다. 픽업부터 그린피까지 하나도 신경 쓸 게 없었어요. 직접 다 챙겨줘서 너무 편했습니다.",
  },
  {
    tag: "허니문",
    name: "이수진",
    date: "2025년 12월",
    rating: 5,
    text: "신혼여행으로 세부를 선택했는데, 리조트 업그레이드까지 받아서 정말 만족스러웠어요. 담당자분이 세세하게 챙겨주셔서 다음에 또 오고 싶습니다.",
  },
  {
    tag: "가족 여행",
    name: "박현우",
    date: "2026년 1월",
    rating: 5,
    text: "아이들이랑 왔는데 이슬라 비너스 액티비티가 최고였어요. 안전하게 잘 봐줘서 감사했습니다. 아이들도 너무 좋아해서 기억에 남는 여행이 됐어요.",
  },
  {
    tag: "액티비티",
    name: "최지훈",
    date: "2026년 2월",
    rating: 5,
    text: "오사막에서 샌드보딩 처음 했는데 너무 재미있었어요! 스노클링까지 한 번에 예약해줘서 편했습니다. 일정 짜는 것도 도와줘서 시간 낭비 없이 알차게 즐겼습니다.",
  },
  {
    tag: "리조트",
    name: "정유나",
    date: "2026년 3월",
    rating: 5,
    text: "샹그릴라 리조트 예약을 도와주셨는데 가격도 합리적이고 뷰가 정말 대박이었습니다. 체크인 때도 옆에서 도움 주셔서 아무 걱정 없이 휴가를 즐겼어요.",
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

          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-16 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-12 items-center">
            <div className="space-y-7 animate-[fade-up_0.8s_ease-out_both]">
              <p className="text-gold-500 text-xs tracking-[0.35em] uppercase">Cebu Premium Travel Guide</p>
              <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy-900 font-medium leading-[1.15] sm:leading-[1.1]">
                세부 여행을
                <br />
                하나의 설계로
              </h1>
              <p className="text-navy-600/70 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                골프, 리조트, 관광, 교통까지. 현지 한국인이 운영하는 세부 여행 원스톱 가이드입니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/package/"
                  className="bg-navy-900 text-white px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors hover:bg-navy-800 text-center"
                >
                  패키지 보기
                </Link>
                <Link
                  href="/#cta"
                  className="border border-navy-900/20 text-navy-900 px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors hover:border-gold-500/60 hover:text-gold-500 text-center"
                >
                  빠른 상담
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {services.map((service) => (
                  <div key={service.href} className="rounded-2xl bg-ivory/85 border border-gold-100/60 px-4 py-3 text-center shadow-sm">
                    <p className="text-base sm:text-lg font-semibold text-navy-900">{service.desc}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-navy-600/60">{service.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 relative aspect-[16/10] sm:aspect-[16/9] rounded-[26px] sm:rounded-[30px] overflow-hidden border border-white/70 shadow-xl">
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
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[22px] sm:rounded-[26px] overflow-hidden border border-white/70 shadow-lg">
                  <Image
                    src={products.resorts[1].image}
                    alt="세부 리조트"
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[22px] sm:rounded-[26px] overflow-hidden border border-white/70 shadow-lg">
                  <Image
                    src={products.activities[0].image}
                    alt="세부 액티비티"
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -left-3 -bottom-3 sm:-left-6 sm:-bottom-6 bg-ivory/95 backdrop-blur-md border border-gold-100/70 rounded-2xl px-4 py-3 shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-500">Local Desk</p>
                <p className="text-sm font-medium text-navy-900">현지 한국인 운영 상담</p>
              </div>
              <div className="absolute -right-4 top-8 hidden sm:flex flex-col gap-3">
                <div className="bg-ivory/95 backdrop-blur-md border border-gold-100/70 rounded-2xl px-4 py-3 shadow-lg">
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

        {/* 신뢰 지표 바 */}
        <section className="relative z-10 bg-white border-b border-gold-100/60 py-3 sm:py-4">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-navy-700">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span>⭐</span>
                <span className="font-medium">평균 4.9점</span>
              </span>
              <span className="hidden sm:block text-gold-200">|</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span>👥</span>
                <span className="font-medium">2,400+ 예약 완료</span>
              </span>
              <span className="hidden sm:block text-gold-200">|</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span>✓</span>
                <span className="font-medium">현지 가이드 10년+</span>
              </span>
              <span className="hidden sm:block text-gold-200">|</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span>🏆</span>
                <span className="font-medium">세부 1등 여행사</span>
              </span>
            </div>
          </div>
        </section>

        <section className="relative z-20 max-w-6xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl bg-ivory/90 backdrop-blur border border-gold-100/60 p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-11 h-11 rounded-full bg-gold-100/80 flex items-center justify-center mb-3 text-xl">
                  {service.emoji}
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

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
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
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {collections.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-3xl border border-gold-100/60 bg-ivory/80 shadow-sm min-w-[220px] sm:min-w-0"
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
                  {/* 상단 배지 */}
                  <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                    {item.isBest && (
                      <span className="text-[10px] font-bold tracking-[0.15em] text-navy-900 bg-gold-400 px-2 py-0.5 rounded-full">
                        BEST
                      </span>
                    )}
                    <span className="text-[10px] tracking-wide text-white bg-emerald-600/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                      ✓ 가이드 검증
                    </span>
                  </div>
                  <div className="relative z-10 min-h-[260px] p-5 flex flex-col justify-end">
                    <p className="text-xs uppercase tracking-[0.35em] text-gold-200">Collection</p>
                    <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[12px] text-gold-300 flex items-center gap-1">
                        ⭐ {item.rating}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-gold-200 inline-flex items-center gap-2">
                        Explore <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gold-50/80 border-y border-gold-100/60">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
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
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-6">
              {editorPicks.map((pick) => (
                <Link
                  key={pick.title}
                  href={pick.href}
                  className="group rounded-3xl overflow-hidden border border-gold-100/70 bg-ivory/95 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl min-w-[240px] sm:min-w-[280px] lg:min-w-0"
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
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold-200 bg-navy-900/70 px-3 py-1 rounded-full">
                        {pick.category}
                      </span>
                      {pick.isBest && (
                        <span className="text-[10px] font-bold tracking-[0.15em] text-navy-900 bg-gold-400 px-2 py-1 rounded-full">
                          BEST
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-navy-900">{pick.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-navy-600/60">{pick.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-navy-700 flex items-center gap-1">
                        ⭐ <span className="font-medium">{pick.rating}</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        ✓ 가이드 검증
                      </span>
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

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold-500 mb-3">Reviews</p>
                <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl text-navy-900">
                  고객 후기
                </h2>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-navy-500">실제 여행객 후기</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-6">
              {reviews.map((review) => (
                <div
                  key={review.tag + review.name}
                  className="min-w-[280px] sm:min-w-[300px] lg:min-w-0 rounded-2xl border border-gold-100/60 bg-ivory/90 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-100/80 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">{review.name}</p>
                      <p className="text-[11px] text-navy-600/50 mt-0.5">{review.date}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold-500 bg-gold-50 px-2.5 py-1 rounded-full shrink-0">
                      {review.tag}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gold-200 fill-gold-200" />
                    ))}
                  </div>
                  <p className="text-sm text-navy-800 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-12 items-start">
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
                  <div key={item.title} className="rounded-2xl border border-gold-100/60 bg-ivory/90 p-5">
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
                    <div key={service.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                      <p className="text-lg font-semibold">{service.desc}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">{service.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-16 sm:py-20 bg-ivory/90 border-t border-gold-100/70">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 items-start">
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
                    className="flex items-center gap-3 rounded-2xl border border-gold-100/60 bg-ivory/90 p-4 transition-colors hover:border-gold-500/40"
                  >
                    <MessageCircle className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">KakaoTalk</p>
                      <p className="text-xs text-navy-600/50">실시간 1:1 상담</p>
                    </div>
                  </a>
                  <a
                    href="tel:+639175550123"
                    className="flex items-center gap-3 rounded-2xl border border-gold-100/60 bg-ivory/90 p-4 transition-colors hover:border-gold-500/40"
                  >
                    <Phone className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium">+63 917 555 0123</p>
                      <p className="text-xs text-navy-600/50">전화 상담</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-gold-100/60 bg-ivory/95 p-8 shadow-lg">
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
