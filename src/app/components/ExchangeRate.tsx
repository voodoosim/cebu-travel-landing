const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/KRW';

interface ExchangeApiResponse {
  result: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

async function fetchRates(): Promise<{ amount: number; php: number; updatedAt: string | null }> {
  try {
    const res = await fetch(EXCHANGE_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data: ExchangeApiResponse = await res.json();
    if (data.result !== 'success' || !data.rates?.PHP) {
      throw new Error('Invalid response');
    }

    return {
      amount: 10000,
      php: Math.round(data.rates.PHP * 10000),
      updatedAt: data.time_last_update_utc,
    };
  } catch {
    return { amount: 10000, php: 420, updatedAt: null };
  }
}

export default async function ExchangeRate() {
  const rates = await fetchRates();

  return (
    <div className="border border-navy-900/10 p-8">
      <p className="text-gold-500 text-[10px] tracking-[0.3em] uppercase text-center mb-6">
        Exchange Rate
      </p>

      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-navy-600/40 tracking-wider">KRW</span>
          <span className="text-2xl sm:text-3xl font-[family-name:var(--font-serif)] text-navy-900">
            {rates.amount.toLocaleString()}
          </span>
          <span className="text-xs text-navy-600/40">원</span>
        </div>

        <span className="text-xl text-gold-500">=</span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-navy-600/40 tracking-wider">PHP</span>
          <span className="text-2xl sm:text-3xl font-[family-name:var(--font-serif)] text-gold-500">
            {rates.php.toLocaleString()}
          </span>
          <span className="text-xs text-navy-600/40">페소</span>
        </div>
      </div>

      {rates.updatedAt && (
        <p className="text-[10px] text-navy-600/30 text-center mt-6 tracking-wider">
          {new Date(rates.updatedAt).toLocaleDateString('ko-KR')} 기준
        </p>
      )}
    </div>
  );
}
