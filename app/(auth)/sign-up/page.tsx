import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SignUpForm from './signup-form';

export const metadata: Metadata = {
  title: '회원가입',
};

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { callbackUrl } = searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <section className='max-w-[500px] mx-auto'>
      <div className='border border-black rounded-md p-10'>
        <h2 className='text-2xl text-center font-nexon mb-6'>회원가입</h2>
        <SignUpForm />
      </div>
    </section>
  );
}
