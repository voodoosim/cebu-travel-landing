import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await prisma.activity.findUnique({ where: { slug } });
  if (!activity) return { title: 'Not Found' };
  return {
    title: activity.name,
    description: activity.description || `세부 ${activity.name} 예약`,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await prisma.activity.findUnique({ where: { slug } });
  if (!activity || !activity.isPublished) notFound();

  const features = (activity.features as string[]) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/activity" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          액티비티 목록
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          {activity.icon && <span className="text-5xl mb-4 block">{activity.icon}</span>}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{activity.name}</h1>
          {activity.nameKo && <p className="text-slate-500 mb-6">{activity.nameKo}</p>}

          <div className="flex flex-wrap gap-4 mb-6">
            {activity.duration && (
              <span className="text-sm bg-slate-50 px-4 py-2 rounded-lg">{activity.duration}</span>
            )}
            {activity.price && (
              <span className="text-sm bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium">{activity.price}</span>
            )}
          </div>

          {activity.description && (
            <div className="mb-6">
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{activity.description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">포함사항</h2>
              <ul className="space-y-2">
                {features.map((f: string) => (
                  <li key={f} className="text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/booking?type=ACTIVITY&id=${activity.id}`}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            예약 문의
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
