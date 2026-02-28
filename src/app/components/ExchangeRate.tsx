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
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-100 animate-pulse">
        <div className="h-8 bg-emerald-200/50 rounded w-1/3 mx-auto mb-6" />
        <div className="h-16 bg-emerald-200/50 rounded w-2/3 mx-auto" />
      </div>
    );
  }

  const krw = rates?.KRW;
  const hasKRW = krw?.amount != null && krw?.php != null;

  if (!hasKRW) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-100">
      <h3 className="text-lg font-bold text-slate-700 text-center mb-6">
        오늘의 환율
      </h3>

      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* 한국 */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl sm:text-5xl" role="img" aria-label="Korea">&#x1F1F0;&#x1F1F7;</span>
          <span className="text-xs text-slate-500 font-medium">KRW</span>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900">
            {krw!.amount!.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500">원</span>
        </div>

        {/* 화살표 */}
        <div className="flex flex-col items-center gap-1 px-2">
          <span className="text-3xl text-emerald-500 font-light">=</span>
        </div>

        {/* 필리핀 */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl sm:text-5xl" role="img" aria-label="Philippines">&#x1F1F5;&#x1F1ED;</span>
          <span className="text-xs text-slate-500 font-medium">PHP</span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
            {krw!.php!.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500">페소</span>
        </div>
      </div>

      {rates?.updated_at && (
        <p className="text-xs text-slate-400 text-center mt-6">
          {new Date(rates.updated_at).toLocaleDateString("ko-KR")} 기준
        </p>
      )}
    </div>
  );
}
