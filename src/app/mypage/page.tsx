import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const STATUS_LABEL: Record<string, string> = {
  INQUIRY: "문의 접수",
  QUOTE_SENT: "견적 발송",
  CONFIRMED: "예약 확정",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

const STATUS_COLOR: Record<string, string> = {
  INQUIRY: "border-gold-500/40 text-gold-400",
  QUOTE_SENT: "border-blue-400/40 text-blue-300",
  CONFIRMED: "border-emerald-400/40 text-emerald-300",
  COMPLETED: "border-gold-300/20 text-gold-300/50",
  CANCELLED: "border-red-400/40 text-red-300",
};

const SERVICE_LABEL: Record<string, string> = {
  GOLF: "골프",
  RESORT: "리조트",
  ACTIVITY: "액티비티",
  PACKAGE: "패키지",
  CUSTOM: "맞춤 상담",
};

export default async function MyPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      golfCourse: { select: { nameKo: true } },
      resort: { select: { nameKo: true } },
      activity: { select: { nameKo: true } },
      quotes: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <SignOutButton />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* 프로필 */}
        <div className="border border-gold-500/15 p-6 flex items-center gap-5">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="프로필"
              width={56}
              height={56}
              className="rounded-full ring-1 ring-gold-500/20"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-navy-700 border border-gold-500/20 flex items-center justify-center text-gold-400 font-[family-name:var(--font-serif)] text-xl">
              {session.user.name?.[0] ?? "U"}
            </div>
          )}
          <div>
            <p className="font-medium text-ivory">{session.user.name}</p>
            <p className="text-sm text-gold-300/40">{session.user.email}</p>
          </div>
        </div>

        {/* 예약 내역 */}
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] text-gold-400 mb-5 uppercase">
            Reservations
          </h2>

          {bookings.length === 0 ? (
            <div className="border border-gold-500/15 p-12 text-center">
              <p className="text-gold-200/40 mb-6">예약 내역이 없습니다.</p>
              <Link
                href="/#booking"
                className="inline-block border border-gold-500 text-gold-400 px-8 py-3 text-xs font-medium tracking-[0.2em] hover:bg-gold-500 hover:text-navy-900 transition-all"
              >
                INQUIRE NOW
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => {
                const serviceName =
                  booking.golfCourse?.nameKo ??
                  booking.resort?.nameKo ??
                  booking.activity?.nameKo ??
                  SERVICE_LABEL[booking.serviceType] ??
                  booking.serviceType;

                const quote = booking.quotes[0];

                return (
                  <div
                    key={booking.id}
                    className="border border-gold-500/15 p-5 hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-medium text-ivory text-sm">
                            {serviceName}
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 border font-medium tracking-wider ${STATUS_COLOR[booking.status]}`}
                          >
                            {STATUS_LABEL[booking.status]}
                          </span>
                        </div>
                        <p className="text-xs text-gold-300/30">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "ko-KR",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                          {booking.guests > 1 && ` · ${booking.guests}명`}
                          {booking.startDate &&
                            ` · ${new Date(booking.startDate).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}`}
                        </p>
                        {booking.message && (
                          <p className="mt-2.5 text-sm text-gold-200/50 line-clamp-2">
                            {booking.message}
                          </p>
                        )}
                        {quote && (
                          <p className="mt-2.5 text-sm font-[family-name:var(--font-serif)] text-gold-400">
                            {quote.totalAmount.toLocaleString("ko-KR")}
                            {quote.currency === "KRW" ? "원" : ` ${quote.currency}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 새 예약 */}
        <div className="text-center pt-4">
          <Link
            href="/#booking"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-3.5 text-xs font-semibold tracking-[0.2em] transition-colors"
          >
            NEW INQUIRY
          </Link>
        </div>
      </div>
    </div>
  );
}
