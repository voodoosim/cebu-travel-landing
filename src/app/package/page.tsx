import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import products from '@/data/products.json';
import SiteHeader from '@/app/components/SiteHeader';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: '세부 맞춤 패키지',
  description: '골프, 리조트, 관광을 원하는 대로 조합하는 세부 맞춤 패키지.',
  alternates: { canonical: 'https://cebu.sasori.dev/package/' },
  openGraph: {
    title: '세부 맞춤 패키지',
    description: '골프, 리조트, 관광을 원하는 대로 조합하는 세부 맞춤 패키지.',
    url: 'https://cebu.sasori.dev/package/',
  },
};

const packages = products.packages;

export default function PackageListPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <SiteHeader active="package" />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <PageHero
          label="Packages"
          title="맞춤 패키지"
          description="골프, 리조트, 관광을 원하는 대로 조합. 일정과 예산에 맞춰 최적의 패키지를 안내합니다."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-navy-900/5 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-900/30" />
                {pkg.badge && (
                  <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase">
                    {pkg.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-5">
                  <p className="text-white/70 text-xs tracking-wider">{pkg.duration}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-serif)] text-lg text-navy-900 mb-2">{pkg.name}</h3>
                <p className="text-navy-600/50 text-sm leading-relaxed mb-5">{pkg.description}</p>
                <div className="border-t border-navy-900/10 pt-4">
                  <p className="text-[10px] tracking-[0.15em] text-gold-500 mb-3 uppercase">Includes</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((item) => (
                      <span key={item} className="text-[11px] text-navy-600/40 border border-navy-900/10 px-2.5 py-1 tracking-wider">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/#cta"
            className="inline-block bg-navy-900 hover:bg-navy-800 text-white px-10 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
          >
            INQUIRE NOW
          </Link>
        </div>
      </main>
    </div>
  );
}
