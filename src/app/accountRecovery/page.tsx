'use client'
import ButtonStyled from '@/components/button'
import InputStyled from '@/components/inputStyled'
import Loading from '@/components/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { STATUS } from '@/utils/types/feedback'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import PreFeedBack from '@/utils/feedbackStatus'
import { colors } from '@/utils/colors/colors'
import Logo from '@/components/logo'

export default function AccountRecovery() {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const { onShowFeedBack } = useContext(DefaultContext)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setloading(true)

      api
        .post(`users/sendEmailResetPassword/${values.email}`)
        .then(() =>
          onShowFeedBack(PreFeedBack.success('E-mail enviado com sucesso!')),
        )
        .catch((e) => onShowFeedBack(PreFeedBack.error('')))
        .finally(() => setloading(false))
    },
  })
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {loading && <Loading text="Enviando e-mail..." />}
      {!loading && (
        <>
          <form
            onSubmit={formik.handleSubmit}
            className="w-[500px] s:w-[90%]  flex flex-col justify-evenly p-6 bg-white shadow-lg rounded-xl gap-6">
          
            <div className="flex flex-col h-full justify-evenly">
              <div className="py-5">
                <h1 className="text-center text-primary font-bold text-2xl">
                  Recuperação de senha
                </h1>
                <p className="text-center mt-4">
                  Identifique-se para receber um e-mail <br />
                  com as instruções e o link para criar uma nova senha.
                </p>
                <div className="pt-5 mt-5">
                  <InputStyled
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    label="E-mail"
                    type="text"
                    placeholder="exemplo@gmail.com"
                    icon={<MailOutlineIcon style={{ color: colors.primary }} />}
                  />
                </div>
              </div>
              <div>
                <div className="mt-10">
                  <ButtonStyled type="submit" styles="w-full" title="Enviar" />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </main>
  )
}
