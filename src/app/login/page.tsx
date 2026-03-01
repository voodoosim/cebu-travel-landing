import { signIn } from "@/auth";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-[family-name:var(--font-serif)] text-ivory tracking-[0.15em]">
              CEBUGUIDE
            </h1>
          </Link>
          <div className="line-gold mx-auto mt-4" />
        </div>

        <div className="border border-gold-500/20 p-10">
          <p className="text-gold-200/60 text-sm text-center mb-8">
            로그인하여 예약 현황을 확인하세요
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/mypage" });
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 border border-gold-500/30 px-4 py-3.5 text-ivory/80 text-sm hover:border-gold-500/60 hover:text-ivory transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Google로 로그인
            </button>
          </form>
        </div>

        <p className="text-center mt-8">
          <Link href="/" className="text-xs text-gold-300/40 tracking-[0.15em] hover:text-gold-300/60 transition-colors">
            BACK TO HOME
          </Link>
        </p>
      </div>
    </div>
  );
}
