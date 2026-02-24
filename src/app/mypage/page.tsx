import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  INQUIRY: { label: '문의 접수', color: 'bg-blue-50 text-blue-700' },
  QUOTE_SENT: { label: '견적 발송', color: 'bg-amber-50 text-amber-700' },
  CONFIRMED: { label: '예약 확정', color: 'bg-emerald-50 text-emerald-700' },
  COMPLETED: { label: '완료', color: 'bg-slate-100 text-slate-600' },
  CANCELLED: { label: '취소', color: 'bg-red-50 text-red-600' },
};

const TYPE_LABELS: Record<string, string> = {
  GOLF: '골프',
  RESORT: '리조트',
  ACTIVITY: '액티비티',
  PACKAGE: '패키지',
  CUSTOM: '기타',
};

export default async function MyPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      golfCourse: { select: { nameKo: true, slug: true } },
      resort: { select: { name: true, slug: true } },
      activity: { select: { name: true, slug: true } },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-700 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            <span>세부가이드</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/mypage" className="font-semibold text-emerald-600">마이페이지</Link>
            <Link href="/" className="text-slate-500 hover:text-emerald-600">홈</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          {session.user.image ? (
            <img src={session.user.image} alt="" className="w-16 h-16 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
              {session.user.name?.[0] || '?'}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{session.user.name}</h1>
            <p className="text-slate-500 text-sm">{session.user.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">예약 내역</h2>

          {bookings.length === 0 ? (
            <div>
              <p className="text-slate-500 text-sm mb-4">아직 예약 내역이 없습니다.</p>
              <Link
                href="/booking"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                예약 문의하기
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => {
                const status = STATUS_LABELS[b.status] || { label: b.status, color: 'bg-slate-100 text-slate-600' };
                const serviceName = b.golfCourse?.nameKo || b.resort?.name || b.activity?.name || TYPE_LABELS[b.serviceType] || b.serviceType;

                return (
                  <div key={b.id} className="border border-slate-100 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs text-slate-400 mr-2">{TYPE_LABELS[b.serviceType] || b.serviceType}</span>
                        <span className="font-semibold text-slate-900">{serviceName}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      {b.startDate && (
                        <span>{new Date(b.startDate).toLocaleDateString('ko-KR')}{b.endDate ? ` ~ ${new Date(b.endDate).toLocaleDateString('ko-KR')}` : ''}</span>
                      )}
                      <span>{b.guests}명</span>
                      <span>{new Date(b.createdAt).toLocaleDateString('ko-KR')} 접수</span>
                    </div>
                    {b.message && (
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{b.message}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
