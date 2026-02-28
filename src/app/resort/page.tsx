import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '세부 리조트 & 호텔',
  description: '세부 최고의 리조트와 호텔을 예약 대행합니다.',
};

const DEFAULT_RESORT_IMAGE =
  'https://images.pexels.com/photos/6437583/pexels-photo-6437583.jpeg?auto=compress&cs=tinysrgb&w=800';

export default async function ResortListPage() {
  const resorts = await prisma.resort.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">리조트 & 호텔</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            세부 최고의 리조트와 호텔을 예약 대행합니다. 골프 패키지와 묶으면 특가 안내.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resorts.map((r) => {
            const images = (r.images as string[]) || [];
            const imageSrc = images[0] || DEFAULT_RESORT_IMAGE;
            return (
              <Link
                key={r.id}
                href={`/resort/${r.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={r.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{r.name}</h3>
                    {r.grade && (
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                        {r.grade}
                      </span>
                    )}
                  </div>
                  {r.area && <p className="text-xs text-slate-400 mb-2">{r.area}</p>}
                  {r.feature && <p className="text-sm text-slate-600">{r.feature}</p>}
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
