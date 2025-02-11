'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [message, setMessage] = useState('이메일 인증을 확인 중입니다...')

  useEffect(() => {
    if (!token) {
      setMessage('잘못된 접근입니다.')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`)
        const result = await response.json()

        if (result.success) {
          setMessage(
            '이메일 인증이 완료되었습니다. 로그인 페이지로 이동합니다.'
          )
          setTimeout(() => router.push('/sign-in'), 5000)
        } else {
          setMessage(result.message || '❌ 이메일 인증에 실패하였습니다.')
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생:', error)
        setMessage('서버 오류가 발생했습니다. 다시 시도해주세요.')
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <section className='flex items-center justify-center'>
      <p className='text-destructive font-nanum mt-44'>{message} 🕵️‍♀️✨</p>
    </section>
  )
}
