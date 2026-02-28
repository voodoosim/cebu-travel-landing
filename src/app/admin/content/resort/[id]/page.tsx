import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import ResortForm from '../ResortForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditResortPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const { id } = await params;

  const resort = await prisma.resort.findUnique({ where: { id } });
  if (!resort) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/content/resort" className="text-sm text-slate-500 hover:text-slate-700">
            &larr; 리조트 목록
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{resort.name} 수정</h1>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow border border-slate-100">
          <ResortForm resort={resort} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
