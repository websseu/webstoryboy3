import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 표시
export function formatDate(date: string | Date): string {
  if (!date) return '-' // 날짜가 없을 경우 예외 처리
  const parsedDate = date instanceof Date ? date : new Date(date) // Date 변환

  const formattedDate = parsedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return formattedDate.replace(/\.$/, '') // 마지막 점 제거
}
