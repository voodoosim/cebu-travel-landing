import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

const VALID_STATUSES = ['INQUIRY', 'QUOTE_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.status && !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: {
      ...(body.status && { status: body.status }),
      ...(body.adminNote !== undefined && { adminNote: body.adminNote }),
    },
  });

  return NextResponse.json({ id: updated.id, status: updated.status });
}
