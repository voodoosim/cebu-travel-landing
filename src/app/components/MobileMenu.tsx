"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/golf/", label: "골프" },
  { href: "/resort/", label: "리조트" },
  { href: "/activity/", label: "액티비티" },
  { href: "/package/", label: "패키지" },
  { href: "#faq", label: "FAQ" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gold-300"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-navy-900/98 backdrop-blur-sm border-b border-gold-500/20 z-50">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3.5 text-xs font-medium tracking-[0.2em] text-gold-200/70 hover:text-gold-300 border-b border-gold-500/10 last:border-b-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-4 border border-gold-500 text-gold-400 text-center px-4 py-3 text-xs font-medium tracking-[0.2em] hover:bg-gold-500 hover:text-navy-900 transition-all"
            >
              INQUIRE NOW
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
