'use client'
import LoadingFullScreen from '@/components/layoutComponents/loadingGlobal'
import ModalFeedBackStatus from '@/components/modals/ModalFeedback'
import DefaultContextInterface from '@/interfaces/default.interface'
import FeedBackStatusInterface from '@/interfaces/feedbackStatus'
import User from '@/interfaces/user.interface'
import { createContext, useCallback, useEffect, useState } from 'react'
export const DefaultContext = createContext<DefaultContextInterface>({} as any)
import Cookies from 'js-cookie'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import useDarkMode from '@/hooks/theme/useDarkMode'

type ShowModalType = {
  open: boolean
  title: string
  description: string
  status: string
}

export default function DefaultProvider({ children }: any) {
  const { themeDark, toggleTheme } = useDarkMode()
  const [loadingGlobal, setloadingGlobal] = useState<boolean>(false)
  const [labelLoading, setLabelLoading] = useState<string | null>(null)
  const [user, setuser] = useState<User | null>(null)
  const router = useRouter()
  const [showModal, setshowModal] = useState<ShowModalType>({
    open: false,
    title: '',
    description: '',
    status: '',
  })

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setuser(user as any)
      } catch (error) {
        setuser(null)
        Cookies.remove('token')
        router.push('/login')
      }
    }
  }, [])

  const onShowFeedBack = useCallback(
    ({ title, description, status }: FeedBackStatusInterface) =>
      setshowModal({
        open: true,
        title,
        description,
        status,
      }),
    [],
  )

  const onLogout = useCallback(async () => {
    try {
      setloadingGlobal(true)
      setLabelLoading('Fazendo logout...')
      await api.post('user/logout')
    } catch (e) {
      console.log(e)
    } finally {
      Cookies.remove('token')
      localStorage.removeItem('user')
      router.push('/login')
      setloadingGlobal(false)
      setLabelLoading(null)
    }
  }, [router])

  return (
    <DefaultContext.Provider
      value={{
        user,
        setuser,
        onShowFeedBack,
        themeDark,
        toggleTheme,
        loadingGlobal,
        setloadingGlobal,
        setLabelLoading,
        onLogout,
      }}
    >
      {loadingGlobal && <LoadingFullScreen labelLoading={labelLoading} />}
      {children}

      <ModalFeedBackStatus
        open={showModal.open}
        title={showModal.title}
        description={showModal.description}
        status={showModal.status}
        setIsClose={() => setshowModal({ ...showModal, open: false })}
      />
    </DefaultContext.Provider>
  )
}
