import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronDown, Phone, MessageCircle, Clock, Flag, ArrowRight } from "lucide-react";
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
    title: "Transfer",
    titleKo: "교통 & 통역",
    description: "공항 픽업, 전용 차량, 한국어 통역. 도착부터 출국까지.",
    href: "#cta",
  },
];

const golfCourses = [
  {
    slug: "alta-vista",
    name: "Alta Vista Golf & Country Club",
    nameKo: "알타비스타 골프 & CC",
    holes: "18홀 / Par 72 / 6,073yd",
    distance: "공항 30~50분",
    type: "산악형",
    designer: "Gary Player 설계",
    features: ["해발 150m 고지대", "세부 해협 파노라마 뷰", "도전적인 업다운 코스"],
    image: "/images/golf-highland.webp",
    badge: "명문",
  },
  {
    slug: "mactan-airbase",
    name: "Mactan Island Golf Club",
    nameKo: "막탄 에어베이스 골프",
    holes: "18홀 / Par 72 / 6,435yd",
    distance: "공항 5~10분",
    type: "평지형",
    features: ["공항에서 가장 가까운 골프장", "도착 당일 라운딩 가능", "산호석 페어웨이"],
    image: "/images/golf-coastal.webp",
    badge: "가성비",
  },
  {
    slug: "cebu-country-club",
    name: "Cebu Country Club",
    nameKo: "세부 컨트리 클럽",
    holes: "18홀 / Par 72 / 6,677yd",
    distance: "공항 25~30분",
    type: "평지형",
    designer: "1928년 개장",
    features: ["필리핀 최고 역사의 골프장", "잘 정비된 페어웨이", "인터클럽 대회 개최지"],
    image: "/images/golf-clubhouse.webp",
    badge: "프라이빗",
  },
  {
    slug: "club-filipino",
    name: "Club Filipino de Cebu",
    nameKo: "클럽 필리피노 드 세부",
    holes: "18홀 / Par 71 / 6,128yd",
    distance: "공항 50분",
    type: "구릉형",
    designer: "1935년 개장",
    features: ["좁은 페어웨이 정확성 코스", "롤링힐스 지형", "세부 북부 드라이브"],
    image: "/images/golf-group.webp",
  },
  {
    slug: "liloan",
    name: "Liloan Golf & Leisure Estate",
    nameKo: "릴로안 골프 & 레저",
    holes: "18홀 / Par 72 / 7,200yd",
    distance: "공항 25분",
    type: "현대형",
    designer: "2017년 개장",
    features: ["세부 최장 7,200야드", "65헥타르 대규모 부지", "골프 아카데미 운영"],
    image: "/images/golf-highland.webp",
    badge: "최장 코스",
  },
  {
    slug: "queens-island",
    name: "Queen's Island Golf & Resort",
    nameKo: "퀸스 아일랜드 골프 리조트",
    holes: "18홀 / Par 72 / 6,835yd",
    distance: "공항 약 2시간",
    type: "리조트형",
    designer: "Paspalum 잔디",
    features: ["48실 리조트 숙박", "태평양 오션 뷰", "숙박+골프 올인원"],
    image: "/images/golf-coastal.webp",
    badge: "리조트",
  },
];

const resorts = [
  { slug: "shangrila", name: "Shangri-La Mactan Resort & Spa", grade: "5성급", area: "막탄", feature: "프라이빗 비치, 스파" },
  { slug: "crimson", name: "Crimson Resort & Spa Mactan", grade: "5성급", area: "막탄", feature: "인피니티 풀, 다이빙" },
  { slug: "plantation-bay", name: "Plantation Bay Resort & Spa", grade: "5성급", area: "막탄", feature: "라군 풀, 가족 친화" },
  { slug: "jpark", name: "Jpark Island Resort & Waterpark", grade: "5성급", area: "막탄", feature: "워터파크, 카지노" },
  { slug: "movenpick", name: "Movenpick Hotel Mactan", grade: "5성급", area: "막탄", feature: "아일랜드 뷰, 초콜릿 아워" },
  { slug: "radisson-blu", name: "Radisson Blu Cebu", grade: "5성급", area: "세부시티", feature: "SM몰 연결, 비즈니스" },
  { slug: "seda-ayala", name: "Seda Ayala Center Cebu", grade: "4성급", area: "세부시티", feature: "아얄라몰 직결, 루프탑 풀" },
  { slug: "bai-hotel", name: "Bai Hotel Cebu", grade: "4성급", area: "만다웨", feature: "세부 최대 규모, 인피니티 풀" },
  { slug: "bluewater", name: "Bluewater Maribago", grade: "4성급", area: "막탄", feature: "프라이빗 비치, 가족 리조트" },
];

const activities = [
  { slug: "island-hopping", name: "아일랜드 호핑", description: "나루수안, 판다논, 힐루뚱안 섬 투어. 스노클링 포함." },
  { slug: "whale-shark", name: "고래상어 투어", description: "오슬롭 고래상어 스노클링. 세부 남부 당일치기." },
  { slug: "kawasan-falls", name: "카와산 폭포", description: "캐녀닝 + 폭포 점프. 세부 최고 인기 액티비티." },
  { slug: "diving", name: "다이빙 & 스노클링", description: "모알보알 정어리런, 거북이 포인트. 체험/자격증." },
  { slug: "city-tour", name: "세부 시티투어", description: "마젤란 십자가, 산페드로 요새, 탑스 전망대." },
  { slug: "bohol-tour", name: "보홀 당일투어", description: "초콜릿힐, 안경원숭이, 로복강 크루즈." },
];

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

const faqs = [
  { q: "어떤 서비스를 제공하나요?", a: "골프장 예약, 리조트/호텔 예약, 관광 액티비티 예약, 공항 픽업, 전용 차량, 한국어 통역까지 세부 여행에 필요한 모든 것을 대행합니다." },
  { q: "골프장은 어디를 이용할 수 있나요?", a: "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 전역 6개 골프장을 모두 예약해 드립니다." },
  { q: "리조트 예약도 대행해 주나요?", a: "네, 샹그릴라, 크림슨, 플랜테이션베이, 제이파크, 무벤픽, 래디슨블루 등 세부 주요 리조트 예약을 대행합니다." },
  { q: "세부 여행 최적 시기는 언제인가요?", a: "11월부터 5월까지가 건기로 여행하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다." },
  { q: "예약은 얼마나 전에 해야 하나요?", a: "최소 2주 전 예약을 권장합니다. 성수기(12~3월)에는 한 달 전 예약이 안전합니다." },
  { q: "한국어 통역/가이드가 가능한가요?", a: "네, 현지 한국인 스태프가 상주하고 있으며, 필요 시 전 일정 한국어 가이드 동행이 가능합니다." },
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
            <Link href="#packages" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">패키지</Link>
            <Link href="#faq" className="text-[13px] tracking-widest text-navy-700 hover:text-gold-500 transition-colors">FAQ</Link>
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
              alt="세부 리조트 전경"
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

        {/* Golf Courses */}
        <section id="courses" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Golf Courses</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">세부 골프장</h2>
              <div className="line-gold mx-auto mt-6 mb-6" />
              <p className="text-navy-600/60 max-w-lg mx-auto">
                세부 전역 6개 명문 골프장, 예약부터 차량까지 전부 대행
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {golfCourses.map((course) => (
                <Link key={course.slug} href={`/golf/${course.slug}/`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-5">
                    <Image
                      src={course.image}
                      alt={course.nameKo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors duration-300" />
                    {course.badge && (
                      <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-sm text-gold-300 px-3 py-1 text-[11px] tracking-wider uppercase">
                        {course.badge}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-1">{course.nameKo}</h3>
                    <p className="text-navy-600/40 text-xs mb-3">{course.name}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-navy-600/50 mb-3">
                      <span className="flex items-center gap-1"><Flag className="w-3 h-3" />{course.holes}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.distance}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{course.type}</span>
                    </div>
                    {course.designer && (
                      <p className="text-gold-500 text-xs mb-3">{course.designer}</p>
                    )}
                    <ul className="space-y-1">
                      {course.features.map((f) => (
                        <li key={f} className="text-sm text-navy-600/60 flex items-start gap-2">
                          <span className="text-gold-400 mt-0.5">-</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="#cta" className="inline-block border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-10 py-3 text-[13px] tracking-widest uppercase transition-all duration-300">
                예약 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Resorts */}
        <section id="resorts" className="py-32 bg-navy-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">Resorts & Hotels</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl mb-4">리조트 & 호텔</h2>
              <div className="line-gold mx-auto mt-6 mb-6" />
              <p className="text-white/40 max-w-lg mx-auto">
                세부 최고의 리조트와 호텔 예약 대행
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {resorts.map((r) => (
                <Link key={r.slug} href={`/resort/${r.slug}/`} className="bg-navy-900 p-8 hover:bg-navy-800 transition-colors duration-300 block">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gold-400 text-[11px] tracking-wider">{r.grade}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/40 text-[11px] tracking-wider">{r.area}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-base text-white mb-2">{r.name}</h3>
                  <p className="text-white/40 text-sm">{r.feature}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="#cta" className="inline-block border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-900 px-10 py-3 text-[13px] tracking-widest uppercase transition-all duration-300">
                리조트 예약 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section id="activities" className="py-32 bg-ivory">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Activities</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">관광 & 액티비티</h2>
              <div className="line-gold mx-auto mt-6 mb-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((a) => (
                <Link key={a.slug} href={`/activity/${a.slug}/`} className="border-b border-navy-900/10 pb-8 block group">
                  <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">{a.name}</h3>
                  <p className="text-navy-600/50 text-sm leading-relaxed">{a.description}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="#cta" className="inline-block border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-10 py-3 text-[13px] tracking-widest uppercase transition-all duration-300">
                액티비티 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">Packages</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">맞춤 패키지</h2>
              <div className="line-gold mx-auto mt-6 mb-6" />
              <p className="text-navy-600/60 max-w-lg mx-auto">
                골프, 리조트, 관광을 원하는 대로 조합
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.title} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-navy-900/30" />
                    {pkg.badge && (
                      <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[11px] tracking-wider uppercase font-medium">
                        {pkg.badge}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-gold-300 text-xs tracking-wider">{pkg.courses}</p>
                    </div>
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl text-navy-900 mb-2">{pkg.title}</h3>
                  <p className="text-navy-600/50 text-sm mb-4 leading-relaxed">{pkg.description}</p>
                  <div className="border-t border-navy-900/10 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item) => (
                        <span key={item} className="text-[11px] tracking-wider text-navy-600/40 border border-navy-900/10 px-2.5 py-1">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-32 bg-ivory">
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

        {/* FAQ */}
        <section id="faq" className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">FAQ</p>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl text-navy-900 mb-4">자주 묻는 질문</h2>
              <div className="line-gold mx-auto mt-6" />
            </div>

            <div className="space-y-0 border-t border-navy-900/10">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-b border-navy-900/10">
                  <summary className="flex items-center justify-between cursor-pointer py-6 text-left text-navy-900 hover:text-gold-500 transition-colors text-[15px]">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-navy-600/30 group-open:rotate-180 transition-transform flex-shrink-0 ml-6" />
                  </summary>
                  <div className="pb-6 text-navy-600/60 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </details>
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
                <li>Alta Vista Golf & CC</li>
                <li>Mactan Airbase Golf</li>
                <li>Cebu Country Club</li>
                <li>Club Filipino de Cebu</li>
                <li>Liloan Golf & Leisure</li>
                <li>Queen&apos;s Island Golf</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/golf/" className="hover:text-gold-400 transition-colors">골프 예약</Link></li>
                <li><Link href="/resort/" className="hover:text-gold-400 transition-colors">리조트 예약</Link></li>
                <li><Link href="/activity/" className="hover:text-gold-400 transition-colors">관광 액티비티</Link></li>
                <li><Link href="#packages" className="hover:text-gold-400 transition-colors">맞춤 패키지</Link></li>
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
