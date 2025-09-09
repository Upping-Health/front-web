'use client'

import { useFormik } from 'formik'
import { useLogin } from '@/hooks/users/useLogin'
import InputStyled from '@/components/inputs/inputStyled'
import ButtonStyled from '@/components/buttons/button'
import Loading from '@/components/layout/loading'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { colors } from '@/lib/colors/colors'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { login, loading, error, setError } = useLogin()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: 'contato@upping.com.br',
      password: 'password',
    },
    onSubmit: async (values) => {
      await login(values)
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-screen h-screen flex justify-center items-center bg-gradient-hero"
    >
      {loading && <Loading text="Autenticando..." />}
      {!loading && (
        <div className="w-[500px] s:w-[90%] flex flex-col justify-evenly p-6 bg-white shadow-lg rounded-xl gap-6">
          <div className="flex flex-col justify-center items-center">
            <Image src={logoImg} alt="Logo" width={170} height={170} />
          </div>

          <div className="flex flex-col">
            <InputStyled
              id="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e)
                if (error) setError('')
              }}
              label="E-mail"
              type="text"
              placeholder="exemplo@gmail.com"
              icon={<MailOutlineIcon style={{ color: colors.primary }} />}
              styles="dark:!border-gray mb-5"
              stylesInput="dark:bg-white dark:!text-black"
            />
            <InputStyled
              id="password"
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e)
                if (error) setError('')
              }}
              label="Senha"
              type="password"
              placeholder="***********"
              icon={<LockOutlinedIcon style={{ color: colors.primary }} />}
              styles="dark:!border-gray"
              stylesInput="dark:bg-white dark:!text-black"
            />

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

          <ButtonStyled
            type="submit"
            styles="w-full"
            bgColor="bg-green-600"
            title="Entrar"
            textColor="text-white"
            disabled={loading}
          />
        </div>
      )}
    </form>
  )
}
