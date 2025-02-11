import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      // 보호된 경로 목록 (로그인이 필요한 페이지)
      const protectedPaths = [
        /\/checkout(\/.*)?/,
        /\/account(\/.*)?/,
        /\/admin(\/.*)?/,
      ];
      const { pathname } = request.nextUrl;

      // 보호된 경로에 해당하는 경우 로그인(auth)이 필요함
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;

      // 보호된 경로가 아니라면 인증 없이 접근 가능
      return true;
    },
  },
} satisfies NextAuthConfig;
