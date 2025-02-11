import Footer from '@/components/footer'
import Header from '@/components/header'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className='main__container'>{children}</main>
      <Footer />
    </>
  )
}
