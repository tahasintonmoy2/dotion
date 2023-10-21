"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Error = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-4'>
        <Image 
          src='/error.svg'
          alt=''
          width={400}
          height={400}/>
        <h2 className='font-semibold'>
            Something went wrong!
        </h2>
        <Link href='/documents'>
            <Button>Go back to document page</Button>
        </Link>
    </div>
  )
}

export default Error