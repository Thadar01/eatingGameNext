'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const PhaserGame=dynamic(()=>import('../Components/GameComponet'), { ssr: false })

const page = () => {
  const Params=useSearchParams();
  const name=Params.get('name')
  return (
    <div className='flex justify-center items-center'>
         <PhaserGame name={name}/>
    </div>
  )
}

export default page