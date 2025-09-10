'use client'
import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import Loading from '@/components/layout/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { colors } from '@/lib/colors/colors'
import PreFeedBack from '@/lib/feedbackStatus'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

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
    <main className="w-screen h-screen flex justify-center items-center bg-gradient-hero">
      {loading && <Loading text="Enviando e-mail..." />}
      {!loading && (
        <>
          <form
            onSubmit={formik.handleSubmit}
            className="relative w-[500px] s:w-[90%] flex flex-col justify-evenly p-6 bg-white shadow-lg rounded-xl gap-6"
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="absolute top-4 left-4 py-2 flex items-center gap-2 text-primary hover:text-black"
            >
              <ArrowBackIcon fontSize="small" />
              <span className="text-sm font-semibold">Voltar</span>
            </button>

            <div className="flex flex-col h-full justify-evenly">
              <div className="py-5">
                <h1 className="text-center text-black font-bold text-2xl">
                  Recuperação de senha
                </h1>
                <p className="text-center mt-4 text-gray-500">
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
                    styles="dark:!border-gray"
                    stylesInput="dark:bg-white dark:!text-black"
                  />
                </div>
              </div>
              <div>
                <div className="mt-10">
                  <ButtonStyled
                    type="submit"
                    styles="w-full"
                    title="Enviar"
                    bgColor="bg-green-600"
                  />
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </main>
  )
}
