import Link from 'next/link';
import { Globe } from 'lucide-react';
import UserMenu from '@/app/components/layout/UserMenu';
import MobileMenu from '@/app/components/MobileMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
          <Globe className="w-7 h-7" />
          <span>세부가이드</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex gap-8">
          <Link href="/golf" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
            골프장
          </Link>
          <Link href="/resort" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
            리조트
          </Link>
          <Link href="/activity" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
            액티비티
          </Link>
          <Link href="/packages" className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
            패키지
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#cta"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg"
          >
            무료 상담
          </Link>
          <UserMenu />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
