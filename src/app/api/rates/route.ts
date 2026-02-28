import { NextResponse } from 'next/server';

const FALLBACK_RATES = {
  KRW: { amount: 10000, php: 420 },
  USD: { amount: 1, php: 56 },
  updated_at: null,
};

export async function GET() {
  // TODO: 외부 환율 API 연동 시 여기서 fetch
  return NextResponse.json(FALLBACK_RATES);
}
