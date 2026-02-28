'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

function parseLines(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// === GolfCourse ===

export async function upsertGolfCourse(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const name = formData.get('name') as string;
  const nameKo = formData.get('nameKo') as string;
  const holes = parseInt(formData.get('holes') as string) || 18;
  const par = parseInt(formData.get('par') as string) || 72;
  const yardsRaw = formData.get('yards') as string;
  const yards = yardsRaw ? parseInt(yardsRaw) || null : null;
  const courseType = (formData.get('courseType') as string) || null;
  const distance = (formData.get('distance') as string) || null;
  const designer = (formData.get('designer') as string) || null;
  const features = parseLines(formData.get('features'));
  const images = parseLines(formData.get('images'));
  const badge = (formData.get('badge') as string) || null;
  const badgeColor = (formData.get('badgeColor') as string) || null;
  const greenFee = (formData.get('greenFee') as string) || null;
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
  const isPublished = formData.get('isPublished') === 'on';

  const data = {
    slug,
    name,
    nameKo,
    holes,
    par,
    yards,
    courseType,
    distance,
    designer,
    features,
    images,
    badge,
    badgeColor,
    greenFee,
    sortOrder,
    isPublished,
  };

  if (id) {
    await prisma.golfCourse.update({ where: { id }, data });
  } else {
    await prisma.golfCourse.create({ data });
  }

  revalidatePath('/admin/content/golf');
  revalidatePath('/golf');
  redirect('/admin/content/golf');
}

export async function deleteGolfCourse(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  await prisma.golfCourse.delete({ where: { id } });

  revalidatePath('/admin/content/golf');
  revalidatePath('/golf');
}

// === Resort ===

export async function upsertResort(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const name = formData.get('name') as string;
  const nameKo = (formData.get('nameKo') as string) || null;
  const grade = (formData.get('grade') as string) || null;
  const area = (formData.get('area') as string) || null;
  const feature = (formData.get('feature') as string) || null;
  const features = parseLines(formData.get('features'));
  const images = parseLines(formData.get('images'));
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
  const isPublished = formData.get('isPublished') === 'on';

  const data = {
    slug,
    name,
    nameKo,
    grade,
    area,
    feature,
    features,
    images,
    sortOrder,
    isPublished,
  };

  if (id) {
    await prisma.resort.update({ where: { id }, data });
  } else {
    await prisma.resort.create({ data });
  }

  revalidatePath('/admin/content/resort');
  revalidatePath('/resort');
  redirect('/admin/content/resort');
}

export async function deleteResort(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  await prisma.resort.delete({ where: { id } });

  revalidatePath('/admin/content/resort');
  revalidatePath('/resort');
}

// === Activity ===

export async function upsertActivity(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const name = formData.get('name') as string;
  const nameKo = (formData.get('nameKo') as string) || null;
  const description = (formData.get('description') as string) || null;
  const icon = (formData.get('icon') as string) || null;
  const duration = (formData.get('duration') as string) || null;
  const price = (formData.get('price') as string) || null;
  const features = parseLines(formData.get('features'));
  const images = parseLines(formData.get('images'));
  const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
  const isPublished = formData.get('isPublished') === 'on';

  const data = {
    slug,
    name,
    nameKo,
    description,
    icon,
    duration,
    price,
    features,
    images,
    sortOrder,
    isPublished,
  };

  if (id) {
    await prisma.activity.update({ where: { id }, data });
  } else {
    await prisma.activity.create({ data });
  }

  revalidatePath('/admin/content/activity');
  revalidatePath('/activity');
  redirect('/admin/content/activity');
}

export async function deleteActivity(formData: FormData) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/');

  const id = formData.get('id') as string;
  await prisma.activity.delete({ where: { id } });

  revalidatePath('/admin/content/activity');
  revalidatePath('/activity');
}
