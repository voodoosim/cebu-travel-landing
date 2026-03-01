import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DetailHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  backHref: string;
  backLabel: string;
}

export default function DetailHero({ image, title, subtitle, badge, backHref, backLabel }: DetailHeroProps) {
  return (
    <div className="relative h-64 sm:h-[400px] overflow-hidden mb-10">
      <Image src={image} alt={title} fill sizes="(min-width: 768px) 896px, 100vw" className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-navy-900/30" />

      <Link
        href={backHref}
        className="absolute top-5 left-5 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {backLabel}
      </Link>

      {badge && (
        <div className="absolute top-5 right-5 bg-gold-500 text-navy-900 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase">
          {badge}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-serif)] text-white mb-1">{title}</h1>
        {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
