import MyApp from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { Children, ReactNode } from 'react'

export const metadata: Metadata = {
  title: "YOOM",
  description: "Vedio Calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};



const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <MyApp>
        {children}
      </MyApp>
    </main>
  )
}

export default RootLayout