import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import api from '@/services/api'
import { DefaultContext } from '@/contexts/defaultContext'

interface LoginValues {
  email: string
  password: string
}

export function useLogin() {
  const { setuser } = useContext(DefaultContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async ({ email, password }: LoginValues) => {
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/login', { email, password })
      const { data } = response?.data

      if (data) {
        Cookies.set('token', data.access_token, { expires: 365 })
        localStorage.setItem('user', JSON.stringify(data.user))
        setuser(data.user)
        router.push('/financial')
      } else {
        setError('Credenciais inválidas, tente novamente.')
      }
    } catch (err) {
      console.error(err)
      setError('Credenciais inválidas, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    loading,
    error,
    setError,
  }
}
