'use client'
import ButtonStyled from '@/components/button'
import InputStyled from '@/components/inputStyled'
import Loading from '@/components/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'

import PreFeedBack from '@/utils/feedbackStatus'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useState } from 'react'

export default function AccountRecovery() {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const { onShowFeedBack } = useContext(DefaultContext)
  const searchParams = useSearchParams()
  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    onSubmit: async (values) => {
      setloading(true)
      const { password, repeatPassword } = values
      if (password !== repeatPassword)
        return onShowFeedBack(PreFeedBack.error('As senhas não conferem!'))
      const token = searchParams.get('token')
      console.log(token)

      api
        .post(`users/changePassword/${password}`, {
          token,
        })
        .then(() =>
          onShowFeedBack(PreFeedBack.success('E-mail enviado com sucesso!')),
        )
        .catch((e) => onShowFeedBack(PreFeedBack.error('')))
        .finally(() => setloading(false))
    },
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white s:w-screen t:w-3/6 d:w-2/6 mx-auto flex flex-col justify-center p-4 h-screen relative"
    >
      {loading && <Loading text="Enviando e-mail..." />}

      {!loading && (
        <>
          <button className="absolute top-5 left-5">
            <ArrowBackOutlinedIcon
              style={{ fontSize: 36, color: '#FFCB08' }}
              onClick={() => router.push('/login')}
            />
          </button>

          {/* Wrapper flexível */}
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col flex-1 justify-center">
              <div className="py-5">
                <h1 className="text-center text-primary font-bold text-2xl">
                  Redefinir senha
                </h1>

                <div className="pt-5 mt-5 flex flex-col gap-4">
                  <InputStyled
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    label="Senha"
                    type="password"
                    placeholder="***********"
                    icon={<LockOutlined style={{ color: '#FFCB08' }} />}
                  />
                  <InputStyled
                    id="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    label="Confirme a senha"
                    type="password"
                    placeholder="***********"
                    icon={<LockOutlined style={{ color: '#FFCB08' }} />}
                  />
                </div>
                <ButtonStyled
                  type="submit"
                  styles="w-full mt-20"
                  title="Enviar"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  )
}
