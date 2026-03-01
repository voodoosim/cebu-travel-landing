'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';

const FALLBACK_RATE = { amount: 10000, php: 420 };

type RateState = {
  amount: number;
  php: number;
  updatedAt?: string | null;
  error?: boolean;
};

export default function FloatingRemote() {
  const [rates, setRates] = useState<RateState>({
    amount: FALLBACK_RATE.amount,
    php: FALLBACK_RATE.php,
    updatedAt: null,
  });
  const [expanded, setExpanded] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadRates = async () => {
      try {
        const res = await fetch('/api/rates', { signal: controller.signal });
        if (!res.ok) {
          throw new Error('Failed to fetch rates');
        }
        const data = await res.json();
        setRates({
          amount: data?.KRW?.amount ?? FALLBACK_RATE.amount,
          php: data?.KRW?.php ?? FALLBACK_RATE.php,
          updatedAt: data?.updated_at ?? null,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setRates((prev) => ({ ...prev, error: true }));
      }
    };

    loadRates();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 640px)').matches;
    setExpanded(!isSmall);

    const handleScroll = () => setShowTop(window.scrollY > 240);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updatedLabel = useMemo(() => {
    if (!rates.updatedAt) return '업데이트 준비중';
    try {
      return `${new Date(rates.updatedAt).toLocaleDateString('ko-KR')} 기준`;
    } catch {
      return '업데이트 준비중';
    }
  }, [rates.updatedAt]);

  return (
    <div className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3">
      <div className="rounded-2xl border border-navy-900/10 bg-white/90 backdrop-blur-lg shadow-lg px-4 py-3 w-[220px] sm:w-[240px]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500">Exchange</p>
        <div className="flex items-baseline justify-between mt-2">
          <div>
            <p className="text-[11px] text-navy-600/60">KRW 10,000</p>
            <p className="text-lg font-semibold text-navy-900">{rates.amount.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-navy-600/60">PHP</p>
            <p className="text-lg font-semibold text-gold-500">{rates.php.toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-navy-600/40">{rates.error ? '환율 정보를 불러오지 못했어요.' : updatedLabel}</p>
      </div>

      <div className="rounded-2xl border border-navy-900/10 bg-white/95 backdrop-blur-lg shadow-lg px-4 py-3 w-[220px] sm:w-[240px]">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full flex items-center justify-between text-xs font-semibold tracking-[0.2em] uppercase text-navy-900"
          aria-expanded={expanded}
        >
          상담원 연결
          <span className="text-[10px] text-navy-600/60">{expanded ? '접기' : '열기'}</span>
        </button>
        {expanded && (
          <div className="mt-3 space-y-2">
            <a
              href="https://open.kakao.com/o/cebuguide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-navy-900/10 bg-ivory px-3 py-2 text-xs text-navy-900 hover:border-gold-500/40"
            >
              <MessageCircle className="w-4 h-4 text-gold-500" />
              KakaoTalk 연결
            </a>
            <a
              href="https://t.me/cebu_guide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-navy-900/10 bg-ivory px-3 py-2 text-xs text-navy-900 hover:border-gold-500/40"
            >
              <MessageCircle className="w-4 h-4 text-gold-500" />
              Telegram 연결
            </a>
            <a
              href="tel:+639175550123"
              className="flex items-center gap-2 rounded-xl border border-navy-900/10 bg-ivory px-3 py-2 text-xs text-navy-900 hover:border-gold-500/40"
            >
              <Phone className="w-4 h-4 text-gold-500" />
              전화 연결
            </a>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`rounded-full border border-navy-900/10 bg-white/90 backdrop-blur-lg shadow-lg w-11 h-11 flex items-center justify-center text-navy-900 transition-all ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'
        }`}
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
