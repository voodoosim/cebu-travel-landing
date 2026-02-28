'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import type { Activity } from '@prisma/client';
import { upsertActivity, deleteActivity, moveActivityUp, moveActivityDown } from '../actions';

interface Props {
  activities: Activity[];
}

type ModalState = Activity | 'new' | null;

export default function ActivityManager({ activities }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingActivity, setEditingActivity] = useState<ModalState>(null);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteActivity(id);
      router.refresh();
    });
  };

  const handleMoveUp = (id: string) => {
    startTransition(async () => {
      await moveActivityUp(id);
      router.refresh();
    });
  };

  const handleMoveDown = (id: string) => {
    startTransition(async () => {
      await moveActivityDown(id);
      router.refresh();
    });
  };

  const activity = editingActivity !== 'new' ? editingActivity : null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          액티비티 관리 ({activities.length}개)
        </h1>
        <button
          onClick={() => setEditingActivity('new')}
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          + 새 액티비티
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-sm p-8">등록된 액티비티가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-4 text-slate-500 font-medium w-12">순서</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">이름</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">슬러그</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">아이콘</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">공개</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-medium">동작</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, idx) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-400 text-xs">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{a.name}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs font-mono">{a.slug}</td>
                    <td className="py-3 px-4 text-lg">{a.icon || '-'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          a.isPublished
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {a.isPublished ? '공개' : '비공개'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveUp(a.id)}
                          disabled={isPending || idx === 0}
                          className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveDown(a.id)}
                          disabled={isPending || idx === activities.length - 1}
                          className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded disabled:opacity-30"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => setEditingActivity(a)}
                          disabled={isPending}
                          className="text-xs px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded disabled:opacity-50"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
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

      {editingActivity !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setEditingActivity(null)}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingActivity === 'new' ? '새 액티비티 추가' : '액티비티 수정'}
              </h2>
              <button
                onClick={() => setEditingActivity(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form
              action={async (formData) => {
                await upsertActivity(formData);
                setEditingActivity(null);
                router.refresh();
              }}
            >
              <input type="hidden" name="id" value={activity?.id || ''} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={activity?.name || ''}
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
                    defaultValue={activity?.slug || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">아이콘</label>
                  <input
                    type="text"
                    name="icon"
                    placeholder="이모지 입력"
                    defaultValue={activity?.icon || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">소요시간</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="예: 4시간"
                    defaultValue={activity?.duration || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">가격</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="예: $50~"
                    defaultValue={activity?.price || ''}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="activity-isPublished"
                    defaultChecked={activity ? activity.isPublished : true}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <label htmlFor="activity-isPublished" className="text-sm font-medium text-slate-700">
                    공개
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">설명</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={activity?.description || ''}
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
                  defaultValue={activity?.images?.join('\n') || ''}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingActivity(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  {editingActivity === 'new' ? '추가' : '저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
