'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const PhaserGame=dynamic(()=>import('../Components/GameComponet'), { ssr: false })

const page = () => {
  return (
    <div className='flex justify-center items-center'>
         <PhaserGame/>
    </div>
  )
}

export default page