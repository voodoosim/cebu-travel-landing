import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../../components/SiteHeader';
import DetailHero from '../../components/DetailHero';
import InfoBar from '../../components/InfoBar';
import RelatedItems from '../../components/RelatedItems';

const activities = products.activities;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) return { title: 'Not Found' };
  const desc = activity.description || `세부 ${activity.name} 예약`;
  return {
    title: activity.name,
    description: desc,
    alternates: { canonical: `https://cebu.sasori.dev/activity/${slug}/` },
    openGraph: {
      title: activity.name,
      description: desc,
      url: `https://cebu.sasori.dev/activity/${slug}/`,
      images: [{ url: activity.image, alt: activity.name }],
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = activities.find((a) => a.slug === slug);
  if (!activity) notFound();

  const related = activities
    .filter((a) => a.slug !== slug)
    .map((a) => ({ slug: a.slug, name: a.name, image: a.image }));

  const tourPackage = products.packages.find((p) => p.id === 'golf-tour-package');

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="activity" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <DetailHero
          image={activity.image}
          title={activity.name}
          badge={activity.duration}
          backHref="/activity/"
          backLabel="ACTIVITIES"
        />

        <InfoBar items={[
          { icon: Clock, text: activity.duration },
          ...(activity.features.length > 0 ? [{ icon: CheckCircle, text: activity.features[0] }] : []),
          ...(activity.features.length > 1 ? [{ icon: CheckCircle, text: activity.features[1] }] : []),
        ]} />

        <div className="grid lg:grid-cols-3 gap-10">
          {/* 왼쪽: 소개 + 포함 사항 */}
          <div className="lg:col-span-2">
            {activity.description && (
              <div className="mb-8">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">투어 소개</h2>
                <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{activity.description}</p>
              </div>
            )}

            {activity.features.length > 0 && (
              <div className="pt-8 border-t border-navy-900/10">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">포함 사항</h2>
                <ul className="space-y-2.5">
                  {activity.features.map((f) => (
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
                <dt className="text-navy-600/40 text-xs">소요 시간</dt>
                <dd className="text-navy-700 mb-3">{activity.duration}</dd>
                <dt className="text-navy-600/40 text-xs">주요 포인트</dt>
                <dd className="text-navy-700">{activity.features.slice(0, 2).join(', ')}</dd>
              </dl>
            </div>

            <Link
              href="/#cta"
              className="block text-center bg-navy-900 hover:bg-navy-800 text-white px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              예약 문의
            </Link>

            {tourPackage && (
              <Link href="/package/" className="block border border-navy-900/5 hover:border-gold-500/30 p-5 transition-colors">
                <p className="text-[10px] text-gold-500 tracking-[0.15em] uppercase mb-2">추천 패키지</p>
                <p className="text-sm font-medium mb-1">{tourPackage.name}</p>
                <p className="text-xs text-navy-600/40">{tourPackage.duration}</p>
              </Link>
            )}
          </div>
        </div>

        <RelatedItems
          title="다른 액티비티"
          items={related}
          basePath="/activity/"
        />
      </main>
    </div>
  );
}
