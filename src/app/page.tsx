import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronDown, Phone, MessageCircle, Clock, Flag } from "lucide-react";
import MobileMenu from "./components/MobileMenu";
import ExchangeRate from "./components/ExchangeRate";
import BookingForm from "./components/BookingForm";

const golfCourses = [
  {
    name: "Alta Vista Golf & Country Club",
    nameKo: "알타비스타 골프 & CC",
    location: "Pardo Hills, Cebu City",
    holes: "18홀 / Par 72 / 6,073yd",
    distance: "공항 30~50분",
    type: "산악형",
    designer: "Gary Player 설계",
    features: ["해발 150m 고지대", "세부 해협 파노라마 뷰", "도전적인 업다운 코스"],
    image: "/images/golf-highland.webp",
    badge: "명문",
    badgeColor: "bg-emerald-600 text-white",
  },
  {
    name: "Mactan Island Golf Club",
    nameKo: "막탄 에어베이스 골프",
    location: "Lapu-Lapu City",
    holes: "18홀 / Par 72 / 6,435yd",
    distance: "공항 5~10분",
    type: "평지형",
    designer: "",
    features: ["공항에서 가장 가까운 골프장", "도착 당일 라운딩 가능", "산호석 페어웨이"],
    image: "/images/golf-coastal.webp",
    badge: "가성비",
    badgeColor: "bg-sky-500 text-white",
  },
  {
    name: "Cebu Country Club",
    nameKo: "세부 컨트리 클럽",
    location: "Banilad, Cebu City",
    holes: "18홀 / Par 72 / 6,677yd",
    distance: "공항 25~30분",
    type: "평지형",
    designer: "1928년 개장",
    features: ["필리핀 최고 역사의 골프장", "잘 정비된 페어웨이", "인터클럽 대회 정기 개최지"],
    image: "/images/golf-clubhouse.webp",
    badge: "프라이빗",
    badgeColor: "bg-amber-600 text-white",
  },
  {
    name: "Club Filipino de Cebu",
    nameKo: "클럽 필리피노 드 세부",
    location: "Danao City, Cebu",
    holes: "18홀 / Par 71 / 6,128yd",
    distance: "공항 50분",
    type: "구릉형",
    designer: "1935년 개장",
    features: ["좁은 페어웨이 정확성 코스", "롤링힐스 지형", "세부 북부 드라이브 코스"],
    image: "/images/golf-group.webp",
    badge: "",
    badgeColor: "",
  },
  {
    name: "Liloan Golf & Leisure Estate",
    nameKo: "릴로안 골프 & 레저",
    location: "Liloan, Cebu",
    holes: "18홀 / Par 72 / 7,200yd",
    distance: "공항 25분",
    type: "현대형",
    designer: "2017년 개장",
    features: ["세부 최장 7,200야드", "65헥타르 대규모 부지", "골프 아카데미 운영"],
    image: "/images/golf-highland.webp",
    badge: "최장 코스",
    badgeColor: "bg-violet-600 text-white",
  },
  {
    name: "Queen's Island Golf & Resort",
    nameKo: "퀸스 아일랜드 골프 리조트",
    location: "Medellin, Northern Cebu",
    holes: "18홀 / Par 72 / 6,835yd",
    distance: "공항 약 2시간",
    type: "리조트형",
    designer: "Paspalum 잔디",
    features: ["48실 리조트 숙박", "태평양 오션 뷰", "숙박+골프 올인원"],
    image: "/images/golf-coastal.webp",
    badge: "리조트",
    badgeColor: "bg-rose-500 text-white",
  },
];

const packages = [
  {
    title: "시티 코스 패키지",
    description: "세부 시내 접근성 좋은 3개 명문 코스를 3일간 라운딩. 알타비스타, 에어베이스, 세부CC 조합.",
    courses: "3박4일 / 54홀 (18홀 x 3일)",
    badge: "인기",
    badgeColor: "bg-white/90 text-emerald-700",
    image: "/images/golf-highland.webp",
    includes: ["그린피", "카트", "캐디", "호텔 3박 (조식)", "골프장 왕복 차량"],
  },
  {
    title: "풀코스 패키지",
    description: "시내 코스 + 북부 코스까지 4일 라운딩. 다양한 코스 경험과 여유로운 일정.",
    courses: "4박5일 / 72홀 (18홀 x 4일)",
    image: "/images/golf-coastal.webp",
    includes: ["그린피", "카트", "캐디", "호텔 4박 (조식)", "공항 픽업", "전용 차량"],
  },
  {
    title: "리조트 패키지",
    description: "퀸스 아일랜드 리조트에서 숙박과 라운딩을 동시에. 태평양 뷰와 함께하는 프리미엄 골프.",
    courses: "3박4일 / 54홀 (리조트 내)",
    badge: "프리미엄",
    badgeColor: "bg-amber-500 text-white",
    image: "/images/golf-clubhouse.webp",
    includes: ["리조트 숙박", "그린피 포함", "공항 픽업", "전용 차량", "석식 포함"],
  },
];

const testimonials = [
  {
    name: "김정호",
    location: "서울",
    rating: 5,
    text: "알타비스타에서의 라운딩은 정말 최고였습니다. 해발 150m에서 내려다보는 경치가 환상적이고, 캐디도 친절해요. 다음에도 꼭 올 겁니다.",
  },
  {
    name: "박성민",
    location: "부산",
    rating: 5,
    text: "3박4일 시티 코스 패키지로 다녀왔는데, 픽업부터 라운딩까지 모든 게 완벽하게 준비되어 있었습니다. 한국어 상담이 가능해서 편했어요.",
  },
  {
    name: "이준혁",
    location: "대구",
    rating: 5,
    text: "에어베이스 골프장이 공항에서 5분 거리라 도착 당일 바로 라운딩했습니다. 퀸스 아일랜드 리조트 패키지도 강력 추천합니다.",
  },
];

const faqs = [
  {
    q: "어떤 골프장을 이용할 수 있나요?",
    a: "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 주요 골프장 6곳을 모두 이용하실 수 있습니다. 원하시는 골프장 조합으로 맞춤 패키지 구성이 가능합니다.",
  },
  {
    q: "캐디팁은 얼마를 주나요?",
    a: "캐디팁은 1인당 300~500페소가 일반적입니다. 기사팁은 팀당 300~500페소입니다. 팁은 패키지 가격에 포함되지 않습니다.",
  },
  {
    q: "세부 골프 여행 최적 시기는 언제인가요?",
    a: "11월부터 5월까지가 건기로 골프하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다.",
  },
  {
    q: "예약은 얼마나 전에 해야 하나요?",
    a: "최소 2주 전 예약을 권장합니다. 성수기(12~3월)에는 한 달 전 예약이 안전합니다. 카카오톡이나 텔레그램으로 실시간 상담 가능합니다.",
  },
  {
    q: "패키지에 포함되는 항목은 무엇인가요?",
    a: "기본 패키지 기준 그린피, 카트피, 캐디피, 호텔 숙박(조식 포함), 호텔-골프장 왕복 차량이 포함됩니다. 항공권, 캐디팁, 기사팁, 여행자보험은 불포함입니다.",
  },
  {
    q: "도착 당일 라운딩이 가능한가요?",
    a: "네, 막탄 에어베이스 골프장은 공항에서 차량 5~10분 거리라 도착 당일 라운딩이 가능합니다. 사전 예약 시 공항 픽업 후 바로 골프장으로 이동합니다.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
            <span>&#9971;</span>
            <span>세부골프투어</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex gap-8">
            <Link href="#courses" className="text-sm font-medium hover:text-emerald-600 transition-colors">골프장</Link>
            <Link href="#packages" className="text-sm font-medium hover:text-emerald-600 transition-colors">패키지</Link>
            <Link href="#about" className="text-sm font-medium hover:text-emerald-600 transition-colors">소개</Link>
            <Link href="#reviews" className="text-sm font-medium hover:text-emerald-600 transition-colors">후기</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-emerald-600 transition-colors">FAQ</Link>
          </nav>
          <Link href="#cta" className="hidden md:inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            예약 문의
          </Link>
          <MobileMenu />
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900">
              <Image
                src="/images/hero-golf.webp"
                alt="세부 골프장 전경"
                fill
                className="object-cover opacity-60 mix-blend-overlay"
                priority
              />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6">
              세부 No.1 골프 투어
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
              세부 골프장 6곳<br />
              <span className="text-emerald-300">한번에 즐기세요</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-10 drop-shadow-md">
              알타비스타부터 퀸스 아일랜드까지 — 세부 전체 골프장 맞춤 패키지
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#courses" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center">
                골프장 보기
              </Link>
              <Link href="#cta" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:-translate-y-1 text-center">
                상담 문의
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 bg-white shadow-sm relative z-20 -mt-10 container mx-auto rounded-xl max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <div>
              <p className="text-4xl font-bold text-emerald-600">6</p>
              <p className="text-slate-500 text-sm mt-1">제휴 골프장</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">3,000+</p>
              <p className="text-slate-500 text-sm mt-1">라운딩 실적</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">4.9</p>
              <p className="text-slate-500 text-sm mt-1">고객 만족도</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">24/7</p>
              <p className="text-slate-500 text-sm mt-1">한국어 상담</p>
            </div>
          </div>
        </section>

        {/* Golf Courses */}
        <section id="courses" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Golf Courses</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">세부 골프장</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 전역의 명문 골프장 6곳. 산악, 평지, 리조트형까지 다양한 코스를 경험하세요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {golfCourses.map((course) => (
                <div key={course.name} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={course.image}
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
                        {course.holes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {course.type}
                      </span>
                    </div>
                    {course.designer && (
                      <p className="text-emerald-600 text-sm font-medium mb-3">{course.designer}</p>
                    )}
                    <ul className="space-y-1.5 mb-5">
                      {course.features.map((f) => (
                        <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">-</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="#cta" className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                      문의하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Golf Packages */}
        <section id="packages" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Packages</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">투어 패키지</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                원하시는 골프장 조합으로 맞춤 패키지 구성 가능. 그린피부터 숙소, 차량까지 올인원.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.title} className="group bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {pkg.badge && (
                      <div className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm ${pkg.badgeColor}`}>
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <p className="text-emerald-600 text-sm font-semibold mb-2">{pkg.courses}</p>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{pkg.title}</h4>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-xs text-slate-400 mb-2">포함사항</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.includes.map((item) => (
                          <span key={item} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{item}</span>
                        ))}
                      </div>
                    </div>
                    <Link href="#cta" className="mt-6 block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-colors">
                      문의하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Why Choose Us */}
        <section id="about" className="py-24 bg-emerald-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-emerald-300 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
                <h3 className="text-4xl font-bold mb-6">왜 저희를<br />선택하세요?</h3>
                <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
                  세부 전역 6개 골프장과 제휴. 공항 픽업부터 골프장 이동, 숙소까지 모든 일정을 관리합니다. 현지 경험이 풍부한 한국인 스태프가 직접 케어합니다.
                </p>
                <ul className="space-y-4">
                  {[
                    "세부 전체 6개 골프장 제휴",
                    "한국인 현지 스태프 상주",
                    "공항 픽업 & 골프장 전용 차량",
                    "원하는 골프장 조합 맞춤 패키지"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-1 rounded-full">
                        <MapPin className="w-5 h-5 text-emerald-300" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="/images/golf-group.webp"
                    alt="골프 라운딩"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-2xl transform translate-y-8 object-cover"
                  />
                  <Image
                    src="/images/golf-clubhouse.webp"
                    alt="골프 클럽하우스"
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-2xl transform -translate-y-8 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Reviews</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-4">고객 후기</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 골프 투어를 다녀오신 분들의 생생한 후기입니다.
              </p>
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
              <p className="text-slate-600 max-w-2xl mx-auto">
                세부 골프 여행 전 궁금한 점을 확인하세요.
              </p>
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

        {/* CTA Section */}
        <section id="cta" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  세부 골프 여행,<br />지금 문의하세요
                </h2>
                <p className="text-slate-600 mb-8">
                  원하시는 골프장, 날짜, 인원을 알려주시면 최적의 패키지를 안내해 드립니다.
                </p>
                <ExchangeRate />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">예약 문의</h3>
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
                <span className="text-emerald-500">&#9971;</span>
                <span>세부골프투어</span>
              </Link>
              <p className="text-sm leading-relaxed">
                세부 현지 한국인 운영 골프 투어 전문. 세부 전역 6개 명문 골프장 맞춤 패키지.
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
              <h4 className="text-white font-bold mb-6">안내</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#courses" className="hover:text-emerald-500 transition-colors">골프장 소개</Link></li>
                <li><Link href="#packages" className="hover:text-emerald-500 transition-colors">투어 패키지</Link></li>
                <li><Link href="#faq" className="hover:text-emerald-500 transition-colors">자주 묻는 질문</Link></li>
                <li><Link href="#reviews" className="hover:text-emerald-500 transition-colors">고객 후기</Link></li>
                <li><Link href="#cta" className="hover:text-emerald-500 transition-colors">예약 문의</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">연락처</h4>
              <ul className="space-y-3 text-sm">
                <li>카카오톡: 세부골프투어</li>
                <li>텔레그램: @cebu_golf</li>
                <li>+63 912 345 6789</li>
                <li>Cebu City, Philippines</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} 세부골프투어. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
