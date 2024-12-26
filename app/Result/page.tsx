'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const Params=useSearchParams();
    const score=Params.get('score')
  return (
    <div>Score: {score}</div>
  )
}

export default page