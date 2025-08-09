'use client'

import api from '@/services/api'
import Cookies from 'js-cookie'
import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import Loading from '@/components/layout/loading'
import Logo from '@/components/layout/logo'
import { DefaultContext } from '@/contexts/defaultContext'
import { colors } from '@/utils/colors/colors'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'

export default function Login() {
  const { setuser } = useContext(DefaultContext)
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: 'reggis@upping.com.br',
      password: '12345678',
    },
    onSubmit: async (values) => {
      setloading(true)
      setError('')
      try {
        const response = await api.post('/login', {
          email: values.email,
          password: values?.password,
        })

        if (response.status === 200) {
          const { data } = response?.data

          if (data) {
            Cookies.set('token', data.access_token, { expires: 365 })
            localStorage.setItem('user', JSON.stringify(data.user))
            setuser(data.user as any)
            router.push('/dashboard')
          }
        } else {
          setError('Credenciais inválidas, tente novamente.')
        }
      } catch (e) {
        console.log(e)
        setError('Credenciais inválidas, tente novamente.')
      } finally {
        setloading(false)
      }
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-screen h-screen flex justify-center items-center bg-gray-100"
    >
      {loading && <Loading text="Autenticando..." />}
      {!loading && (
        <div className="w-[500px] s:w-[90%] flex flex-col justify-evenly p-6 bg-white shadow-lg rounded-xl gap-6">
          <div className="flex flex-col justify-center items-center">
            <Image src={logoImg} alt="Logo" width={170} height={170} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-5">
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: colors.primary }} />}
                styles="dark:!border-gray"
                stylesInput="dark:bg-white dark:!text-black"
              />
              <InputStyled
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Senha"
                type="password"
                placeholder="***********"
                icon={<LockOutlinedIcon style={{ color: colors.primary }} />}
                styles="dark:!border-gray"
                stylesInput="dark:bg-white dark:!text-black"
              />
            </div>
            {error && (
              <p className="text-center text-red-600 font-light text-sm">
                {error}
              </p>
            )}
            <button
              type="button"
              className="text-end mt-2 text-black font-bold text-sm"
              onClick={() => router.push('/accountRecovery')}
            >
              Esqueci minha senha
            </button>
          </div>
          <div className="flex flex-col gap-4 ">
            <ButtonStyled
              type="submit"
              styles="w-full"
              title="Entrar"
              textColor="text-white"
              disabled={loading}
            />

            {/* <ButtonStyled
              type="button"
              onClick={() => router.push('/register')}
              styles="w-full"
              bgColor="bg-primary"
              title="Cadastre-se gratuitamente"
            /> */}
          </div>
        </div>
      )}
    </form>
  )
}
