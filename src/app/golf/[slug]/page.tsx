import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import MobileMenu from '../../components/MobileMenu';

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
  const descParts = [`${course.nameKo} (${course.name})`, `${course.holes}홀 Par ${course.par}`];
  if (course.distance) descParts.push(course.distance);
  descParts.push('세부 골프장 예약 대행');
  const desc = descParts.join('. ') + '.';
  return {
    title: course.nameKo,
    description: desc,
    alternates: { canonical: `https://cebu.sasori.dev/golf/${slug}/` },
    openGraph: {
      title: course.nameKo,
      description: desc,
      url: `https://cebu.sasori.dev/golf/${slug}/`,
      images: [{ url: course.image, alt: course.nameKo }],
    },
  };
}

export default async function GolfDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gold-200/50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="text-xl font-[family-name:var(--font-serif)] font-semibold tracking-wide text-navy-900">
            CEBU<span className="text-gold-500">GUIDE</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10 text-[13px] tracking-widest">
            <Link href="/golf/" className="text-gold-500 font-medium">골프</Link>
            <Link href="/resort/" className="text-navy-700 hover:text-gold-500 transition-colors">리조트</Link>
            <Link href="/activity/" className="text-navy-700 hover:text-gold-500 transition-colors">액티비티</Link>
            <Link href="/package/" className="text-navy-700 hover:text-gold-500 transition-colors">패키지</Link>
            <Link href="/faq/" className="text-navy-700 hover:text-gold-500 transition-colors">FAQ</Link>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/golf/" className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-navy-600/40 hover:text-gold-500 mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          GOLF COURSES
        </Link>

        <div className="relative h-64 sm:h-[420px] overflow-hidden mb-10">
          <Image src={course.image} alt={course.nameKo} fill sizes="(min-width: 768px) 896px, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-navy-900/30" />
          {course.badge && (
            <div className="absolute top-5 right-5 bg-gold-500 text-navy-900 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase">
              {course.badge}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-serif)] text-white mb-1">{course.nameKo}</h1>
            <p className="text-white/60 text-sm">{course.name}</p>
          </div>
        </div>

        <div className="bg-white border border-navy-900/5 p-8 sm:p-10">
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-xs text-navy-600/60 border border-navy-900/10 px-4 py-2">
              <Flag className="w-3.5 h-3.5 text-gold-500" />
              <span>{course.holes}홀 / Par {course.par} / {course.yards.toLocaleString()}yd</span>
            </div>
            {course.distance && (
              <div className="flex items-center gap-2 text-xs text-navy-600/60 border border-navy-900/10 px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-gold-500" />
                <span>{course.distance}</span>
              </div>
            )}
            {course.courseType && (
              <div className="flex items-center gap-2 text-xs text-navy-600/60 border border-navy-900/10 px-4 py-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>{course.courseType}</span>
              </div>
            )}
          </div>

          {course.designer && (
            <p className="text-gold-500 text-sm font-medium mb-6">{course.designer}</p>
          )}

          {course.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">Features</h2>
              <ul className="space-y-2.5">
                {course.features.map((f) => (
                  <li key={f} className="text-sm text-navy-600/60 flex items-start gap-2.5">
                    <span className="text-gold-400 mt-0.5">-</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.description && (
            <div className="mb-8 pt-8 border-t border-navy-900/10">
              <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">Details</h2>
              <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>
          )}

          <Link
            href="/#cta"
            className="inline-block bg-navy-900 hover:bg-navy-800 text-white px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            INQUIRE NOW
          </Link>
        </div>
      </main>
    </div>
  );
}
