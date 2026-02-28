import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin } from 'lucide-react';
import products from '@/data/products.json';

export const metadata = {
  title: '세부 골프장',
  description: '세부 전역 6개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.',
};

const courses = products.golf;

export default function GolfListPage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <header className="border-b border-gold-500/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
            CEBUGUIDE
          </Link>
          <nav className="flex items-center gap-8 text-xs tracking-[0.2em]">
            <Link href="/golf/" className="text-gold-400">GOLF</Link>
            <Link href="/resort/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">RESORTS</Link>
            <Link href="/activity/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">ACTIVITIES</Link>
            <Link href="/" className="text-gold-300/40 hover:text-gold-300/70 transition-colors">HOME</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 mb-4">GOLF COURSES</p>
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-ivory mb-4">세부 골프장</h1>
          <div className="line-gold mx-auto mb-6" />
          <p className="text-gold-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            세부 전역 {courses.length}개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-gold-500/10">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/golf/${course.slug}/`}
              className="group bg-navy-900 overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.nameKo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                {course.badge && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {course.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-ivory font-[family-name:var(--font-serif)] text-lg">{course.nameKo}</p>
                  <p className="text-gold-300/50 text-xs mt-0.5">{course.name}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-3 text-[11px] text-gold-300/50 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Flag className="w-3 h-3 text-gold-500/50" />
                    {course.holes}H / Par {course.par} / {course.yards.toLocaleString()}yd
                  </span>
                  {course.distance && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gold-500/50" />
                      {course.distance}
                    </span>
                  )}
                  {course.courseType && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold-500/50" />
                      {course.courseType}
                    </span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {course.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-gold-200/40 flex items-start gap-2">
                      <span className="text-gold-500/40 mt-0.5">-</span>
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
