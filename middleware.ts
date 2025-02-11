import NextAuth from 'next-auth';
import authConfig from './auth.config';

// NextAuth를 사용하여 미들웨어(middleware) 생성
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    /*
     * 특정 경로를 제외한 모든 요청 경로에 대해 미들웨어 적용
     * 제외되는 경로:
     * - `api` (API 라우트)
     * - `_next/static` (Next.js 정적 파일)
     * - `_next/image` (이미지 최적화 파일)
     * - `favicon.ico` (파비콘 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
