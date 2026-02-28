import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Flag, Clock, MapPin } from 'lucide-react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '세부 골프장',
  description: '세부 전역 6개 명문 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.',
};

export default async function GolfListPage() {
  const courses = await prisma.golfCourse.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">세부 골프장</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            세부 전역 {courses.length}개 골프장. 예약부터 캐디, 카트, 차량까지 전부 대행합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const features = (course.features as string[]) || [];
            const images = (course.images as string[]) || [];
            return (
              <Link
                key={course.id}
                href={`/golf/${course.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <div className="relative h-52 overflow-hidden">
                  {images[0] && (
                    <Image
                      src={images[0]}
                      alt={course.nameKo}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {course.badge && (
                    <div className={`absolute top-3 right-3 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm ${course.badgeColor || 'bg-emerald-600 text-white'}`}>
                      {course.badge}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-lg">{course.nameKo}</p>
                    <p className="text-white/80 text-xs">{course.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Flag className="w-3.5 h-3.5" />
                      {course.holes}홀 / Par {course.par}{course.yards ? ` / ${course.yards.toLocaleString()}yd` : ''}
                    </span>
                    {course.distance && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.distance}
                      </span>
                    )}
                    {course.courseType && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {course.courseType}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {features.slice(0, 3).map((f: string) => (
                      <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">-</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
