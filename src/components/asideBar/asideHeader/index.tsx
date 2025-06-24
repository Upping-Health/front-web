'use client'
import Logo from '@/components/logo'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import logoImg from '../../../assets/logo.png'

interface IAsideHeaderParams {
  isCollapsed: boolean
  setIsCollapsed: (e: boolean) => void,
}

const AsideHeader = ({isCollapsed,setIsCollapsed}:IAsideHeaderParams) => {
  const router = useRouter()
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const pathname = usePathname()


  return (
      <div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-0 top-4 bg-primary text-white rounded-l-xl flex justify-center items-center"
        >
          {isCollapsed ? (
            <ChevronRightIcon  />
          ) : (
            <ChevronLeftIcon  />
          )}
        </button>

        <div
          className={`flex justify-center mb-6 ${
            isCollapsed ? 'mt-10' : 'mt-6'
          }`}
        >
          {isCollapsed ? (
            <Image src={logoImg} alt="Logo" width={100} height={100} />
          ) : (
            <Logo minimal />
          )}
        </div>
      </div>

  )
}

export default AsideHeader
