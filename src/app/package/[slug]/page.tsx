import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle, Package } from 'lucide-react';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '../../components/SiteHeader';
import DetailHero from '../../components/DetailHero';
import InfoBar from '../../components/InfoBar';
import RelatedItems from '../../components/RelatedItems';

const packages = products.packages;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return { title: 'Not Found' };
  const desc = `${pkg.name} - ${pkg.duration}. ${pkg.description}`;
  return {
    title: pkg.name,
    description: desc,
    alternates: { canonical: `https://세부.com/package/${slug}/` },
    openGraph: {
      title: pkg.name,
      description: desc,
      url: `https://세부.com/package/${slug}/`,
      images: [{ url: pkg.image, alt: pkg.name }],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const related = packages
    .filter((p) => p.slug !== slug)
    .map((p) => ({ slug: p.slug, name: p.name, image: p.image, badge: p.badge }));

  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="package" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <DetailHero
          image={pkg.image}
          title={pkg.name}
          subtitle={pkg.duration}
          badge={pkg.badge}
          backHref="/package/"
          backLabel="PACKAGES"
        />

        <InfoBar items={[
          { icon: Clock, text: pkg.duration },
          { icon: Package, text: `포함 ${pkg.includes.length}개 항목` },
          ...(pkg.badge ? [{ icon: CheckCircle, text: pkg.badge }] : []),
        ]} />

        <div className="grid lg:grid-cols-3 gap-10">
          {/* 왼쪽: 소개 + 포함 항목 */}
          <div className="lg:col-span-2">
            {pkg.description && (
              <div className="mb-8">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">패키지 소개</h2>
                <p className="text-sm text-navy-600/60 leading-relaxed whitespace-pre-line">{pkg.description}</p>
              </div>
            )}

            {pkg.includes.length > 0 && (
              <div className="pt-8 border-t border-navy-900/10">
                <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">포함 항목</h2>
                <ul className="space-y-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="text-sm text-navy-600/60 flex items-start gap-2.5">
                      <span className="text-gold-400 mt-0.5">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 오른쪽: 사이드바 */}
          <div className="space-y-6">
            <div className="bg-white border border-navy-900/5 p-6">
              <h3 className="text-xs tracking-[0.2em] text-gold-500 mb-4 uppercase">패키지 정보</h3>
              <dl className="space-y-3 text-sm">
                <dt className="text-navy-600/40 text-xs">일정</dt>
                <dd className="text-navy-700 mb-3">{pkg.duration}</dd>
                {pkg.badge && (
                  <>
                    <dt className="text-navy-600/40 text-xs">등급</dt>
                    <dd className="text-navy-700 mb-3">{pkg.badge}</dd>
                  </>
                )}
                <dt className="text-navy-600/40 text-xs">포함 항목</dt>
                <dd className="text-navy-700">{pkg.includes.join(', ')}</dd>
              </dl>
            </div>

            <Link
              href="/#cta"
              className="block text-center bg-navy-900 hover:bg-navy-800 text-white px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              예약 문의
            </Link>
          </div>
        </div>

        <RelatedItems
          title="다른 패키지"
          items={related}
          basePath="/package/"
        />
      </main>
    </div>
  );
}
