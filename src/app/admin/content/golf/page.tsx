import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import Link from 'next/link';
import GolfManager from './GolfManager';

export const dynamic = 'force-dynamic';

export default async function GolfAdminPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const courses = await prisma.golfCourse.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-6">
          <Link href="/admin" className="text-sm text-slate-500 hover:text-emerald-600">
            &larr; 어드민
          </Link>
        </div>
        <GolfManager courses={courses} />
      </main>
      <Footer />
    </div>
  );
}
