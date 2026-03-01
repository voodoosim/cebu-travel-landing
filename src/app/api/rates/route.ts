import { NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/exchange';

export async function GET() {
  const rates = await fetchExchangeRates();

  const cacheMaxAge = rates.updatedAt ? 3600 : 600;

  return NextResponse.json({
    KRW: { amount: rates.amount, php: rates.php },
    updated_at: rates.updatedAt,
  }, {
    headers: { 'Cache-Control': `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}` },
  });
}
