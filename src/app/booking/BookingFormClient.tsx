'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  serviceType: string;
  golfCourseId?: string;
  resortId?: string;
  activityId?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  GOLF: '골프',
  RESORT: '리조트',
  ACTIVITY: '액티비티',
  PACKAGE: '패키지',
  CUSTOM: '기타',
};

export default function BookingFormClient({ serviceType, golfCourseId, resortId, activityId }: Props) {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          golfCourseId,
          resortId,
          activityId,
          startDate: startDate || null,
          endDate: endDate || null,
          guests,
          message,
        }),
      });

      if (!res.ok) {
        setError('예약 문의 중 오류가 발생했습니다.');
        return;
      }

      router.push('/mypage?booked=1');
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">서비스 유형</label>
        <p className="text-sm bg-slate-50 px-4 py-2.5 rounded-lg text-slate-600">
          {SERVICE_LABELS[serviceType] || serviceType}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">인원</label>
        <input
          type="number"
          min={1}
          max={50}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-32 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">요청사항</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="날짜, 인원, 선호 사항 등을 자유롭게 적어주세요."
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white py-3 rounded-xl font-semibold transition-colors"
      >
        {submitting ? '전송 중...' : '예약 문의 보내기'}
      </button>
    </form>
  );
}
