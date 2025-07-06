'use client'

import LoadingFullScreen from '@/components/layoutComponents/loadingGlobal'
import ModalFeedBackStatus from '@/components/modals/ModalFeedback'
import DefaultContextInterface from '@/interfaces/default.interface'
import FeedBackStatusInterface from '@/interfaces/feedbackStatus'
import User from '@/interfaces/user.interface'
import { createContext, useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import useDarkMode from '@/hooks/theme/useDarkMode'
import useLoadOperationData from '@/hooks/operation/useLoadOperationData'

type ShowModalType = {
  open: boolean
  title: string
  description: string
  status: string
}

export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { themeDark, toggleTheme } = useDarkMode()
  const [loadingGlobal, setLoadingGlobal] = useState(false)
  const [labelLoading, setLabelLoading] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const [showModal, setShowModal] = useState<ShowModalType>({
    open: false,
    title: '',
    description: '',
    status: '',
  })

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr)
        setUser(parsedUser)
      } catch {
        setUser(null)
        Cookies.remove('token')
        router.push('/login')
      }
    }
  }, [router])

  const onShowFeedBack = useCallback(
    ({ title, description, status }: FeedBackStatusInterface) => {
      setShowModal({
        open: true,
        title,
        description,
        status,
      })
    },
    [],
  )

  const onLogout = useCallback(async () => {
    try {
      setLoadingGlobal(true)
      setLabelLoading('Fazendo logout...')
      await api.post('user/logout')
    } catch (e) {
      console.error(e)
    } finally {
      Cookies.remove('token')
      localStorage.removeItem('user')
      router.push('/login')
      setLoadingGlobal(false)
      setLabelLoading(null)
    }
  }, [router])

  const { roles } = useLoadOperationData({
    user,
    setloadingGlobal: setLoadingGlobal,
  })

  return (
    <DefaultContext.Provider
      value={{
        user,
        setuser: setUser,
        onShowFeedBack,
        themeDark,
        toggleTheme,
        loadingGlobal,
        setloadingGlobal: setLoadingGlobal,
        setLabelLoading,
        onLogout,
        labelLoading,
        roles,
      }}
    >
      {children}
      <>
        <LoadingFullScreen open={loadingGlobal} labelLoading={labelLoading} />

        <ModalFeedBackStatus
          open={showModal.open}
          title={showModal.title}
          description={showModal.description}
          status={showModal.status}
          setIsClose={() => setShowModal((prev) => ({ ...prev, open: false }))}
        />
      </>
    </DefaultContext.Provider>
  )
}
