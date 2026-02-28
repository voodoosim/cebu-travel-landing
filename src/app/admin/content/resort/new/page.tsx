import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ResortForm from '../ResortForm';

export const dynamic = 'force-dynamic';

export default async function NewResortPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/content/resort" className="text-sm text-slate-500 hover:text-slate-700">
            &larr; 리조트 목록
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">새 리조트 추가</h1>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow border border-slate-100">
          <ResortForm resort={null} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
