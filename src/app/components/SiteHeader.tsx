import Link from 'next/link';
import { navLinks, type ActivePage } from '@/lib/navigation';
import MobileMenu from './MobileMenu';

export default function SiteHeader({ active }: { active?: ActivePage }) {
  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-lg border-b border-gold-100/70">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="text-xl font-[family-name:var(--font-serif)] font-semibold tracking-wide text-navy-900">
          CEBU<span className="text-gold-500">GUIDE</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10 text-[13px] tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={active === link.key
                ? 'text-gold-500 font-medium'
                : 'text-navy-700 hover:text-gold-500 transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login/" className="text-[13px] tracking-wider text-navy-600 hover:text-gold-500 transition-colors">Sign In</Link>
          <Link href="/#cta" className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-2.5 text-[13px] tracking-wider uppercase transition-all">
            Contact
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
