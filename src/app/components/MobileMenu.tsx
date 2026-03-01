"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-navy-700"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-ivory/96 backdrop-blur-sm border-b border-gold-100/70 z-50">
          <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={close}
                className="px-2 py-3.5 text-xs font-medium tracking-[0.2em] text-navy-700 hover:text-gold-500 border-b border-navy-900/5 last:border-b-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login/"
              onClick={close}
              className="px-2 py-3.5 text-xs font-medium tracking-[0.2em] text-navy-600 hover:text-gold-500 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/#cta"
              onClick={close}
              className="mt-4 bg-navy-900 text-white text-center px-4 py-3 text-xs font-medium tracking-[0.2em] hover:bg-navy-800 transition-colors"
            >
              INQUIRE NOW
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
