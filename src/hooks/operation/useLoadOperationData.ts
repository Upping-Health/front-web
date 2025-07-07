'use client'
import { IRole } from '@/interfaces/role.interface'
import Schedule from '@/interfaces/schedule.interface'
import User from '@/interfaces/user.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

interface IOperationData {
  user: User | null
  loadingGlobal: boolean
  setLoadingGlobal: (e: boolean) => void
  setLabelLoading: (e: string) => void
}

const useLoadOperationData = ({
  user,
  loadingGlobal,
  setLoadingGlobal,
  setLabelLoading,
}: IOperationData) => {
  const [roles, setroles] = useState<IRole[]>([])

  useEffect(() => {
    if (!user && loadingGlobal) return
    //setLabelLoading('Carregando dados do usuário...')
    // setLoadingGlobal(true)
    api
      .get('roles')
      .then((res) => {
        setroles(res?.data?.data)
      })
      .finally(() => setLoadingGlobal(false))
  }, [])

  return {
    roles,
  }
}

export default useLoadOperationData
