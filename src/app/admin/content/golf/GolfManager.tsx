'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import type { GolfCourse } from '@prisma/client';
import {
  upsertGolfCourse,
  deleteGolfCourse,
  moveGolfCourseUp,
  moveGolfCourseDown,
} from '../actions';

interface Props {
  courses: GolfCourse[];
}

type ModalState = GolfCourse | 'new' | null;

export default function GolfManager({ courses }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingCourse, setEditingCourse] = useState<ModalState>(null);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteGolfCourse(id);
      router.refresh();
    });
  };

  const handleMoveUp = (id: string) => {
    startTransition(async () => {
      await moveGolfCourseUp(id);
      router.refresh();
    });
  };

  const handleMoveDown = (id: string) => {
    startTransition(async () => {
      await moveGolfCourseDown(id);
      router.refresh();
    });
  };

  const course = editingCourse !== 'new' ? editingCourse : null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          골프장 관리 ({courses.length}개)
        </h1>
        <button
          onClick={() => setEditingCourse('new')}
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          + 새 골프장
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        {courses.length === 0 ? (
          <p className="text-slate-500 text-sm p-8">등록된 골프장이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium w-12">순서</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">한국어명</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">슬러그</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">공개</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">동작</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, idx) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-400 text-xs">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{c.nameKo}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs font-mono">{c.slug}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          c.isPublished
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {c.isPublished ? '공개' : '비공개'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveUp(c.id)}
                          disabled={isPending || idx === 0}
                          className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveDown(c.id)}
                          disabled={isPending || idx === courses.length - 1}
                          className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => setEditingCourse(c)}
                          disabled={isPending}
                          className="text-xs px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded disabled:opacity-50"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={isPending}
                          className="text-xs px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded disabled:opacity-50"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingCourse !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setEditingCourse(null)}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingCourse === 'new' ? '새 골프장 추가' : '골프장 수정'}
              </h2>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form
              action={async (formData) => {
                await upsertGolfCourse(formData);
                setEditingCourse(null);
                router.refresh();
              }}
            >
              <input type="hidden" name="id" value={course?.id || ''} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    한국어 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nameKo"
                    required
                    defaultValue={course?.nameKo || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    영문 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={course?.name || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    URL 슬러그 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    defaultValue={course?.slug || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">홀 수</label>
                  <input
                    type="number"
                    name="holes"
                    defaultValue={course?.holes ?? 18}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">파</label>
                  <input
                    type="number"
                    name="par"
                    defaultValue={course?.par ?? 72}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">야드</label>
                  <input
                    type="number"
                    name="yards"
                    defaultValue={course?.yards ?? ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">코스 유형</label>
                  <input
                    type="text"
                    name="courseType"
                    defaultValue={course?.courseType || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">공항 거리</label>
                  <input
                    type="text"
                    name="distance"
                    defaultValue={course?.distance || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">배지</label>
                  <input
                    type="text"
                    name="badge"
                    placeholder="명문, 가성비 등"
                    defaultValue={course?.badge || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="golf-isPublished"
                    defaultChecked={course ? course.isPublished : true}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <label htmlFor="golf-isPublished" className="text-sm font-medium text-slate-700">
                    공개
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  특징 (줄바꿈 구분)
                </label>
                <textarea
                  name="features"
                  rows={4}
                  defaultValue={course?.features?.join('\n') || ''}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  이미지 URL (줄바꿈 구분)
                </label>
                <textarea
                  name="images"
                  rows={3}
                  defaultValue={course?.images?.join('\n') || ''}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  {editingCourse === 'new' ? '추가' : '저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
