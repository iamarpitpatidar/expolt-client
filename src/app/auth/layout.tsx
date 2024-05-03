import { ReactNode } from 'react'

import '@assets/css/auth.scss'
import Image from 'next/image'
import Logo from '@assets/images/logo.png'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="auth-wrapper min-h-screen">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-full max-w-xl px-20 py-16 bg-white rounded-sm shadow-xl text-center">
          <Image
            src={Logo}
            alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`}
            width={100}
            className="mx-auto"
          />
          {children}
        </div>
      </div>
    </div>
  )
}
