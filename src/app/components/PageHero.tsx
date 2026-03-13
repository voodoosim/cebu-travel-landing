import Image from 'next/image';

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  bgImage?: string;
}

export default function PageHero({ label, title, description, bgImage }: PageHeroProps) {
  if (bgImage) {
    return (
      <div className="relative w-full h-72 md:h-96 mb-16 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold-300 text-xs tracking-[0.35em] uppercase mb-4">{label}</p>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
          <div className="w-12 h-px bg-gold-400/70 mb-5" />
          <p className="text-white/70 max-w-xl text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-20">
      <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">{label}</p>
      <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-navy-900 mb-4">{title}</h1>
      <div className="line-gold mx-auto mb-6" />
      <p className="text-navy-600/60 max-w-xl mx-auto text-sm leading-relaxed">{description}</p>
    </div>
  );
}
