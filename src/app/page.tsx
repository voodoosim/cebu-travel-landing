import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronDown, Phone, MessageCircle, Clock, Flag, Palmtree, Hotel, Car, Globe } from "lucide-react";
import MobileMenu from "./components/MobileMenu";
import ExchangeRate from "./components/ExchangeRate";
import BookingForm from "./components/BookingForm";
import UserMenu from "./components/layout/UserMenu";
import { prisma } from "@/lib/db";

const services = [
  {
    icon: Flag,
    title: "골프 예약",
    description: "세부 전역 6개 명문 골프장 예약 대행. 그린피, 캐디, 카트 올인원 패키지.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Hotel,
    title: "리조트 & 호텔",
    description: "샹그릴라, 크림슨, 플랜테이션베이 등 세부 인기 리조트 예약 대행.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Palmtree,
    title: "관광 & 액티비티",
    description: "아일랜드 호핑, 고래상어 투어, 카와산 폭포, 다이빙, 시티투어.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Car,
    title: "교통 & 통역",
    description: "공항 픽업, 전용 차량, 한국어 통역. 도착부터 출국까지 케어.",
    color: "bg-rose-100 text-rose-700",
  },
];


const packages = [
  {
    title: "골프 패키지",
    description: "세부 명문 골프장 3~4곳 라운딩 + 호텔 + 공항 픽업 + 전용 차량. 원하는 골프장 조합 가능.",
    courses: "3박4일 ~ 4박5일",
    badge: "인기",
    badgeColor: "bg-white/90 text-emerald-700",
    image: "/images/golf-highland.webp",
    includes: ["그린피", "카트/캐디", "호텔 숙박", "공항 픽업", "전용 차량"],
  },
  {
    title: "골프 + 관광 패키지",
    description: "골프 라운딩과 세부 관광을 함께. 아일랜드 호핑, 시티투어 등 액티비티 포함.",
    courses: "4박5일 ~ 5박6일",
    image: "/images/golf-coastal.webp",
    includes: ["골프 2~3회", "액티비티 2회", "리조트 숙박", "전용 차량", "한국어 가이드"],
  },
  {
    title: "리조트 풀패키지",
    description: "골프 + 리조트 + 관광 올인원. 세부의 모든 것을 한번에 즐기는 프리미엄 패키지.",
    courses: "5박6일 ~",
    badge: "프리미엄",
    badgeColor: "bg-amber-500 text-white",
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
  {
    q: "어떤 서비스를 제공하나요?",
    a: "골프장 예약, 리조트/호텔 예약, 관광 액티비티 예약, 공항 픽업, 전용 차량, 한국어 통역까지 세부 여행에 필요한 모든 것을 대행합니다. 원하시는 조합으로 맞춤 패키지 구성이 가능합니다.",
  },
  {
    q: "골프장은 어디를 이용할 수 있나요?",
    a: "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 전역 6개 골프장을 모두 예약해 드립니다.",
  },
  {
    q: "리조트 예약도 대행해 주나요?",
    a: "네, 샹그릴라, 크림슨, 플랜테이션베이, 제이파크, 무벤픽, 래디슨블루 등 세부 주요 리조트 예약을 대행합니다. 골프 패키지와 묶으면 더 좋은 조건으로 안내 가능합니다.",
  },
  {
    q: "세부 여행 최적 시기는 언제인가요?",
    a: "11월부터 5월까지가 건기로 여행하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다.",
  },
  {
    q: "예약은 얼마나 전에 해야 하나요?",
    a: "최소 2주 전 예약을 권장합니다. 성수기(12~3월)에는 한 달 전 예약이 안전합니다. 카카오톡이나 텔레그램으로 실시간 상담 가능합니다.",
  },
  {
    q: "한국어 통역/가이드가 가능한가요?",
    a: "네, 현지 한국인 스태프가 상주하고 있으며, 필요 시 전 일정 한국어 가이드 동행이 가능합니다. 공항 도착부터 출국까지 케어합니다.",
  },
];

export default async function Home() {
  const [golfCourses, resorts, activities] = await Promise.all([
    prisma.golfCourse.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.resort.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.activity.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
            <Globe className="w-7 h-7" />
            <span>세부가이드</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-emerald-600 transition-colors">서비스</Link>
            <Link href="#courses" className="text-sm font-medium hover:text-emerald-600 transition-colors">골프장</Link>
            <Link href="#resorts" className="text-sm font-medium hover:text-emerald-600 transition-colors">리조트</Link>
            <Link href="#activities" className="text-sm font-medium hover:text-emerald-600 transition-colors">액티비티</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-emerald-600 transition-colors">FAQ</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#cta" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
              무료 상담
            </Link>
            <UserMenu />
          </div>
          <MobileMenu />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900">
              <Image
                src="/images/hero-golf.webp"
                alt="세부 리조트 전경"
                fill
                className="object-cover opacity-60 mix-blend-overlay"
                priority
              />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
              세부 No.1 통합 가이드
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
              세부의 모든 것<br />
              <span className="text-emerald-300">한번에 해결</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-10 drop-shadow-md">
              골프, 리조트, 관광, 교통까지 — 세부 여행 토탈 솔루션
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center">
                서비스 보기
              </Link>
              <Link href="#cta" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 text-center">
                무료 상담
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 bg-white shadow-sm relative z-20 -mt-10 container mx-auto rounded-xl max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <p className="text-4xl font-bold text-emerald-600">{golfCourses.length}</p>
              <p className="text-slate-500 text-sm mt-1">제휴 골프장</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">{resorts.length}</p>
              <p className="text-slate-500 text-sm mt-1">제휴 리조트</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">{activities.length}+</p>
              <p className="text-slate-500 text-sm mt-1">액티비티</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">24/7</p>
              <p className="text-slate-500 text-sm mt-1">한국어 상담</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Services</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">통합 서비스</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 여행에 필요한 모든 것을 대행합니다. 골프, 리조트, 관광, 교통까지 원스톱.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-center">
                  <div className={`inline-flex p-4 rounded-2xl mb-5 ${s.color}`}>
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Golf Courses */}
        <section id="courses" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Golf Courses</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">세부 골프장</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 전역 6개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {golfCourses.map((course) => {
                const images = (course.images as string[]) || [];
                const features = (course.features as string[]) || [];
                const image = images[0] || '/images/golf-highland.webp';
                const holesStr = `${course.holes}홀 / Par ${course.par}${course.yards ? ` / ${course.yards.toLocaleString()}yd` : ''}`;
                return (
                  <div key={course.id} className="group bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={image}
                        alt={course.nameKo}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {course.badge && (
                        <div className={`absolute top-3 right-3 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm ${course.badgeColor}`}>
                          {course.badge}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-bold text-lg">{course.nameKo}</p>
                        <p className="text-white/80 text-xs">{course.name}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Flag className="w-3.5 h-3.5" />
                          {holesStr}
                        </span>
                        {course.distance && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {course.distance}
                          </span>
                        )}
                        {course.courseType && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {course.courseType}
                          </span>
                        )}
                      </div>
                      {course.designer && (
                        <p className="text-emerald-600 text-sm font-medium mb-3">{course.designer}</p>
                      )}
                      <ul className="space-y-1.5 mb-5">
                        {features.map((f) => (
                          <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">-</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/golf/${course.slug}`} className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resorts */}
        <section id="resorts" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Resorts & Hotels</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">리조트 & 호텔</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {resorts.map((r) => (
                <Link key={r.id} href={`/resort/${r.slug}`} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{r.name}</h4>
                    {r.grade && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">{r.grade}</span>}
                  </div>
                  {r.area && <p className="text-xs text-slate-400 mb-2">{r.area}</p>}
                  {r.feature && <p className="text-sm text-slate-600">{r.feature}</p>}
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="#cta" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md">
                리조트 예약 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section id="activities" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Activities</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">관광 & 액티비티</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {activities.map((a) => (
                <Link key={a.id} href={`/activity/${a.slug}`} className="bg-slate-50 rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all">
                  {a.icon && <span className="text-3xl mb-3 block">{a.icon}</span>}
                  <h4 className="font-bold text-slate-900 mb-2">{a.name}</h4>
                  {a.description && <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>}
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="#cta" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md">
                액티비티 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="py-24 bg-emerald-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-300 font-semibold tracking-wide uppercase text-sm mb-3">Packages</h2>
              <h3 className="text-4xl font-bold mb-4">맞춤 패키지</h3>
              <p className="text-emerald-100 max-w-2xl mx-auto">
                골프, 리조트, 관광을 원하는 대로 조합. 예산과 일정에 맞춘 맞춤 패키지.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.title} className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                    />
                    {pkg.badge && (
                      <div className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <p className="text-emerald-300 text-sm font-semibold mb-2">{pkg.courses}</p>
                    <h4 className="text-xl font-bold mb-2">{pkg.title}</h4>
                    <p className="text-emerald-100/80 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-xs text-emerald-300/60 mb-2">포함사항</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.includes.map((item) => (
                          <span key={item} className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">{item}</span>
                        ))}
                      </div>
                    </div>
                    <Link href="#cta" className="mt-6 block text-center bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-semibold transition-colors">
                      문의하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Reviews</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">고객 후기</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">FAQ</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">자주 묻는 질문</h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 bg-emerald-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="https://open.kakao.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-5 rounded-2xl font-bold transition-colors shadow-md">
                <MessageCircle className="w-8 h-8" />
                <div>
                  <p className="text-lg">카카오톡 상담</p>
                  <p className="text-sm font-normal opacity-80">실시간 1:1 상담</p>
                </div>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-sky-500 hover:bg-sky-600 text-white p-5 rounded-2xl font-bold transition-colors shadow-md">
                <MessageCircle className="w-8 h-8" />
                <div>
                  <p className="text-lg">텔레그램 상담</p>
                  <p className="text-sm font-normal opacity-80">빠른 응답</p>
                </div>
              </a>
              <a href="tel:+639123456789" className="flex items-center gap-4 bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl font-bold transition-colors shadow-md">
                <Phone className="w-8 h-8" />
                <div>
                  <p className="text-lg">전화 문의</p>
                  <p className="text-sm font-normal opacity-80">+63 912 345 6789</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  세부 여행,<br />지금 문의하세요
                </h2>
                <p className="text-slate-600 mb-8">
                  골프, 리조트, 관광 — 원하시는 조합을 알려주시면 최적의 패키지를 안내합니다.
                </p>
                <ExchangeRate />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">무료 상담</h3>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <Globe className="w-6 h-6 text-emerald-500" />
                <span>세부가이드</span>
              </Link>
              <p className="text-sm leading-relaxed">
                세부 현지 한국인 운영. 골프, 리조트, 관광, 교통 — 세부 여행 토탈 솔루션.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">골프장</h4>
              <ul className="space-y-3 text-sm">
                <li>Alta Vista Golf & CC</li>
                <li>Mactan Airbase Golf</li>
                <li>Cebu Country Club</li>
                <li>Club Filipino de Cebu</li>
                <li>Liloan Golf & Leisure</li>
                <li>Queen&apos;s Island Golf & Resort</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">서비스</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#courses" className="hover:text-emerald-500 transition-colors">골프 예약</Link></li>
                <li><Link href="#resorts" className="hover:text-emerald-500 transition-colors">리조트 예약</Link></li>
                <li><Link href="#activities" className="hover:text-emerald-500 transition-colors">관광 액티비티</Link></li>
                <li><Link href="#packages" className="hover:text-emerald-500 transition-colors">맞춤 패키지</Link></li>
                <li><Link href="#faq" className="hover:text-emerald-500 transition-colors">자주 묻는 질문</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">연락처</h4>
              <ul className="space-y-3 text-sm">
                <li>카카오톡: 세부가이드</li>
                <li>텔레그램: @cebu_guide</li>
                <li>+63 912 345 6789</li>
                <li>Cebu City, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} 세부가이드. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
