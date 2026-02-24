export { auth as proxy } from '@/lib/auth';

export const config = {
  matcher: ['/mypage/:path*', '/admin/:path*', '/booking/:path*'],
};
