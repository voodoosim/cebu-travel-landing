import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '세부 관광 & 액티비티',
  description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
};

export default async function ActivityListPage() {
  const activities = await prisma.activity.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
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
            <Link href="/golf" className="text-slate-500 hover:text-emerald-600">골프장</Link>
            <Link href="/resort" className="text-slate-500 hover:text-emerald-600">리조트</Link>
            <Link href="/activity" className="font-semibold text-emerald-600">액티비티</Link>
            <Link href="/" className="text-slate-500 hover:text-emerald-600">홈</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">관광 & 액티비티</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {activities.map((a) => (
            <Link
              key={a.id}
              href={`/activity/${a.slug}`}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
            >
              {a.icon && <span className="text-3xl mb-3 block">{a.icon}</span>}
              <h3 className="font-bold text-slate-900 mb-2">{a.name}</h3>
              {a.description && (
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{a.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
