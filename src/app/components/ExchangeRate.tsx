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
      <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
      </div>
    );
  }

  const krw = rates?.KRW;
  const usd = rates?.USD;
  const hasKRW = krw?.amount != null && krw?.php != null;
  const hasUSD = usd?.amount != null && usd?.php != null;

  if (!hasKRW && !hasUSD) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        오늘의 환율
      </h3>
      <div className="space-y-3">
        {hasKRW && (
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 flex items-center gap-2">
              <span className="text-xl leading-none" role="img" aria-label="Korea">&#x1F1F0;&#x1F1F7;</span>
              원화
              <span className="text-slate-300 mx-1">&rarr;</span>
              <span className="text-xl leading-none" role="img" aria-label="Philippines">&#x1F1F5;&#x1F1ED;</span>
              페소
            </span>
            <span className="font-semibold text-emerald-600">
              {krw!.amount!.toLocaleString()}원 = {krw!.php!.toLocaleString()}페소
            </span>
          </div>
        )}
        {hasUSD && (
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 flex items-center gap-2">
              <span className="text-xl leading-none" role="img" aria-label="USA">&#x1F1FA;&#x1F1F8;</span>
              달러
              <span className="text-slate-300 mx-1">&rarr;</span>
              <span className="text-xl leading-none" role="img" aria-label="Philippines">&#x1F1F5;&#x1F1ED;</span>
              페소
            </span>
            <span className="font-semibold text-emerald-600">
              {usd!.amount!.toLocaleString()}달러 = {usd!.php!.toLocaleString()}페소
            </span>
          </div>
        )}
      </div>
      {rates?.updated_at && (
        <p className="text-xs text-slate-400 mt-4">
          업데이트: {new Date(rates.updated_at).toLocaleDateString("ko-KR")}
        </p>
      )}
    </div>
  );
}
