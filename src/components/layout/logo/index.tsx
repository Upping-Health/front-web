import Image from 'next/image'
import React from 'react'
import logoImg from '@/assets/upping_light.png'
import logoDark from '@/assets/upping_dark.png'
import { useGetDarkTheme } from '@/hooks/theme/useGetDarkTheme'

const Logo = ({ minimal }: any) => {
  const { themeDark } = useGetDarkTheme()
  // const textColorClass = type === 'white' ? 'text-white' : 'text-black';
  // const className = `text-4xl font-bold text-center ${textColorClass} ${styles}`;
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={themeDark ? logoDark : logoImg}
        alt="Logo"
        width={minimal ? 100 : 170}
        height={minimal ? 270 : 510}
      />
    </div>
  )
}

export default Logo
