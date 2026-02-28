import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.golfCourse.findUnique({ where: { slug } });
  if (!course) return { title: 'Not Found' };
  return {
    title: course.nameKo,
    description: `${course.nameKo} (${course.name}) - ${course.holes}홀, Par ${course.par}. ${course.distance || ''}`,
  };
}

export default async function GolfDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.golfCourse.findUnique({ where: { slug } });
  if (!course || !course.isPublished) notFound();

  const features = (course.features as string[]) || [];
  const images = (course.images as string[]) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/golf" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          골프장 목록
        </Link>

        {images[0] && (
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={images[0]} alt={course.nameKo} fill className="object-cover" priority />
            {course.badge && (
              <div className={`absolute top-4 right-4 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold shadow ${course.badgeColor || 'bg-emerald-600 text-white'}`}>
                {course.badge}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{course.nameKo}</h1>
          <p className="text-slate-500 mb-6">{course.name}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm bg-slate-50 px-4 py-2 rounded-lg">
              <Flag className="w-4 h-4 text-emerald-600" />
              <span>{course.holes}홀 / Par {course.par}{course.yards ? ` / ${course.yards.toLocaleString()}yd` : ''}</span>
            </div>
            {course.distance && (
              <div className="flex items-center gap-2 text-sm bg-slate-50 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{course.distance}</span>
              </div>
            )}
            {course.courseType && (
              <div className="flex items-center gap-2 text-sm bg-slate-50 px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{course.courseType}</span>
              </div>
            )}
          </div>

          {course.designer && (
            <p className="text-emerald-600 font-medium mb-4">{course.designer}</p>
          )}

          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">특징</h2>
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

          {course.description && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">상세 정보</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>
          )}

          <Link
            href={`/booking?type=GOLF&id=${course.id}`}
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
