'use client'
import ButtonStyled from '@/components/buttonsComponents/button'
import InputStyled from '@/components/inputsComponents/inputStyled'
import Loading from '@/components/layoutComponents/loading'
import SelectStyled from '@/components/inputsComponents/select'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import { formatDate } from '@/utils/format/date'
import masks from '@/utils/masks/masks'
import { ROLE } from '@/utils/types/roles'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import WcIcon from '@mui/icons-material/Wc'
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const validate = async (values: any) => {
  const unmaskCpf = values.document.replace(/\D/g, '')
  const errors: any = {}
  if (!values.document) {
    errors.document = 'Este campo é necessário'
  } else if (values.document.length < 14) {
    errors.document = 'Informe o cpf completo'
  } else if (!masks.validaCpf(unmaskCpf)) {
    errors.document = 'CPF inválido'
  }
  return errors
}

export default function Register() {
  const router = useRouter()
  const [loading, setloading] = useState(false)

  const formik = useFormik({
    initialValues: {
      document: '',
      name: '',
      email: '',
      phone: '',
      gender: 'MALE',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: ROLE.NUTRITIONIST,
      typePerson: 'PF', // ADICIONADO
    },
    validate,
    onSubmit: async (values) => {
      setloading(true)
      const data = {
        cpf: masks.unmask(values.document),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        birthDate: formatDate(values.birthDate),
        gender: values.gender,
        active: true,
        role: ROLE.NUTRITIONIST,
        password: values.password,
        typePerson: values.typePerson, // ADICIONADO
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
              <div className="flex items-center gap-4 mt-2 justify-center">
                {['PF', 'PJ'].map((option) => {
                  const isChecked = formik.values.typePerson === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => formik.setFieldValue('typePerson', option)}
                      className="flex items-center gap-2 mt-1 rounded-full"
                    >
                      {isChecked ? (
                        <RadioButtonChecked className="text-primary text-3xl" />
                      ) : (
                        <RadioButtonUncheckedIcon className="text-gray-400 text-3xl" />
                      )}
                      <span className="font-light text-black">
                        {option === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                      </span>
                    </button>
                  )
                })}
              </div>

              <InputStyled
                id="document"
                onChange={formik.handleChange}
                value={
                  formik.values.typePerson === 'PJ'
                    ? masks.cnpjMask(formik.values.document)
                    : masks.cpfMask(formik.values.document)
                }
                label={formik.values.typePerson === 'PJ' ? 'CNPJ' : 'CPF'}
                type="tel"
                placeholder={
                  formik.values.typePerson === 'PJ'
                    ? '00.000.000/0000-00'
                    : '000.000.000-00'
                }
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
