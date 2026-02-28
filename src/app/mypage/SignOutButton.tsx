"use client";

import { signOutAction } from "../actions/auth";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-xs tracking-[0.15em] text-gold-300/50 hover:text-red-400 transition-colors"
      >
        LOGOUT
      </button>
    </form>
  );
}
