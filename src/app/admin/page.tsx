import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import AdminNav from './components/AdminNav';
import {
  CalendarCheck,
  Clock,
  Users,
  Flag,
  Hotel,
  Waves,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  INQUIRY: { label: '문의', color: 'bg-blue-50 text-blue-700 border border-blue-100' },
  QUOTE_SENT: { label: '견적', color: 'bg-amber-50 text-amber-700 border border-amber-100' },
  CONFIRMED: { label: '확정', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100' },
  COMPLETED: { label: '완료', color: 'bg-slate-100 text-slate-600 border border-slate-200' },
  CANCELLED: { label: '취소', color: 'bg-red-50 text-red-600 border border-red-100' },
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

  const [
    totalBookings,
    pendingBookings,
    totalUsers,
    totalGolf,
    totalResort,
    totalActivity,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'INQUIRY' } }),
    prisma.user.count(),
    prisma.golfCourse.count({ where: { isPublished: true } }),
    prisma.resort.count({ where: { isPublished: true } }),
    prisma.activity.count({ where: { isPublished: true } }),
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
      <AdminNav />

      <main className="container mx-auto px-4 py-8 max-w-6xl">

        {/* 페이지 타이틀 */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-slate-900">대시보드</h1>
          <p className="text-sm text-slate-500 mt-0.5">세부가이드 운영 현황</p>
        </div>

        {/* 주요 지표 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">총 예약</span>
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalBookings}</p>
            <p className="text-xs text-slate-400 mt-1">전체 누적</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">처리 대기</span>
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600">{pendingBookings}</p>
            <p className="text-xs text-slate-400 mt-1">문의 상태</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">회원</span>
              <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-sky-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
            <p className="text-xs text-slate-400 mt-1">가입 회원</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">전환율</span>
              <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-violet-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {totalBookings > 0 ? Math.round(((totalBookings - pendingBookings) / totalBookings) * 100) : 0}%
            </p>
            <p className="text-xs text-slate-400 mt-1">확정/완료 비율</p>
          </div>
        </div>

        {/* 콘텐츠 관리 */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/content/golf"
            className="group bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Flag className="w-5 h-5 text-emerald-600" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">골프장</p>
            <p className="text-2xl font-bold text-emerald-600">{totalGolf}<span className="text-sm font-normal text-slate-400 ml-1">개 공개</span></p>
          </Link>

          <Link
            href="/admin/content/resort"
            className="group bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-sky-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                <Hotel className="w-5 h-5 text-sky-600" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">리조트</p>
            <p className="text-2xl font-bold text-sky-600">{totalResort}<span className="text-sm font-normal text-slate-400 ml-1">개 공개</span></p>
          </Link>

          <Link
            href="/admin/content/activity"
            className="group bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-amber-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Waves className="w-5 h-5 text-amber-600" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">액티비티</p>
            <p className="text-2xl font-bold text-amber-600">{totalActivity}<span className="text-sm font-normal text-slate-400 ml-1">개 공개</span></p>
          </Link>
        </div>

        {/* 최근 예약 */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">최근 예약</h2>
            <Link
              href="/admin/bookings"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              전체 보기 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <CalendarCheck className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">아직 예약이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">고객</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">유형</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">서비스</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">날짜</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">인원</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">상태</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">접수일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentBookings.map((b) => {
                    const status = STATUS_LABELS[b.status] || { label: b.status, color: 'bg-slate-100 text-slate-600' };
                    const serviceName = b.golfCourse?.nameKo || b.resort?.name || b.activity?.name || '-';

                    return (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-900">{b.user.name || '-'}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{b.user.email}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 text-xs">{TYPE_LABELS[b.serviceType] || b.serviceType}</td>
                        <td className="py-3.5 px-4 text-slate-900 font-medium">{serviceName}</td>
                        <td className="py-3.5 px-4 text-slate-500 text-xs">
                          {b.startDate ? new Date(b.startDate).toLocaleDateString('ko-KR') : '-'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-xs">{b.guests}명</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-xs">
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
