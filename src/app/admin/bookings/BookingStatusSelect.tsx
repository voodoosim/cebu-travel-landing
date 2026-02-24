'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = [
  { value: 'INQUIRY', label: '문의 접수', color: 'text-blue-700' },
  { value: 'QUOTE_SENT', label: '견적 발송', color: 'text-amber-700' },
  { value: 'CONFIRMED', label: '예약 확정', color: 'text-emerald-700' },
  { value: 'COMPLETED', label: '완료', color: 'text-slate-600' },
  { value: 'CANCELLED', label: '취소', color: 'text-red-600' },
];

export default function BookingStatusSelect({ bookingId, currentStatus }: { bookingId: string; currentStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/booking/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const currentColor = STATUSES.find((s) => s.value === status)?.color || 'text-slate-600';

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className={`text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 outline-none ${currentColor} ${saving ? 'opacity-50' : ''}`}
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
