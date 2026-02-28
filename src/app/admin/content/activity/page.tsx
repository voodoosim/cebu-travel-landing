import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import AdminNav from '../../components/AdminNav';
import ActivityManager from './ActivityManager';

export const dynamic = 'force-dynamic';

export default async function ActivityAdminPage() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  if (session.user.role !== 'ADMIN') redirect('/');

  const activities = await prisma.activity.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <AdminNav />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <ActivityManager activities={activities} />
      </main>
      <Footer />
    </div>
  );
}
