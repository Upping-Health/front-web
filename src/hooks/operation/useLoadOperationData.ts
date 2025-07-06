'use client'
import { IRole } from '@/interfaces/role.interface'
import Schedule from '@/interfaces/schedule.interface'
import User from '@/interfaces/user.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

interface IOperationData {
  user: User | null
  setloadingGlobal: (e: boolean) => void
}

const useLoadOperationData = ({ user, setloadingGlobal }: IOperationData) => {
  const [roles, setroles] = useState<IRole[]>([])

  useEffect(() => {
    if (!user) return
    setloadingGlobal(true)
    api
      .get('roles')
      .then((res) => {
        setroles(res?.data?.data)
      })
      .finally(() => setloadingGlobal(false))
  }, [user])

  return {
    roles,
  }
}

export default useLoadOperationData
