import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';
import BookingFormClient from './BookingFormClient';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ type?: string; id?: string }>;
}

export default async function BookingPage({ searchParams }: Props) {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const { type, id } = await searchParams;

  let serviceName = '';
  let serviceType = type || 'CUSTOM';

  if (type === 'GOLF' && id) {
    const course = await prisma.golfCourse.findUnique({ where: { id }, select: { nameKo: true } });
    serviceName = course?.nameKo || '';
  } else if (type === 'RESORT' && id) {
    const resort = await prisma.resort.findUnique({ where: { id }, select: { name: true } });
    serviceName = resort?.name || '';
  } else if (type === 'ACTIVITY' && id) {
    const activity = await prisma.activity.findUnique({ where: { id }, select: { name: true } });
    serviceName = activity?.name || '';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-700 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            <span>세부가이드</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/golf" className="text-slate-500 hover:text-emerald-600">골프장</Link>
            <Link href="/resort" className="text-slate-500 hover:text-emerald-600">리조트</Link>
            <Link href="/activity" className="text-slate-500 hover:text-emerald-600">액티비티</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">예약 문의</h1>
          {serviceName && (
            <p className="text-emerald-600 font-medium mb-6">{serviceName}</p>
          )}
          <BookingFormClient
            serviceType={serviceType}
            golfCourseId={type === 'GOLF' ? id : undefined}
            resortId={type === 'RESORT' ? id : undefined}
            activityId={type === 'ACTIVITY' ? id : undefined}
          />
        </div>
      </main>
    </div>
  );
}
