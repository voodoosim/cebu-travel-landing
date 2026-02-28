import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const metadata = {
  title: '자주 묻는 질문 - CEBUGUIDE',
  description: '세부 골프, 리조트, 관광 예약에 대한 자주 묻는 질문과 답변.',
};

const faqs = [
  { q: "어떤 서비스를 제공하나요?", a: "골프장 예약, 리조트/호텔 예약, 관광 액티비티 예약, 공항 픽업, 전용 차량, 한국어 통역까지 세부 여행에 필요한 모든 것을 대행합니다." },
  { q: "골프장은 어디를 이용할 수 있나요?", a: "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 전역 6개 골프장을 모두 예약해 드립니다." },
  { q: "리조트 예약도 대행해 주나요?", a: "네, 샹그릴라, 크림슨, 플랜테이션베이, 제이파크, 무벤픽, 래디슨블루 등 세부 주요 리조트 예약을 대행합니다." },
  { q: "세부 여행 최적 시기는 언제인가요?", a: "11월부터 5월까지가 건기로 여행하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다." },
  { q: "예약은 얼마나 전에 해야 하나요?", a: "최소 2주 전 예약을 권장합니다. 성수기(12~3월)에는 한 달 전 예약이 안전합니다." },
  { q: "한국어 통역/가이드가 가능한가요?", a: "네, 현지 한국인 스태프가 상주하고 있으며, 필요 시 전 일정 한국어 가이드 동행이 가능합니다." },
];

export default function FaqPage() {
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
            <Link href="/package/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">패키지</Link>
            <Link href="/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">홈</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 uppercase mb-4">FAQ</p>
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-ivory mb-4">자주 묻는 질문</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-gold-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            궁금한 점이 있으시면 아래를 확인해 주세요.
          </p>
        </div>

        <div className="border-t border-gold-500/10">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-gold-500/10">
              <summary className="flex items-center justify-between cursor-pointer py-6 text-left text-ivory hover:text-gold-400 transition-colors text-[15px]">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-gold-500/30 group-open:rotate-180 transition-transform flex-shrink-0 ml-6" />
              </summary>
              <div className="pb-6 text-gold-200/50 text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gold-200/40 text-sm mb-6">찾는 답변이 없으신가요?</p>
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
