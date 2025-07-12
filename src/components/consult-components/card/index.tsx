'use client'
import { ReactNode, ElementType } from 'react'

interface CardConsultProps {
  icon: ElementType
  title: string
  children?: ReactNode
}

const CardConsult = ({ icon: Icon, title, children }: CardConsultProps) => {
  return (
    <div className="bg-white w-full h-full rounded-xl dark:bg-gray-800 shadow-sm p-4">
      <div className="flex items-center gap-4 mb-4">
        <Icon className="text-3xl" />
        <p className="text-xl">{title}</p>
      </div>
      {children}
    </div>
  )
}

export default CardConsult
