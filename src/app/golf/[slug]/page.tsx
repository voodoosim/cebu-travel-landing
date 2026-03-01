import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Flag, Clock, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../../components/SiteHeader';
import DetailHero from '../../components/DetailHero';
import InfoBar from '../../components/InfoBar';
import RelatedItems from '../../components/RelatedItems';

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
    alternates: { canonical: `https://세부.com/golf/${slug}/` },
    openGraph: {
      title: course.nameKo,
      description: desc,
      url: `https://세부.com/golf/${slug}/`,
      images: [{ url: course.image, alt: course.nameKo }],
    },
  };
}

export default async function GolfDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const related = courses
    .filter((c) => c.slug !== slug)
    .map((c) => ({ slug: c.slug, name: c.nameKo, image: c.image, badge: c.badge }));

  const golfPackage = products.packages.find((p) => p.id === 'golf-package');

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="golf" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <DetailHero
          image={course.image}
          title={course.nameKo}
          subtitle={course.name}
          badge={course.badge}
          backHref="/golf/"
          backLabel="GOLF COURSES"
        />

        <InfoBar items={[
          { icon: Flag, text: `${course.holes}홀 / Par ${course.par} / ${course.yards.toLocaleString()}yd` },
          ...(course.distance ? [{ icon: Clock, text: course.distance }] : []),
          ...(course.courseType ? [{ icon: MapPin, text: course.courseType }] : []),
        ]} />

        <div className="grid lg:grid-cols-3 gap-10">
          {/* 왼쪽: 소개 + 특징 */}
          <div className="lg:col-span-2">
            {course.description && (
              <div className="mb-8">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">코스 소개</h2>
                <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{course.description}</p>
              </div>
            )}

            {course.features.length > 0 && (
              <div className="pt-8 border-t border-navy-900/10">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">특징</h2>
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
          </div>

          {/* 오른쪽: 사이드바 */}
          <div className="space-y-6">
            <div className="bg-white border border-navy-900/5 p-6">
              <h3 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">정보</h3>
              <dl className="space-y-3 text-sm">
                {course.designer && (
                  <>
                    <dt className="text-navy-600/40 text-xs">설계</dt>
                    <dd className="text-navy-700 mb-3">{course.designer}</dd>
                  </>
                )}
                <dt className="text-navy-600/40 text-xs">코스 타입</dt>
                <dd className="text-navy-700 mb-3">{course.courseType}</dd>
                <dt className="text-navy-600/40 text-xs">거리</dt>
                <dd className="text-navy-700">{course.distance}</dd>
              </dl>
            </div>

            <Link
              href="/#cta"
              className="block text-center bg-navy-900 hover:bg-navy-800 text-white px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              예약 문의
            </Link>

            {golfPackage && (
              <Link href="/package/" className="block border border-navy-900/5 hover:border-gold-500/30 p-5 transition-colors">
                <p className="text-[10px] text-gold-500 tracking-[0.15em] uppercase mb-2">추천 패키지</p>
                <p className="text-sm font-medium mb-1">{golfPackage.name}</p>
                <p className="text-xs text-navy-600/40">{golfPackage.duration}</p>
              </Link>
            )}
          </div>
        </div>

        <RelatedItems
          title="다른 골프장"
          items={related}
          basePath="/golf/"
        />
      </main>
    </div>
  );
}
