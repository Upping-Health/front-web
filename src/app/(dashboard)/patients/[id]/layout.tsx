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
  return <>{children}</>
}
