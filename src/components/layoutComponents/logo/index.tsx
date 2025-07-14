import Image from 'next/image'
import React from 'react'
import logoImg from '@/assets/logo.png'

const Logo = ({ minimal, styles }: any) => {
  // const textColorClass = type === 'white' ? 'text-white' : 'text-black';
  // const className = `text-4xl font-bold text-center ${textColorClass} ${styles}`;
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={logoImg}
        alt="Logo"
        width={minimal ? 100 : 170}
        height={minimal ? 270 : 510}
      />
    </div>
  )
}

export default Logo
