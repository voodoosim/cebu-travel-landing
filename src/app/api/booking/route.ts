import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { notifyBooking } from '@/lib/cebu-service';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { serviceType, golfCourseId, resortId, activityId, startDate, endDate, guests, message } = body;

  if (!serviceType) {
    return NextResponse.json({ error: 'serviceType is required' }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      serviceType,
      golfCourseId: golfCourseId || null,
      resortId: resortId || null,
      activityId: activityId || null,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      guests: guests || 1,
      message: message || null,
    },
    include: {
      golfCourse: { select: { nameKo: true } },
      resort: { select: { name: true } },
      activity: { select: { name: true } },
    },
  });

  const serviceName =
    booking.golfCourse?.nameKo || booking.resort?.name || booking.activity?.name || serviceType;

  notifyBooking({
    name: session.user.name || 'Unknown',
    contact: session.user.email || '',
    tour: serviceName,
    message: message || undefined,
  }).catch(() => {});

  return NextResponse.json({ id: booking.id }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      golfCourse: { select: { nameKo: true, slug: true } },
      resort: { select: { name: true, slug: true } },
      activity: { select: { name: true, slug: true } },
      quotes: { select: { totalAmount: true, currency: true, validUntil: true } },
    },
  });

  return NextResponse.json(bookings);
}
