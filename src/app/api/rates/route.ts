import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
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

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const php = Number(body.php);

  if (!php || php <= 0) {
    return NextResponse.json({ error: 'Invalid php value' }, { status: 400 });
  }

  const setting = await prisma.siteSetting.upsert({
    where: { key: 'exchange_php' },
    update: { value: String(php) },
    create: { key: 'exchange_php', value: String(php) },
  });

  return NextResponse.json({
    success: true,
    KRW: { amount: 10000, php },
    updated_at: setting.updatedAt.toISOString(),
  });
}
