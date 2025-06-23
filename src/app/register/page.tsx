'use client'
import ButtonStyled from '@/components/button'
import InputStyled from '@/components/inputStyled'
import Loading from '@/components/loading'
import SelectStyled from '@/components/select'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import masks from '@/utils/masks/masks'
import { ROLE } from '@/utils/types/roles'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WcIcon from '@mui/icons-material/Wc'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import CustomizedSteppers from '@/components/StepBar'
import HomeIcon from '@mui/icons-material/Home'
import { formatDate } from '@/utils/format/date'
const validate = async (values: any) => {
  const unmaskCpf = values.cpf.replace(/\D/g, '')
  const errors: any = {}
  if (!values.cpf) {
    errors.cpf = 'Este campo é necessário'
  } else if (values.cpf.length < 14) {
    errors.cpf = 'Informe o cpf completo'
  } else if (!masks.validaCpf(unmaskCpf)) {
    errors.cpf = 'CPF inválido'
  }
  return errors
}

export default function Register() {
  const router = useRouter()
  const [loading, setloading] = useState(false)

  const formik = useFormik({
    initialValues: {
      cpf: '',
      name: '',
      email: '',
      phone: '',
      gender: 'MALE',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: ROLE.NUTRITIONIST,
    },
    validate,
    onSubmit: async (values) => {
      setloading(true)
      const data = {
        cpf: masks.unmask(values.cpf),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        birthDate: formatDate(values.birthDate),
        gender: values.gender,
        active: true,
        role: ROLE.NUTRITIONIST,
        password: values.password,
      }

      api
        .post('nutritionist/create', data)
        .then(() => router.push('/login'))
        .catch((error) =>
          console.error('[ERROR API /users]', error?.response?.data),
        )
        .finally(() => setloading(false))
    },
  })
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {loading && <Loading text="Carregando..." />}

      {!loading && (
        <div className="w-[500px] s:w-[90%] flex flex-col justify-evenly p-6 py-2 bg-white shadow-lg rounded-xl gap-6">
          <div className="text-center">
            <PersonIcon style={{ fontSize: 48 }} />
            <p className="font-light uppercase text-2xl">Cadastro</p>
          </div>

          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2 h-full">
              <InputStyled
                id="cpf"
                onChange={formik.handleChange}
                value={masks.cpfMask(formik.values.cpf)}
                label="CPF"
                type="tel"
                placeholder="000.000.000-00"
                icon={<ArticleOutlinedIcon style={{ color: colors.primary }} />}
              />
              <InputStyled
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Nome"
                type="text"
                placeholder="Exemplo"
                icon={
                  <PersonOutlineOutlinedIcon
                    style={{ color: colors.primary }}
                  />
                }
              />
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: colors.primary }} />}
              />

              <InputStyled
                id="phone"
                value={masks.phoneMask(formik.values.phone)}
                onChange={formik.handleChange}
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                icon={
                  <LocalPhoneOutlinedIcon style={{ color: colors.primary }} />
                }
              />

              <InputStyled
                id="birthDate"
                value={masks.dateMask(formik.values.birthDate)}
                onChange={formik.handleChange}
                label="Data de Nascimento"
                type="tel"
                placeholder="DD/MM/YYYY"
                icon={
                  <CalendarMonthOutlinedIcon
                    style={{ color: colors.primary }}
                  />
                }
              />

              <SelectStyled
                label="Sexo"
                icon={<WcIcon style={{ color: colors.primary }} />}
                value={formik.values.gender}
                onChange={formik.handleChange}
                id="gender"
  
              />

              <InputStyled
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                label="Senha"
                type="password"
                placeholder="***********"
                icon={<LockOutlinedIcon style={{ color: colors.primary }} />}
              />
            </div>

            <div className="mt-5 py-5">
              <ButtonStyled
                type="submit"
                styles="w-full"
                bgColor="bg-black"
                title="Cadastrar"
              />
              <p className="text-center text-sm font-light mt-2">
                Já possui uma conta?{' '}
                <a
                  href="login"
                  className="text-primary font-medium hover:underline transition"
                >
                  Entre aqui
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}
