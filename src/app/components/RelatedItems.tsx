import Image from "next/image";
import Link from "next/link";

interface RelatedItem {
  slug: string;
  name: string;
  image: string;
  badge?: string;
}

interface RelatedItemsProps {
  title: string;
  items: RelatedItem[];
  basePath: string;
}

export default function RelatedItems({ title, items, basePath }: RelatedItemsProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xs tracking-[0.2em] text-gold-500 mb-6 uppercase">{title}</h2>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`${basePath}${item.slug}/`}
            className="group flex-shrink-0 w-56 snap-start"
          >
            <div className="relative h-36 overflow-hidden mb-3">
              <Image src={item.image} alt={item.name} fill sizes="224px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              {item.badge && (
                <div className="absolute top-2 right-2 bg-gold-500 text-navy-900 px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] uppercase">
                  {item.badge}
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium group-hover:text-gold-500 transition-colors">{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
