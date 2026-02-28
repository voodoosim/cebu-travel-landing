"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs tracking-[0.15em] text-gold-300/50 hover:text-red-400 transition-colors"
    >
      LOGOUT
    </button>
  );
}
