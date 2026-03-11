import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { BookingStatus } from '@prisma/client';
import { updateBookingStatus } from '@/app/actions/admin';

export const metadata: Metadata = {
  title: '예약 상세 — CEBUGUIDE Admin',
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

const ALL_STATUSES: BookingStatus[] = [
  'INQUIRY',
  'QUOTE_SENT',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
];

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, image: true } },
      golfCourse: { select: { nameKo: true, name: true } },
      resort: { select: { nameKo: true, name: true } },
      activity: { select: { nameKo: true, name: true } },
      quotes: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!booking) notFound();

  const guestName = booking.guestName ?? booking.user?.name ?? '-';
  const guestContact = booking.guestContact ?? booking.user?.email ?? '-';
  const serviceName =
    booking.golfCourse?.nameKo ??
    booking.resort?.nameKo ??
    booking.activity?.nameKo ??
    booking.serviceType;

  const fields: { label: string; value: string | number | null | undefined }[] = [
    { label: '예약 ID', value: booking.id },
    { label: '이름', value: guestName },
    { label: '연락처', value: guestContact },
    { label: '서비스', value: serviceName },
    { label: '인원', value: `${booking.guests}명` },
    {
      label: '여행 날짜',
      value: booking.startDate
        ? new Date(booking.startDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '-',
    },
    {
      label: '종료 날짜',
      value: booking.endDate
        ? new Date(booking.endDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '-',
    },
    {
      label: '접수일',
      value: new Date(booking.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-sm text-gold-400/60 hover:text-gold-400 transition-colors tracking-[0.1em]"
          >
            &larr; Admin
          </Link>
          <span className="text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">
            Booking Detail
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* 현재 상태 */}
        <div className="border border-gold-500/15 p-6 flex items-center justify-between">
          <span className="text-xs tracking-[0.15em] text-gold-300/40 uppercase">
            Current Status
          </span>
          <span
            className={`text-xs px-3 py-1 font-medium tracking-wider ${STATUS_COLOR[booking.status]}`}
          >
            {STATUS_LABEL[booking.status]}
          </span>
        </div>

        {/* 상세 정보 */}
        <div className="border border-gold-500/15 divide-y divide-gold-500/8">
          {fields.map((field) => (
            <div key={field.label} className="px-6 py-4 flex items-start gap-4">
              <span className="w-28 shrink-0 text-xs tracking-[0.1em] text-gold-400/50 uppercase pt-0.5">
                {field.label}
              </span>
              <span className="text-sm text-ivory/80">{field.value ?? '-'}</span>
            </div>
          ))}
          {booking.message && (
            <div className="px-6 py-4 flex items-start gap-4">
              <span className="w-28 shrink-0 text-xs tracking-[0.1em] text-gold-400/50 uppercase pt-0.5">
                문의 내용
              </span>
              <span className="text-sm text-ivory/80 whitespace-pre-wrap">
                {booking.message}
              </span>
            </div>
          )}
          {booking.adminNote && (
            <div className="px-6 py-4 flex items-start gap-4">
              <span className="w-28 shrink-0 text-xs tracking-[0.1em] text-gold-400/50 uppercase pt-0.5">
                어드민 메모
              </span>
              <span className="text-sm text-gold-300/60 whitespace-pre-wrap">
                {booking.adminNote}
              </span>
            </div>
          )}
        </div>

        {/* 상태 변경 */}
        <div className="border border-gold-500/15 p-6 space-y-4">
          <h2 className="text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">
            Change Status
          </h2>
          <div className="flex flex-wrap gap-3">
            {ALL_STATUSES.map((status) => {
              const isActive = booking.status === status;
              return (
                <form key={status} action={updateBookingStatus.bind(null, booking.id, status)}>
                  <button
                    type="submit"
                    disabled={isActive}
                    className={`text-xs px-4 py-2 font-medium tracking-[0.1em] transition-colors ${
                      isActive
                        ? 'bg-gold-500 text-navy-900 cursor-default'
                        : 'border border-gold-500/30 text-gold-400/60 hover:border-gold-500 hover:text-gold-400'
                    }`}
                  >
                    {STATUS_LABEL[status]}
                  </button>
                </form>
              );
            })}
          </div>
        </div>

        {/* 견적 목록 */}
        {booking.quotes.length > 0 && (
          <div className="border border-gold-500/15 p-6 space-y-4">
            <h2 className="text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">
              Quotes
            </h2>
            <div className="space-y-3">
              {booking.quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="border border-gold-500/10 p-4 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-lg font-[family-name:var(--font-serif)] text-gold-400">
                      {quote.totalAmount.toLocaleString('ko-KR')}
                      {quote.currency === 'KRW' ? '원' : ` ${quote.currency}`}
                    </p>
                    <p className="text-xs text-gold-300/40">
                      유효기간:{' '}
                      {new Date(quote.validUntil).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  {quote.note && (
                    <p className="text-xs text-gold-200/50 max-w-xs text-right">
                      {quote.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
