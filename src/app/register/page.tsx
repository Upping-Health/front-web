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
import { useContext, useState } from 'react'
import { validateClient } from '@/formik/validators/validate-client'
import { DefaultContext } from '@/contexts/defaultContext'
import Cookies from 'js-cookie'
import BusinessIcon from '@mui/icons-material/Business'

export default function Register() {
  const { setuser } = useContext(DefaultContext)
  const router = useRouter()
  const [loading, setloading] = useState(false)

  const formik = useFormik({
    initialValues: {
      typePerson: 'common',
      document: '',
      name: '',
      phone: '',
      birth_date: '',
      email: '',
      password: '',
      fantasy_name: '',
      password_confirmation: '',
    },
    validate: validateClient,
    onSubmit: async (values) => {
      setloading(true)
      const data = {
        document: masks.unmask(values.document),
        email: values.email,
        name: values.name,
        phone: masks.unmask(values.phone),
        birth_date: values.birth_date,
        status: true,
        password: values.password,
        password_confirmation: values.password,
        type: values.typePerson,
      }

      api
        .post('clients/store', data)
        .then((response) => {
          console.log(response?.data)

          const { data } = response?.data

          if (data) {
            Cookies.set('token', data.token, { expires: 365 })
            localStorage.setItem('user', JSON.stringify(data.client))
            setuser(data.user as any)
            router.push('/dashboard')
          }
        })
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
        <>
          <div className="w-[500px] s:w-[90%] flex flex-col justify-evenly p-6 py-2 bg-white shadow-lg rounded-xl gap-6">
            <div className="text-center">
              <p className="font-semibold uppercase text-2xl">Crie sua conta</p>
              <p className="font-light">
                Preencha os dados abaixo para se cadastrar
              </p>
            </div>
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2 h-full">
                <div className="flex items-center gap-4 justify-center">
                  {['common', 'company'].map((option) => {
                    const isChecked = formik.values.typePerson === option
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          formik.setFieldValue('typePerson', option)
                        }
                        className="flex items-center gap-2 mt-1 rounded-full"
                      >
                        {isChecked ? (
                          <RadioButtonChecked className="text-primary text-3xl" />
                        ) : (
                          <RadioButtonUncheckedIcon className="text-gray-400 text-3xl" />
                        )}
                        <span className="font-light text-black">
                          {option === 'common'
                            ? 'Pessoa Física'
                            : 'Pessoa Jurídica'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <InputStyled
                  id="document"
                  onChange={formik.handleChange}
                  value={
                    formik.values.typePerson === 'company'
                      ? masks.cnpjMask(formik.values.document)
                      : masks.cpfMask(formik.values.document)
                  }
                  label={
                    formik.values.typePerson === 'company' ? 'CNPJ' : 'CPF'
                  }
                  type="tel"
                  onBlur={formik.handleBlur}
                  error={formik.errors.document}
                  isTouched={formik.touched.document}
                  placeholder={
                    formik.values.typePerson === 'company'
                      ? '00.000.000/0000-00'
                      : '000.000.000-00'
                  }
                  icon={
                    <ArticleOutlinedIcon style={{ color: colors.primary }} />
                  }
                  styles="dark:border-gray"
                  stylesInput="dark:bg-white dark:!text-black"
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
                  onBlur={formik.handleBlur}
                  error={formik.errors.name}
                  isTouched={formik.touched.name}
                  styles="dark:border-gray"
                  stylesInput="dark:bg-white dark:!text-black"
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
                  onBlur={formik.handleBlur}
                  error={formik.errors.phone}
                  isTouched={formik.touched.phone}
                  styles="dark:border-gray"
                  stylesInput="dark:bg-white dark:!text-black"
                />

                <InputStyled
                  id="birth_date"
                  value={masks.dateMask(formik.values.birth_date)}
                  onChange={formik.handleChange}
                  label="Data de Nascimento"
                  type="tel"
                  placeholder="DD/MM/YYYY"
                  icon={
                    <CalendarMonthOutlinedIcon
                      style={{ color: colors.primary }}
                    />
                  }
                  onBlur={formik.handleBlur}
                  error={formik.errors.birth_date}
                  isTouched={formik.touched.birth_date}
                  styles="dark:border-gray"
                  stylesInput="dark:bg-white dark:!text-black"
                />

                {/* <SelectStyled
                  label="Sexo"
                  icon={<WcIcon style={{ color: colors.primary }} />}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  id="gender"
                /> */}

                <InputStyled
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label="E-mail"
                  type="text"
                  placeholder="exemplo@gmail.com"
                  icon={<MailOutlineIcon style={{ color: colors.primary }} />}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email}
                  isTouched={formik.touched.email}
                  styles="dark:border-gray"
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
                  onBlur={formik.handleBlur}
                  error={formik.errors.password}
                  isTouched={formik.touched.password}
                  styles="dark:border-gray"
                  stylesInput="dark:bg-white dark:!text-black"
                />
              </div>

              <div className="py-5">
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
        </>
      )}
    </main>
  )
}
