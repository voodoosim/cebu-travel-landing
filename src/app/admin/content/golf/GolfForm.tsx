'use client';

import type { GolfCourse } from '@prisma/client';
import { upsertGolfCourse } from '../actions';

interface GolfFormProps {
  course?: GolfCourse | null;
}

export default function GolfForm({ course }: GolfFormProps) {
  const featuresValue = Array.isArray(course?.features)
    ? (course.features as string[]).join('\n')
    : '';
  const imagesValue = Array.isArray(course?.images)
    ? (course.images as string[]).join('\n')
    : '';

  return (
    <form action={upsertGolfCourse} className="space-y-6">
      <input type="hidden" name="id" value={course?.id || ''} />

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
            defaultValue={course?.slug || ''}
            placeholder="alta-vista"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nameKo" className="text-sm font-medium text-slate-700">
            한국어명 <span className="text-red-500">*</span>
          </label>
          <input
            id="nameKo"
            name="nameKo"
            type="text"
            required
            defaultValue={course?.nameKo || ''}
            placeholder="알타비스타 골프클럽"
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
            defaultValue={course?.name || ''}
            placeholder="Alta Vista Golf Club"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="courseType" className="text-sm font-medium text-slate-700">
            코스 유형
          </label>
          <input
            id="courseType"
            name="courseType"
            type="text"
            defaultValue={course?.courseType || ''}
            placeholder="산악형 / 평지형"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="holes" className="text-sm font-medium text-slate-700">
            홀 수
          </label>
          <input
            id="holes"
            name="holes"
            type="number"
            defaultValue={course?.holes ?? 18}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="par" className="text-sm font-medium text-slate-700">
            파 (Par)
          </label>
          <input
            id="par"
            name="par"
            type="number"
            defaultValue={course?.par ?? 72}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="yards" className="text-sm font-medium text-slate-700">
            야드 (Yards)
          </label>
          <input
            id="yards"
            name="yards"
            type="number"
            defaultValue={course?.yards ?? ''}
            placeholder="7200"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="distance" className="text-sm font-medium text-slate-700">
            공항 거리
          </label>
          <input
            id="distance"
            name="distance"
            type="text"
            defaultValue={course?.distance || ''}
            placeholder="공항 30~50분"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="designer" className="text-sm font-medium text-slate-700">
            설계자
          </label>
          <input
            id="designer"
            name="designer"
            type="text"
            defaultValue={course?.designer || ''}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="greenFee" className="text-sm font-medium text-slate-700">
            그린피
          </label>
          <input
            id="greenFee"
            name="greenFee"
            type="text"
            defaultValue={course?.greenFee || ''}
            placeholder="USD 80~120"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="badge" className="text-sm font-medium text-slate-700">
            배지 텍스트
          </label>
          <input
            id="badge"
            name="badge"
            type="text"
            defaultValue={course?.badge || ''}
            placeholder="인기"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="badgeColor" className="text-sm font-medium text-slate-700">
            배지 색상
          </label>
          <input
            id="badgeColor"
            name="badgeColor"
            type="text"
            defaultValue={course?.badgeColor || ''}
            placeholder="emerald / amber / red"
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
            defaultValue={course?.sortOrder ?? 0}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={course?.isPublished ?? true}
              className="w-4 h-4 accent-emerald-600"
            />
            <span className="text-sm font-medium text-slate-700">공개 여부</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="features" className="text-sm font-medium text-slate-700">
          특징 (줄바꿈으로 구분)
        </label>
        <textarea
          id="features"
          name="features"
          rows={4}
          defaultValue={featuresValue}
          placeholder="산악형 코스&#10;멋진 전망&#10;카디 포함"
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
          {course ? '수정 저장' : '골프장 추가'}
        </button>
        <a href="/admin/content/golf" className="text-sm text-slate-500 hover:text-slate-700">
          취소
        </a>
      </div>
    </form>
  );
}
