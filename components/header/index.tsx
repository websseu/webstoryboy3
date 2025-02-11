import Link from 'next/link'

import { MdStars } from 'react-icons/md'
import Menu from './menu'
import LeftButton from './left-button'
import RightButton from './right-button'

export default function Header() {
  return (
    <header className='border-b-2 border-black line'>
      <div className='flex items-center justify-center mx-4'>
        {/* 왼쪽 아이콘 */}
        <LeftButton />

        {/* 가운데 로고 */}
        <div className='md:my-2 my-1 bg-background md:px-4 px-2'>
          <Link
            href={'/'}
            className='flex items-center md:text-8xl sm:text-7xl text-6xl poppins uppercase font-black'
          >
            <span className='mr-[-0.5vw] inline-block'>st</span>
            <MdStars className='animate-color' />
            <span className='ml-[-0.5vw] inline-block'>ry</span>
          </Link>
        </div>

        {/* 오른쪽 유저 버튼 */}
        <RightButton />
      </div>

      {/* 메뉴 */}
      <Menu />
    </header>
  )
}
