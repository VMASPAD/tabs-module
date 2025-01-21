import { Button } from '@/components/ui/button'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-7xl font-bold mt-20'>Tab</h1>
        <p>A simple Tab component for react and your windows</p>
        <br />
        <div className='flex flex-row gap-5'>
        <a href="https://github.com/VMASPAD/tabs-module">
        <Button variant={'secondary'}>Repository</Button></a>
        </div>
        <br />
    </div>
  )
}

export default Hero
