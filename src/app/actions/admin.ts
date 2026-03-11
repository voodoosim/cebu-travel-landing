'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  await assertAdmin();

  await prisma.booking.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/admin');
  revalidatePath(`/admin/bookings/${id}`);
}
