import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../../components/SiteHeader';
import DetailHero from '../../components/DetailHero';
import InfoBar from '../../components/InfoBar';
import RelatedItems from '../../components/RelatedItems';

const resorts = products.resorts;

export function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);
  if (!resort) return { title: 'Not Found' };
  const descParts = [resort.name];
  if (resort.grade) descParts.push(resort.grade);
  if (resort.area) descParts.push(resort.area);
  if (resort.feature) descParts.push(resort.feature);
  const desc = descParts.join(' - ') + '. 세부 리조트 예약 대행.';
  return {
    title: `${resort.name} - ${resort.grade || '리조트'}`,
    description: desc,
    alternates: { canonical: `https://세부.com/resort/${slug}/` },
    openGraph: {
      title: `${resort.name} - ${resort.grade || '리조트'}`,
      description: desc,
      url: `https://세부.com/resort/${slug}/`,
      images: [{ url: resort.image, alt: resort.nameKo }],
    },
  };
}

export default async function ResortDetailPage({ params }: Props) {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);
  if (!resort) notFound();

  const related = resorts
    .filter((r) => r.slug !== slug)
    .map((r) => ({ slug: r.slug, name: r.nameKo, image: r.image }));

  const resortPackage = products.packages.find((p) => p.id === 'resort-full-package');

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="resort" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <DetailHero
          image={resort.image}
          title={resort.nameKo}
          subtitle={resort.name}
          badge={resort.grade}
          backHref="/resort/"
          backLabel="RESORTS"
        />

        <InfoBar items={[
          { icon: MapPin, text: resort.area },
          { icon: Star, text: resort.grade },
          { icon: Sparkles, text: resort.feature },
        ]} />

        <div className="grid lg:grid-cols-3 gap-10">
          {/* 왼쪽: 소개 + 시설 */}
          <div className="lg:col-span-2">
            {resort.description && (
              <div className="mb-8">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">리조트 소개</h2>
                <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{resort.description}</p>
              </div>
            )}

            {resort.features.length > 0 && (
              <div className="pt-8 border-t border-navy-900/10">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">시설 & 서비스</h2>
                <ul className="space-y-2.5">
                  {resort.features.map((f) => (
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
                <dt className="text-navy-600/40 text-xs">등급</dt>
                <dd className="text-navy-700 mb-3">{resort.grade}</dd>
                <dt className="text-navy-600/40 text-xs">지역</dt>
                <dd className="text-navy-700 mb-3">{resort.area}</dd>
                <dt className="text-navy-600/40 text-xs">주요 시설</dt>
                <dd className="text-navy-700">{resort.feature}</dd>
              </dl>
            </div>

            <Link
              href="/#cta"
              className="block text-center bg-navy-900 hover:bg-navy-800 text-white px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              예약 문의
            </Link>

            {resortPackage && (
              <Link href="/package/" className="block border border-navy-900/5 hover:border-gold-500/30 p-5 transition-colors">
                <p className="text-[10px] text-gold-500 tracking-[0.15em] uppercase mb-2">추천 패키지</p>
                <p className="text-sm font-medium mb-1">{resortPackage.name}</p>
                <p className="text-xs text-navy-600/40">{resortPackage.duration}</p>
              </Link>
            )}
          </div>
        </div>

        <RelatedItems
          title="다른 리조트"
          items={related}
          basePath="/resort/"
        />
      </main>
    </div>
  );
}
