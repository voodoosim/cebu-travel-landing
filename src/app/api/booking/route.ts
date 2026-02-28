import { NextResponse } from 'next/server';

const TOUR_OPTIONS = [
  '골프 패키지',
  '골프 + 관광 패키지',
  '리조트 풀패키지',
  '관광/액티비티만',
  '맞춤 패키지 (직접 상담)',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, tour, message } = body;

    if (!name || typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (!contact || typeof contact !== 'string' || contact.length > 100) {
      return NextResponse.json({ error: 'Invalid contact' }, { status: 400 });
    }
    if (!tour || !TOUR_OPTIONS.includes(tour)) {
      return NextResponse.json({ error: 'Invalid tour' }, { status: 400 });
    }
    if (message && (typeof message !== 'string' || message.length > 500)) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // TODO: 실제 알림 연동 (텔레그램, 이메일 등)
    console.log('[booking]', { name, contact, tour, message: message || '' });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
