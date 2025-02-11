import { APP_COPYRIGHT, APP_DESCRIPTION, APP_NAME } from '@/lib/constants'

export default async function Footer() {
  return (
    <footer className='footer__container'>
      <div className='border-t border-black font-nanum py-10'>
        <h6 className='text-xl font-nanum font-fold mb-2'>{APP_NAME}</h6>
        <p className='text-zinc-500 md:w-1/3 w-full leading-5 text-sm mb-2'>
          {APP_DESCRIPTION}
        </p>
        <p className='text-xs mt-1 text-zinc-500'>{APP_COPYRIGHT}</p>
      </div>
    </footer>
  )
}
