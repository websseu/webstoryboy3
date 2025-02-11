import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignInForm from './signin-form'

export const metadata: Metadata = {
  title: '로그인',
}

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <section className='max-w-[500px]'>
      <div className='border border-black rounded-md p-10'>
        <h2 className='text-2xl text-center font-nexon mb-6'>로그인</h2>
        <SignInForm />
      </div>
    </section>
  )
}
