'use client';

import type { Activity } from '@prisma/client';
import { upsertActivity } from '../actions';

interface ActivityFormProps {
  activity?: Activity | null;
}

export default function ActivityForm({ activity }: ActivityFormProps) {
  const featuresValue = Array.isArray(activity?.features)
    ? (activity.features as string[]).join('\n')
    : '';
  const imagesValue = Array.isArray(activity?.images)
    ? (activity.images as string[]).join('\n')
    : '';

  return (
    <form action={upsertActivity} className="space-y-6">
      <input type="hidden" name="id" value={activity?.id || ''} />

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
            defaultValue={activity?.slug || ''}
            placeholder="island-hopping"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={activity?.name || ''}
            placeholder="Island Hopping"
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
            defaultValue={activity?.nameKo || ''}
            placeholder="아일랜드 호핑"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="icon" className="text-sm font-medium text-slate-700">
            아이콘
          </label>
          <input
            id="icon"
            name="icon"
            type="text"
            defaultValue={activity?.icon || ''}
            placeholder="🏝️ 또는 아이콘 코드"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="duration" className="text-sm font-medium text-slate-700">
            소요 시간
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            defaultValue={activity?.duration || ''}
            placeholder="4~6시간"
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-slate-700">
            가격
          </label>
          <input
            id="price"
            name="price"
            type="text"
            defaultValue={activity?.price || ''}
            placeholder="USD 30~50"
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
            defaultValue={activity?.sortOrder ?? 0}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={activity?.isPublished ?? true}
              className="w-4 h-4 accent-emerald-600"
            />
            <span className="text-sm font-medium text-slate-700">공개 여부</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          설명
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={activity?.description || ''}
          placeholder="액티비티 상세 설명"
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
        />
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
          placeholder="스노클링 장비 포함&#10;점심 제공&#10;영어/한국어 가이드"
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
          {activity ? '수정 저장' : '액티비티 추가'}
        </button>
        <a href="/admin/content/activity" className="text-sm text-slate-500 hover:text-slate-700">
          취소
        </a>
      </div>
    </form>
  );
}
