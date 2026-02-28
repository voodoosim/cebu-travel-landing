import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { ServiceType } from '@prisma/client';

const TOUR_OPTIONS = [
  '골프 패키지',
  '골프 + 관광 패키지',
  '리조트 풀패키지',
  '관광/액티비티만',
  '맞춤 패키지 (직접 상담)',
];

const TOUR_TO_SERVICE: Record<string, ServiceType> = {
  '골프 패키지': 'GOLF',
  '골프 + 관광 패키지': 'PACKAGE',
  '리조트 풀패키지': 'RESORT',
  '관광/액티비티만': 'ACTIVITY',
  '맞춤 패키지 (직접 상담)': 'CUSTOM',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, tour, message } = body;

    if (!name || typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (!contact || typeof contact !== 'string' || contact.length < 3 || contact.length > 100) {
      return NextResponse.json({ error: 'Invalid contact' }, { status: 400 });
    }
    if (!tour || !TOUR_OPTIONS.includes(tour)) {
      return NextResponse.json({ error: 'Invalid tour' }, { status: 400 });
    }
    if (message && (typeof message !== 'string' || message.length > 500)) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const session = await auth();
    const serviceType = TOUR_TO_SERVICE[tour] ?? 'CUSTOM';
    const inquiryMessage = [
      `[${tour}]`,
      `이름: ${name}`,
      `연락처: ${contact}`,
      message ? `메시지: ${message}` : '',
    ].filter(Boolean).join('\n');

    const booking = await prisma.booking.create({
      data: {
        userId: session?.user?.id ?? null,
        serviceType,
        status: 'INQUIRY',
        message: inquiryMessage,
        guestName: name,
        guestContact: contact,
      },
    });

    console.log('[booking] saved:', booking.id, session?.user?.id ? 'user' : 'anonymous');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[booking] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
