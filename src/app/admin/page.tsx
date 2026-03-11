import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { BookingStatus, ServiceType } from '@prisma/client';

export const metadata: Metadata = {
  title: '어드민 — CEBUGUIDE',
  robots: { index: false, follow: false },
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  INQUIRY: '문의 접수',
  QUOTE_SENT: '견적 발송',
  CONFIRMED: '예약 확정',
  COMPLETED: '완료',
  CANCELLED: '취소',
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  INQUIRY: 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30',
  QUOTE_SENT: 'bg-blue-900/30 text-blue-300 border border-blue-500/30',
  CONFIRMED: 'bg-emerald-900/30 text-emerald-300 border border-emerald-500/30',
  COMPLETED: 'bg-gold-900/20 text-gold-300/60 border border-gold-500/20',
  CANCELLED: 'bg-red-900/30 text-red-300 border border-red-500/30',
};

const SERVICE_LABEL: Record<ServiceType, string> = {
  GOLF: '골프',
  RESORT: '리조트',
  ACTIVITY: '액티비티',
  PACKAGE: '패키지',
  CUSTOM: '맞춤 상담',
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const [total, inquiry, confirmed, completed, bookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'INQUIRY' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.booking.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        golfCourse: { select: { nameKo: true } },
        resort: { select: { nameKo: true } },
        activity: { select: { nameKo: true } },
      },
    }),
  ]);

  const stats = [
    { label: '전체', value: total, color: 'text-ivory' },
    { label: '문의 접수', value: inquiry, color: 'text-yellow-300' },
    { label: '예약 확정', value: confirmed, color: 'text-emerald-300' },
    { label: '완료', value: completed, color: 'text-gold-400' },
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]"
          >
            CEBUGUIDE
          </Link>
          <span className="text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">
            Admin
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <h1 className="text-xl font-[family-name:var(--font-serif)] text-ivory tracking-[0.1em]">
          Dashboard
        </h1>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-gold-500/15 p-6 flex flex-col gap-1"
            >
              <span className="text-xs tracking-[0.15em] text-gold-300/40 uppercase">
                {s.label}
              </span>
              <span className={`text-3xl font-[family-name:var(--font-serif)] ${s.color}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* 예약 목록 */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] text-gold-400 mb-5 uppercase">
            Recent Bookings
          </h2>

          {bookings.length === 0 ? (
            <div className="border border-gold-500/15 p-12 text-center">
              <p className="text-gold-200/40">예약이 없습니다.</p>
            </div>
          ) : (
            <div className="border border-gold-500/15 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold-500/10">
                    <th className="px-5 py-3.5 text-left text-xs tracking-[0.15em] text-gold-400/60 font-medium uppercase">
                      이름
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs tracking-[0.15em] text-gold-400/60 font-medium uppercase">
                      이메일
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs tracking-[0.15em] text-gold-400/60 font-medium uppercase">
                      서비스
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs tracking-[0.15em] text-gold-400/60 font-medium uppercase">
                      날짜
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs tracking-[0.15em] text-gold-400/60 font-medium uppercase">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const name =
                      booking.guestName ??
                      booking.user?.name ??
                      '-';
                    const email =
                      booking.guestContact ??
                      booking.user?.email ??
                      '-';
                    const service =
                      booking.golfCourse?.nameKo ??
                      booking.resort?.nameKo ??
                      booking.activity?.nameKo ??
                      SERVICE_LABEL[booking.serviceType];

                    return (
                      <tr
                        key={booking.id}
                        className="border-b border-gold-500/8 hover:bg-gold-500/3 transition-colors"
                      >
                        <td className="px-5 py-4 text-ivory">
                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="hover:text-gold-400 transition-colors"
                          >
                            {name}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-gold-200/50 text-xs">
                          {email}
                        </td>
                        <td className="px-5 py-4 text-gold-200/70">
                          {service}
                        </td>
                        <td className="px-5 py-4 text-gold-200/40 text-xs">
                          {new Date(booking.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-[10px] px-2.5 py-0.5 font-medium tracking-wider ${STATUS_COLOR[booking.status]}`}
                          >
                            {STATUS_LABEL[booking.status]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
