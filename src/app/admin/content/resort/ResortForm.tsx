'use client';

import type { Resort } from '@prisma/client';
import { upsertResort } from '../actions';

interface ResortFormProps {
  resort?: Resort | null;
}

export default function ResortForm({ resort }: ResortFormProps) {
  const featuresValue = Array.isArray(resort?.features)
    ? (resort.features as string[]).join('\n')
    : '';
  const imagesValue = Array.isArray(resort?.images)
    ? (resort.images as string[]).join('\n')
    : '';

  return (
    <form action={upsertResort} className="space-y-6">
      <input type="hidden" name="id" value={resort?.id || ''} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium text-slate-700">
            슬러그 <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={resort?.slug || ''}
            placeholder="shangri-la"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            영문명 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={resort?.name || ''}
            placeholder="Shangri-La Resort"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nameKo" className="text-sm font-medium text-slate-700">
            한국어명
          </label>
          <input
            id="nameKo"
            name="nameKo"
            type="text"
            defaultValue={resort?.nameKo || ''}
            placeholder="샹그릴라 리조트"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="grade" className="text-sm font-medium text-slate-700">
            등급
          </label>
          <input
            id="grade"
            name="grade"
            type="text"
            defaultValue={resort?.grade || ''}
            placeholder="5성급"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="area" className="text-sm font-medium text-slate-700">
            지역
          </label>
          <input
            id="area"
            name="area"
            type="text"
            defaultValue={resort?.area || ''}
            placeholder="막탄 / 세부시티"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="feature" className="text-sm font-medium text-slate-700">
            대표 특징
          </label>
          <input
            id="feature"
            name="feature"
            type="text"
            defaultValue={resort?.feature || ''}
            placeholder="해변 리조트"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sortOrder" className="text-sm font-medium text-slate-700">
            정렬 순서
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={resort?.sortOrder ?? 0}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={resort?.isPublished ?? true}
              className="w-4 h-4 accent-emerald-600"
            />
            <span className="text-sm font-medium text-slate-700">공개 여부</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="features" className="text-sm font-medium text-slate-700">
          특징 목록 (줄바꿈으로 구분)
        </label>
        <textarea
          id="features"
          name="features"
          rows={4}
          defaultValue={featuresValue}
          placeholder="프라이빗 비치&#10;인피니티 풀&#10;다이빙 센터"
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="images" className="text-sm font-medium text-slate-700">
          이미지 URL (줄바꿈으로 구분)
        </label>
        <textarea
          id="images"
          name="images"
          rows={4}
          defaultValue={imagesValue}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          {resort ? '수정 저장' : '리조트 추가'}
        </button>
        <a href="/admin/content/resort" className="text-sm text-slate-500 hover:text-slate-700">
          취소
        </a>
      </div>
    </form>
  );
}
