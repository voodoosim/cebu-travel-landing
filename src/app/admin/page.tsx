import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  INQUIRY: { label: '문의', color: 'bg-blue-50 text-blue-700' },
  QUOTE_SENT: { label: '견적', color: 'bg-amber-50 text-amber-700' },
  CONFIRMED: { label: '확정', color: 'bg-emerald-50 text-emerald-700' },
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

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const [totalBookings, pendingBookings, totalUsers, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'INQUIRY' } }),
    prisma.user.count(),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: { select: { name: true, email: true } },
        golfCourse: { select: { nameKo: true } },
        resort: { select: { name: true } },
        activity: { select: { name: true } },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">관리자 대시보드</h1>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100">
            <p className="text-sm text-slate-500">총 예약</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{totalBookings}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100">
            <p className="text-sm text-slate-500">대기 중</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{pendingBookings}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-100">
            <p className="text-sm text-slate-500">회원 수</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">최근 예약</h2>
            <Link href="/admin/bookings" className="text-sm text-emerald-600 hover:text-emerald-700">전체 보기</Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-slate-500 text-sm">예약이 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">고객</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">유형</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">서비스</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">날짜</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">인원</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">상태</th>
                    <th className="text-left py-3 px-2 text-slate-500 font-medium">접수일</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => {
                    const status = STATUS_LABELS[b.status] || { label: b.status, color: 'bg-slate-100 text-slate-600' };
                    const serviceName = b.golfCourse?.nameKo || b.resort?.name || b.activity?.name || '-';

                    return (
                      <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="py-3 px-2">
                          <p className="font-medium text-slate-900">{b.user.name || '-'}</p>
                          <p className="text-xs text-slate-400">{b.user.email}</p>
                        </td>
                        <td className="py-3 px-2 text-slate-600">{TYPE_LABELS[b.serviceType] || b.serviceType}</td>
                        <td className="py-3 px-2 text-slate-900">{serviceName}</td>
                        <td className="py-3 px-2 text-slate-600">
                          {b.startDate ? new Date(b.startDate).toLocaleDateString('ko-KR') : '-'}
                        </td>
                        <td className="py-3 px-2 text-slate-600">{b.guests}명</td>
                        <td className="py-3 px-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-400 text-xs">
                          {new Date(b.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
