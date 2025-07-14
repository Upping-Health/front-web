import React, { ReactElement } from 'react'
import TopDash from '@/components/layoutComponents/topDash'
import MenuConsult from '@/components/consult-components/menu'
import Person from '@mui/icons-material/Person'

type User = {
  name: string
  age: number
  gender: string
}

type ConsultLayoutProps = {
  children: ReactElement
}

export default async function ConsultLayout({ children }: ConsultLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title={'Guilherme Xavier Martins'}
        description={'160 an0s'}
        icon={Person}
      />

      <div className="h-full w-full flex gap-4">
        {children}

        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>
    </div>
  )
}
