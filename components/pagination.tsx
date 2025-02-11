import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  return (
    <>
      {totalPages > 1 && (
        <div className='flex items-center mt-4 font-nanum text-sm'>
          {/* 이전 페이지 버튼 */}
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className={`px-3 py-2 border rounded ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-disabled={currentPage === 1}
          >
            이전
          </Link>

          <span className='mx-2 text-zinc-800'>
            {currentPage} / {totalPages}
          </span>

          {/* 다음 페이지 버튼 */}
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-disabled={currentPage === totalPages}
          >
            다음
          </Link>
        </div>
      )}
    </>
  )
}
