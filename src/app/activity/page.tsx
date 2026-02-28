import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '세부 관광 & 액티비티',
  description: '골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.',
};

const activityImages: Record<string, string> = {
  'island-hopping':
    'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800',
  'whale-shark':
    'https://images.pexels.com/photos/7001499/pexels-photo-7001499.jpeg?auto=compress&cs=tinysrgb&w=800',
  'kawasan-falls':
    'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=800',
  'diving':
    'https://images.pexels.com/photos/68767/pexels-photo-68767.jpeg?auto=compress&cs=tinysrgb&w=800',
  'city-tour':
    'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
  'bohol-tour':
    'https://images.pexels.com/photos/32156797/pexels-photo-32156797.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const DEFAULT_ACTIVITY_IMAGE =
  'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800';

export default async function ActivityListPage() {
  const activities = await prisma.activity.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">관광 & 액티비티</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            골프 외에도 세부에서 즐길 수 있는 다양한 액티비티를 예약해 드립니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {activities.map((a) => {
            const imageSrc = activityImages[a.slug] || DEFAULT_ACTIVITY_IMAGE;
            return (
              <Link
                key={a.id}
                href={`/activity/${a.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={a.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  {a.icon && <span className="text-3xl mb-3 block">{a.icon}</span>}
                  <h3 className="font-bold text-slate-900 mb-2">{a.name}</h3>
                  {a.description && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {a.description}
                    </p>
                  )}
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
