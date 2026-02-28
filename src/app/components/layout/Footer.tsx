import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <Globe className="w-6 h-6 text-emerald-500" />
              <span>세부가이드</span>
            </Link>
            <p className="text-sm leading-relaxed">
              세부 현지 한국인 운영. 골프, 리조트, 관광, 교통 &mdash; 세부 여행 토탈 솔루션.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">서비스</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/golf" className="hover:text-emerald-500 transition-colors">골프 예약</Link>
              </li>
              <li>
                <Link href="/resort" className="hover:text-emerald-500 transition-colors">리조트 예약</Link>
              </li>
              <li>
                <Link href="/activity" className="hover:text-emerald-500 transition-colors">관광 액티비티</Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-emerald-500 transition-colors">맞춤 패키지</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">빠른링크</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-500 transition-colors">홈</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-500 transition-colors">자주 묻는 질문</Link>
              </li>
              <li>
                <Link href="/#cta" className="hover:text-emerald-500 transition-colors">무료 상담</Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-emerald-500 transition-colors">로그인</Link>
              </li>
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
  );
}
