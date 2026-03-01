interface PageHeroProps {
  label: string;
  title: string;
  description: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <div className="text-center mb-20">
      <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">{label}</p>
      <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-serif)] text-navy-900 mb-4">{title}</h1>
      <div className="line-gold mx-auto mb-6" />
      <p className="text-navy-600/60 max-w-xl mx-auto text-sm leading-relaxed">{description}</p>
    </div>
  );
}
