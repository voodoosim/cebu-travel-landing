import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

const activityImages: Record<string, string> = {
  'island-hopping': 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'whale-shark':    'https://images.pexels.com/photos/7001499/pexels-photo-7001499.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'kawasan-falls':  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'diving':         'https://images.pexels.com/photos/68767/pexels-photo-68767.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'city-tour':      'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'bohol-tour':     'https://images.pexels.com/photos/32156797/pexels-photo-32156797.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await prisma.activity.findUnique({ where: { slug } });
  if (!activity) return { title: 'Not Found' };
  return {
    title: activity.name,
    description: activity.description || `세부 ${activity.name} 예약`,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await prisma.activity.findUnique({ where: { slug } });
  if (!activity || !activity.isPublished) notFound();

  const features = (activity.features as string[]) || [];
  const dbImages = (activity.images as string[]) || [];
  const heroImage = dbImages[0] || activityImages[slug] || activityImages['island-hopping'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/activity" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          액티비티 목록
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          <div className="relative h-72 w-full">
            <Image
              src={heroImage}
              alt={activity.name}
              fill
              className="object-cover"
              priority
            />
            {activity.icon && (
              <span className="absolute bottom-4 left-4 text-4xl drop-shadow-lg">{activity.icon}</span>
            )}
          </div>

          <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{activity.name}</h1>
          {activity.nameKo && <p className="text-slate-500 mb-6">{activity.nameKo}</p>}

          <div className="flex flex-wrap gap-4 mb-6">
            {activity.duration && (
              <span className="text-sm bg-slate-50 px-4 py-2 rounded-lg">{activity.duration}</span>
            )}
            {activity.price && (
              <span className="text-sm bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium">{activity.price}</span>
            )}
          </div>

          {activity.description && (
            <div className="mb-6">
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{activity.description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">포함사항</h2>
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

          <Link
            href={`/booking?type=ACTIVITY&id=${activity.id}`}
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            예약 문의
          </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
