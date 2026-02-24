'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === 'loading') {
    return <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
      >
        로그인
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full border border-slate-200"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
            {session.user.name?.[0] || '?'}
          </div>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900 truncate">{session.user.name}</p>
              <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
            </div>
            <Link
              href="/mypage"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              마이페이지
            </Link>
            {session.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                관리자
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-50"
            >
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}
