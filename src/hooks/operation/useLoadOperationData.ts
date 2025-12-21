'use client'
import { IRole } from '@/interfaces/role.interface'
import { User } from '@/interfaces/user.interface'
import api from '@/services/api'
import { useEffect, useState } from 'react'

interface IOperationData {
  user: User | null
  setLoadingGlobal: (e: boolean) => void
  setLabelLoading: (e: string) => void
}

const useLoadOperationData = ({
  user,
  setLoadingGlobal,
  setLabelLoading,
}: IOperationData) => {
  const [roles, setRoles] = useState<IRole[]>([])

  useEffect(() => {
    if (!user) return
    const loadData = async () => {
      try {
        //setLabelLoading('Carregando dados do usuário...')
        //setLoadingGlobal(true)

        const res = await api.get('roles')
        setRoles(res?.data?.data)
      } catch (err) {
        console.error('Erro ao carregar roles:', err)
      } finally {
        //setLoadingGlobal(false)
        //setLabelLoading('')
      }
    }

    loadData()
  }, [user, setLoadingGlobal, setLabelLoading])

  return { roles }
}

export default useLoadOperationData
