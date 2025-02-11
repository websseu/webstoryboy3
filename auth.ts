import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectToDatabase } from './lib/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import client from './lib/db/client';
import User from './lib/db/models/user.model';

import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      visitCount: number;
      image: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (credentials == null) return null;

        // 입력된 이메일과 일치하는 사용자 찾기
        // const user = await User.findOne({ email: credentials.email });

        // 로그인할 때마다 visitCount 1 증가
        const user = await User.findOneAndUpdate(
          { email: credentials.email },
          { $inc: { visitCount: 1 } }, // visitCount 값 증가
          { new: true, projection: 'name email role visitCount password image' } // 최신 값 반환
        );

        // 사용자가 존재하고 비밀번호가 저장되어 있는 경우
        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              visitCount: user.visitCount,
              image: user.image,
            };
          }
        }
        return null; // 인증 실패 시 null 반환
      },
    }),
  ],
  callbacks: {
    // JWT 생성 및 업데이트 처리
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        // 사용자의 이름이 없으면 데이터베이스에서 업데이트
        if (!user.name) {
          await connectToDatabase();
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split('@')[0], // 이메일 앞부분을 기본 이름으로 사용
            role: 'user', // 기본 역할 부여
          });
        }
        // JWT 토큰에 사용자 정보 저장
        token.name = user.name || user.email!.split('@')[0];
        token.role = (user as { role: string }).role;
        token.visitCount = (user as { visitCount: number }).visitCount ?? 0;
        token.image = user.image;
      }

      // 세션이 업데이트되었을 때 토큰의 name 정보 갱신
      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name;
      }
      return token;
    },
    // 세션 객체 생성 및 사용자 데이터 추가
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string; // 사용자 ID 추가
      session.user.role = token.role as string; // 역할(role) 추가
      session.user.name = token.name; // 이름 추가
      session.user.visitCount = token.visitCount as number; // 방문 횟수 추가
      session.user.image = token.image as string;
      // 세션 업데이트 시 이름 변경
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
  },
});
