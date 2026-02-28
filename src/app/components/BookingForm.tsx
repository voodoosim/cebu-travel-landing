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
      <div className="border border-gold-500/30 p-10 text-center">
        <p className="text-gold-400 font-[family-name:var(--font-serif)] text-xl mb-2">
          문의가 접수되었습니다
        </p>
        <p className="text-gold-200/60 text-sm">
          빠른 시일 내에 연락드리겠습니다.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs text-gold-400 tracking-[0.15em] underline underline-offset-4 hover:text-gold-300 transition-colors"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-medium tracking-[0.15em] text-gold-300/80 mb-2 uppercase">
          Name
        </label>
        <input
          type="text"
          required
          maxLength={100}
          placeholder="홍길동"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-navy-800/50 border border-gold-500/20 text-ivory text-sm focus:border-gold-500/60 focus:outline-none transition-colors placeholder:text-gold-200/30"
        />
      </div>

      <div>
        <label className="block text-xs font-medium tracking-[0.15em] text-gold-300/80 mb-2 uppercase">
          Contact
        </label>
        <input
          type="text"
          required
          maxLength={100}
          placeholder="카톡 / 텔레그램 / 전화"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          className="w-full px-4 py-3 bg-navy-800/50 border border-gold-500/20 text-ivory text-sm focus:border-gold-500/60 focus:outline-none transition-colors placeholder:text-gold-200/30"
        />
      </div>

      <div>
        <label className="block text-xs font-medium tracking-[0.15em] text-gold-300/80 mb-2 uppercase">
          Package
        </label>
        <select
          required
          value={formData.tour}
          onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
          className="w-full px-4 py-3 bg-navy-800/50 border border-gold-500/20 text-ivory text-sm focus:border-gold-500/60 focus:outline-none transition-colors appearance-none"
        >
          <option value="" className="bg-navy-900">패키지 선택</option>
          {TOUR_OPTIONS.map((tour) => (
            <option key={tour} value={tour} className="bg-navy-900">
              {tour}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-[0.15em] text-gold-300/80 mb-2 uppercase">
          Message
        </label>
        <textarea
          maxLength={500}
          rows={3}
          placeholder="희망 날짜, 인원수, 요청사항"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 bg-navy-800/50 border border-gold-500/20 text-ivory text-sm focus:border-gold-500/60 focus:outline-none transition-colors resize-none placeholder:text-gold-200/30"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">
          전송에 실패했습니다. 다시 시도해주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "SENDING..." : "SUBMIT INQUIRY"}
      </button>
    </form>
  );
}
