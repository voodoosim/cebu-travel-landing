import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

const DEFAULT_RESORT_IMAGE = 'https://images.pexels.com/photos/6437583/pexels-photo-6437583.jpeg?auto=compress&cs=tinysrgb&w=1200';

const resortImages: Record<string, string> = {
  'shangri-la':    'https://images.pexels.com/photos/6437583/pexels-photo-6437583.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'crimson':       'https://images.pexels.com/photos/24807132/pexels-photo-24807132.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'plantation-bay':'https://images.pexels.com/photos/30037427/pexels-photo-30037427.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'jpark':         'https://images.pexels.com/photos/18129533/pexels-photo-18129533.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'movenpick':     'https://images.pexels.com/photos/6437583/pexels-photo-6437583.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'radisson-blu':  'https://images.pexels.com/photos/24807132/pexels-photo-24807132.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'seda-ayala':    'https://images.pexels.com/photos/30037427/pexels-photo-30037427.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'bai-hotel':     'https://images.pexels.com/photos/18129533/pexels-photo-18129533.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'bluewater':     'https://images.pexels.com/photos/6437583/pexels-photo-6437583.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = await prisma.resort.findUnique({ where: { slug } });
  if (!resort) return { title: 'Not Found' };
  return {
    title: `${resort.name} - ${resort.grade || '리조트'}`,
    description: `${resort.name} - ${resort.area || '세부'}. ${resort.feature || ''}`,
  };
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = await prisma.resort.findUnique({ where: { slug } });
  if (!resort || !resort.isPublished) notFound();

  const features = (resort.features as string[]) || [];
  const dbImages = (resort.images as string[]) || [];
  const heroImage = dbImages[0] || resortImages[slug] || DEFAULT_RESORT_IMAGE;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/resort" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          리조트 목록
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          <div className="relative h-72 w-full">
            <Image
              src={heroImage}
              alt={resort.name}
              fill
              className="object-cover"
              priority
            />
            {resort.grade && (
              <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
                {resort.grade}
              </span>
            )}
          </div>

          <div className="p-8">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{resort.name}</h1>
            {resort.grade && (
              <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                {resort.grade}
              </span>
            )}
          </div>
          {resort.nameKo && <p className="text-slate-500 mb-2">{resort.nameKo}</p>}
          {resort.area && <p className="text-sm text-slate-400 mb-6">{resort.area}</p>}

          {resort.feature && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">주요 특징</h2>
              <p className="text-slate-600">{resort.feature}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">시설</h2>
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

          {resort.description && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">상세 정보</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{resort.description}</p>
            </div>
          )}

          <Link
            href={`/booking?type=RESORT&id=${resort.id}`}
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
