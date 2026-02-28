"use client";

import { useEffect, useState } from "react";

interface CurrencyRate {
  amount: number | null;
  php: number | null;
}

interface Rates {
  KRW: CurrencyRate;
  USD: CurrencyRate;
  updated_at: string | null;
}

export default function ExchangeRate() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rates")
      .then((res) => res.json())
      .then((data) => {
        setRates(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="border border-gold-500/20 p-8 animate-pulse">
        <div className="h-6 bg-navy-700/50 rounded w-1/3 mx-auto mb-6" />
        <div className="h-12 bg-navy-700/50 rounded w-2/3 mx-auto" />
      </div>
    );
  }

  const krw = rates?.KRW;
  const hasKRW = krw?.amount != null && krw?.php != null;

  if (!hasKRW) {
    return null;
  }

  return (
    <div className="border border-gold-500/20 p-8">
      <h3 className="text-xs font-medium tracking-[0.2em] text-gold-400 text-center mb-8 uppercase">
        Exchange Rate
      </h3>

      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.15em] text-gold-300/60">KRW</span>
          <span className="text-3xl sm:text-4xl font-[family-name:var(--font-serif)] text-ivory">
            {krw!.amount!.toLocaleString()}
          </span>
          <span className="text-xs text-gold-300/50">원</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl text-gold-500/40">=</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.15em] text-gold-300/60">PHP</span>
          <span className="text-3xl sm:text-4xl font-[family-name:var(--font-serif)] text-gold-400">
            {krw!.php!.toLocaleString()}
          </span>
          <span className="text-xs text-gold-300/50">페소</span>
        </div>
      </div>

      {rates?.updated_at && (
        <p className="text-xs text-gold-300/30 text-center mt-8 tracking-wider">
          {new Date(rates.updated_at).toLocaleDateString("ko-KR")} 기준
        </p>
      )}
    </div>
  );
}
