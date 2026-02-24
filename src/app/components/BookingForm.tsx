"use client";

import { useState, FormEvent } from "react";

const TOUR_OPTIONS = [
  "골프 패키지",
  "골프 + 관광 패키지",
  "리조트 풀패키지",
  "관광/액티비티만",
  "맞춤 패키지 (직접 상담)",
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    tour: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", contact: "", tour: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-200">
        <p className="text-emerald-700 font-semibold text-lg mb-2">
          문의가 접수되었습니다!
        </p>
        <p className="text-emerald-600 text-sm">
          빠른 시일 내에 연락드리겠습니다.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-emerald-600 underline"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          이름 *
        </label>
        <input
          type="text"
          required
          maxLength={100}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          placeholder="홍길동"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          연락처 (카카오톡 / 전화 / 텔레그램) *
        </label>
        <input
          type="text"
          required
          maxLength={100}
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          placeholder="카카오톡 ID 또는 전화번호"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          패키지 *
        </label>
        <select
          required
          value={formData.tour}
          onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
        >
          <option value="">패키지 선택</option>
          {TOUR_OPTIONS.map((tour) => (
            <option key={tour} value={tour}>
              {tour}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          추가 메시지
        </label>
        <textarea
          maxLength={500}
          rows={3}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
          placeholder="희망 날짜, 인원수, 기타 요청사항"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">
          전송에 실패했습니다. 다시 시도해주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "전송 중..." : "문의하기"}
      </button>
    </form>
  );
}
