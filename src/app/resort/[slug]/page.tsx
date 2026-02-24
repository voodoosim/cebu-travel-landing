import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = await prisma.resort.findUnique({ where: { slug } });
  if (!resort) return { title: 'Not Found' };
  return {
    title: `${resort.name} - ${resort.grade || '리조트'}`,
    description: `${resort.name} - ${resort.area || '세부'}. ${resort.feature || ''}`,
  };
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = await prisma.resort.findUnique({ where: { slug } });
  if (!resort || !resort.isPublished) notFound();

  const features = (resort.features as string[]) || [];

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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/resort" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          리조트 목록
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{resort.name}</h1>
            {resort.grade && (
              <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                {resort.grade}
              </span>
            )}
          </div>
          {resort.nameKo && <p className="text-slate-500 mb-2">{resort.nameKo}</p>}
          {resort.area && <p className="text-sm text-slate-400 mb-6">{resort.area}</p>}

          {resort.feature && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">주요 특징</h2>
              <p className="text-slate-600">{resort.feature}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">시설</h2>
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

          {resort.description && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">상세 정보</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{resort.description}</p>
            </div>
          )}

          <Link
            href={`/booking?type=RESORT&id=${resort.id}`}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            예약 문의
          </Link>
        </div>
      </main>
    </div>
  );
}
