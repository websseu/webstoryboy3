import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SLOGAN,
  APP_SITE_URL,
} from '@/lib/constants'
import type React from 'react'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME} | ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: APP_SITE_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
