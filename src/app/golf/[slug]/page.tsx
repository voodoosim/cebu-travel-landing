import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';

const courses = products.golf;

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: 'Not Found' };
  return {
    title: course.nameKo,
    description: `${course.nameKo} (${course.name}) - ${course.holes}홀, Par ${course.par}. ${course.distance || ''}`,
  };
}

export default async function GolfDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-300/70 hover:text-gold-400 transition-colors">골프</Link>
            <Link href="/resort/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">액티비티</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/golf/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-gold-300/40 hover:text-gold-300/70 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          골프장 목록
        </Link>

        <div className="relative h-64 sm:h-[420px] overflow-hidden mb-10">
          <Image src={course.image} alt={course.nameKo} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
          {course.badge && (
            <div className="absolute top-5 right-5 bg-gold-500 text-navy-900 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase">
              {course.badge}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-serif)] text-ivory mb-1">{course.nameKo}</h1>
            <p className="text-gold-300/50 text-sm">{course.name}</p>
          </div>
        </div>

        <div className="border border-gold-500/15 p-8 sm:p-10">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-xs text-gold-300/60 border border-gold-500/15 px-4 py-2">
              <Flag className="w-3.5 h-3.5 text-gold-500/50" />
              <span>{course.holes}홀 / Par {course.par} / {course.yards.toLocaleString()}yd</span>
            </div>
            {course.distance && (
              <div className="flex items-center gap-2 text-xs text-gold-300/60 border border-gold-500/15 px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-gold-500/50" />
                <span>{course.distance}</span>
              </div>
            )}
            {course.courseType && (
              <div className="flex items-center gap-2 text-xs text-gold-300/60 border border-gold-500/15 px-4 py-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500/50" />
                <span>{course.courseType}</span>
              </div>
            )}
          </div>

          {course.designer && (
            <p className="text-gold-400 text-sm font-medium mb-6">{course.designer}</p>
          )}

          {course.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-4">특징</h2>
              <ul className="space-y-2.5">
                {course.features.map((f) => (
                  <li key={f} className="text-sm text-gold-200/50 flex items-start gap-2.5">
                    <span className="text-gold-500/40 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.description && (
            <div className="mb-8 pt-8 border-t border-gold-500/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-400 mb-4">상세정보</h2>
              <p className="text-sm text-gold-200/50 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>
          )}

          <Link
            href="/#cta"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-900 px-10 py-3.5 text-xs font-semibold tracking-[0.2em] transition-colors"
          >
            문의하기
          </Link>
        </div>
      </main>
    </div>
  );
}
