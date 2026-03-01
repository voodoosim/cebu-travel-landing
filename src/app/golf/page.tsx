import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '@/app/components/SiteHeader';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: '세부 골프장',
  description: '세부 전역 6개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.',
  alternates: { canonical: 'https://세부.com/golf/' },
  openGraph: {
    title: '세부 골프장',
    description: '세부 전역 6개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.',
    url: 'https://세부.com/golf/',
  },
};

const courses = products.golf;

export default function GolfListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="golf" />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <PageHero
          label="Golf Courses"
          title="세부 골프장"
          description={`세부 전역 ${courses.length}개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.`}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/golf/${course.slug}/`}
              className="group bg-white border border-navy-900/5 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.nameKo}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/10 transition-colors" />
                {course.badge && (
                  <div className="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-sm text-gold-300 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {course.badge}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-1">{course.nameKo}</h3>
                <p className="text-navy-600/40 text-xs mb-3">{course.name}</p>
                <div className="flex flex-wrap gap-3 text-[11px] text-navy-600/50 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Flag className="w-3 h-3" aria-hidden="true" />
                    {course.holes}H / Par {course.par} / {course.yards.toLocaleString()}yd
                  </span>
                  {course.distance && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {course.distance}
                    </span>
                  )}
                  {course.courseType && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {course.courseType}
                    </span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {course.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-navy-600/50 flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5" aria-hidden="true">-</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
