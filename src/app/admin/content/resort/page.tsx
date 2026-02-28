import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { deleteResort } from '../actions';

export const dynamic = 'force-dynamic';

export default async function ResortAdminPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const resorts = await prisma.resort.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700">
              &larr; 어드민
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">리조트 관리</h1>
          </div>
          <Link
            href="/admin/content/resort/new"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            + 새 리조트 추가
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
          {resorts.length === 0 ? (
            <p className="text-slate-500 text-sm p-8">등록된 리조트가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">이름</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">한국어명</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">슬러그</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">등급</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">지역</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">공개</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">순서</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-medium">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {resorts.map((resort) => (
                    <tr key={resort.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-900">{resort.name}</td>
                      <td className="py-3 px-4 text-slate-600">{resort.nameKo || '-'}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs font-mono">{resort.slug}</td>
                      <td className="py-3 px-4 text-slate-600">{resort.grade || '-'}</td>
                      <td className="py-3 px-4 text-slate-600">{resort.area || '-'}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            resort.isPublished
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {resort.isPublished ? '공개' : '비공개'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{resort.sortOrder}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/content/resort/${resort.id}`}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium border border-emerald-200 px-2 py-1 rounded"
                          >
                            수정
                          </Link>
                          <form action={deleteResort}>
                            <input type="hidden" name="id" value={resort.id} />
                            <button
                              type="submit"
                              className="text-xs text-red-500 hover:text-red-700 font-medium border border-red-200 px-2 py-1 rounded"
                              onClick={(e) => {
                                if (!confirm(`"${resort.name}" 리조트를 삭제하시겠습니까?`)) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              삭제
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
