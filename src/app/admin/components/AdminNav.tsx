'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Flag, Hotel, Waves, CalendarCheck } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard, exact: true },
  { href: '/admin/content/golf', label: '골프장', icon: Flag },
  { href: '/admin/content/resort', label: '리조트', icon: Hotel },
  { href: '/admin/content/activity', label: '액티비티', icon: Waves },
  { href: '/admin/bookings', label: '예약 관리', icon: CalendarCheck },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
