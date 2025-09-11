'use client'
import { ArrowUpward } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export default function FloatingButtons() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center 
                     bg-green-500 hover:bg-green-600 text-white 
                     rounded-full shadow-lg transition 
                     w-14 h-14"
        >
          <WhatsAppIcon className="w-8 h-8" />
        </a>
      </div> */}

      {showButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center 
                       bg-primary hover:bg-terciary text-white 
                       rounded-full shadow-lg transition 
                       w-14 h-14"
          >
            <ArrowUpward className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}
