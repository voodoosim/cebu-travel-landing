import { NextResponse } from 'next/server';

const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/KRW';

const FALLBACK_RATES = {
  KRW: { amount: 10000, php: 420 },
  updated_at: null as string | null,
};

interface ExchangeApiResponse {
  result: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

export async function GET() {
  try {
    const res = await fetch(EXCHANGE_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Exchange API returned ${res.status}`);
    }

    const data: ExchangeApiResponse = await res.json();

    if (data.result !== 'success' || !data.rates?.PHP) {
      throw new Error('Invalid exchange API response');
    }

    const phpPerKrw = data.rates.PHP;
    const phpPer10000 = Math.round(phpPerKrw * 10000);

    return NextResponse.json({
      KRW: { amount: 10000, php: phpPer10000 },
      updated_at: data.time_last_update_utc,
    }, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch (error) {
    console.error('[rates] exchange API error:', error);
    return NextResponse.json(FALLBACK_RATES, {
      headers: { 'Cache-Control': 'public, max-age=600, s-maxage=600' },
    });
  }
}
