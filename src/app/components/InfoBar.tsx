import type { ComponentType } from "react";

interface InfoBarItem {
  icon: ComponentType<{ className?: string }>;
  text: string;
}

interface InfoBarProps {
  items: InfoBarItem[];
}

export default function InfoBar({ items }: InfoBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-2 text-xs text-navy-600/60 border border-navy-900/10 px-4 py-2">
          <item.icon className="w-3.5 h-3.5 text-gold-500" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
