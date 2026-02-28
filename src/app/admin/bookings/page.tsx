import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BookingStatusSelect from './BookingStatusSelect';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

const TYPE_LABELS: Record<string, string> = {
  GOLF: '골프',
  RESORT: '리조트',
  ACTIVITY: '액티비티',
  PACKAGE: '패키지',
  CUSTOM: '기타',
};

export default async function AdminBookingsPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      golfCourse: { select: { nameKo: true } },
      resort: { select: { name: true } },
      activity: { select: { name: true } },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          대시보드
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-8">예약 관리 ({bookings.length}건)</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow border border-slate-100">
            <p className="text-slate-500 text-sm">예약이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const serviceName = b.golfCourse?.nameKo || b.resort?.name || b.activity?.name || '-';

              return (
                <div key={b.id} className="bg-white rounded-xl p-6 shadow border border-slate-100">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-bold text-slate-900">{b.user.name || '-'}</p>
                      <p className="text-xs text-slate-400">{b.user.email}{b.user.phone ? ` / ${b.user.phone}` : ''}</p>
                    </div>
                    <BookingStatusSelect bookingId={b.id} currentStatus={b.status} />
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-2">
                    <span className="bg-slate-50 px-3 py-1 rounded-lg">{TYPE_LABELS[b.serviceType] || b.serviceType}</span>
                    <span className="bg-slate-50 px-3 py-1 rounded-lg">{serviceName}</span>
                    <span className="bg-slate-50 px-3 py-1 rounded-lg">{b.guests}명</span>
                    {b.startDate && (
                      <span className="bg-slate-50 px-3 py-1 rounded-lg">
                        {new Date(b.startDate).toLocaleDateString('ko-KR')}
                        {b.endDate ? ` ~ ${new Date(b.endDate).toLocaleDateString('ko-KR')}` : ''}
                      </span>
                    )}
                  </div>

                  {b.message && (
                    <p className="text-sm text-slate-500 mt-2 whitespace-pre-line">{b.message}</p>
                  )}

                  <p className="text-xs text-slate-400 mt-3">{new Date(b.createdAt).toLocaleString('ko-KR')} 접수</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
