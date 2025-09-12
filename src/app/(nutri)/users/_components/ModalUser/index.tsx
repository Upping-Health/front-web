import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import { DefaultContext } from '@/contexts/defaultContext'
import { validateCreateUser } from '@/lib/formik/validators/validator-user'
import { IRole } from '@/interfaces/role.interface'
import api from '@/services/api'
import PreFeedBack from '@/lib/feedbackStatus'
import masks from '@/lib/masks/masks'
import { ROLE_PTBR } from '@/lib/types/roles'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined'
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import Wc from '@mui/icons-material/Wc'
import { CircularProgress, Modal } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useMemo, useState } from 'react'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
interface ModalParams {
  open: boolean
  setIsClose: () => void
  userSelected?: any | null
  loadData: () => Promise<void>
}

const ModalUser = ({
  open,
  setIsClose,
  userSelected,
  loadData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [roles, setRoles] = useState<IRole[]>([])
  const [viewTwo, setViewTwo] = useState(false)
  const [loading, setloading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Usuário cadastrado com sucesso!'))
    setIsClose()
  }

  useEffect(() => {
    setLoadingData(true)
    api
      .get('roles')
      .then((response) => {
        setRoles(response?.data?.data)
      })
      .catch(() => {})
      .finally(() => setLoadingData(false))
  }, [open])

  const onError = (e: any) => {
    const errorMessage = e?.response?.message || 'Falhou ao cadastrar usuário.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API users/new-user]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage = e?.response?.message || 'Falhou ao atualizar usuário.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  useEffect(() => {
    setViewTwo(false)
    if (!open) return formik.resetForm()
    if (!userSelected) {
      formik.setValues({
        document: '',
        name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: 'male',
        role: '3',
      })
    }
    if (userSelected) {
      const {
        name,
        document,
        phone,
        email,
        birth_date,
        gender,
        objective,
        address,
      } = userSelected
      formik.setValues({
        document: document,
        name: name,
        phone,
        email,
        birth_date: birth_date,
        gender,
        role: '',
      })
    }
  }, [userSelected, open])

  const formik = useFormik({
    initialValues: {
      document: '',
      name: '',
      email: '',
      phone: '',
      birth_date: '',
      gender: 'male',
      role: '',
    },
    validationSchema: validateCreateUser,
    onSubmit: async (values) => {
      setloading(true)
      const data: any = {
        document: masks.unmask(values.document),
        phone: masks.unmask(values.phone),
        name: values.name,
        email: values.email,
        gender: values.gender as 'male' | 'female',
        role_id: Number(values.role),
        birth_date: values.birth_date,
        password: 'password',
        password_confirmation: 'password',
      }

      try {
        await api.post(`users/new-user`, data)
        onSuccess()
        await loadData()
      } catch (error) {
        if (userSelected) {
          onErrorUpdate(error)
        } else {
          onError(error)
        }
      } finally {
        setloading(false)
      }
    },
  })

  console.log(roles)

  const options = useMemo(
    () =>
      roles
        .filter((p) => p.name)
        .map((e) => ({ value: e.id, text: ROLE_PTBR[e.name] })),
    [roles, ROLE_PTBR],
  )

  return (
    <ModalBase open={open} onClose={setIsClose}>
      <ModalHeader
        onClose={setIsClose}
        title={userSelected ? 'Atualizar Usuário' : 'Cadastro de Usuário'}
      />

      <ModalContent>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {loadingData ? (
            <div className="flex items-center flex-col justify-center py-6 gap-4">
              <CircularProgress className="dark:text-white text-black text-2xl" />
              <p className="text-black font-semibold dark:text-white">
                Buscando dados...
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <InputStyled
                  id="document"
                  onChange={formik.handleChange}
                  value={masks.cpfMask(formik.values.document)}
                  label="CPF"
                  type="tel"
                  placeholder="000.000.000-00"
                  icon={
                    <ArticleOutlined className="text-black dark:text-white" />
                  }
                  error={formik.errors.document}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.document}
                />
                <InputStyled
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  label="Nome"
                  type="text"
                  placeholder="Exemplo"
                  icon={
                    <PersonOutlineOutlined className="text-black dark:text-white" />
                  }
                  error={formik.errors.name}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.name}
                />

                <InputStyled
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  label="E-mail"
                  type="text"
                  placeholder="exemplo@gmail.com"
                  icon={
                    <EmailOutlinedIcon className="text-black dark:text-white" />
                  }
                  error={formik.errors.email}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.email}
                />

                <InputStyled
                  id="phone"
                  onChange={formik.handleChange}
                  value={masks.phoneMask(formik.values.phone)}
                  label="Telefone"
                  type="text"
                  placeholder="(00) 00000-0000"
                  icon={
                    <LocalPhoneOutlined className="text-black dark:text-white" />
                  }
                  maxLength={15}
                  error={formik.errors.phone}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.phone}
                />

                <InputStyled
                  id="birth_date"
                  onChange={formik.handleChange}
                  value={masks.dateMask(formik.values.birth_date)}
                  label="Data de Nascimento"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  icon={
                    <CalendarMonthOutlined className="text-black dark:text-white" />
                  }
                  maxLength={10}
                  error={formik.errors.birth_date}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.birth_date}
                />

                <SelectStyled
                  label="Sexo"
                  icon={<Wc className="text-black dark:text-white" />}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  id="gender"
                />

                <SelectStyled
                  label="Função"
                  icon={
                    <SupervisorAccountIcon className="text-black dark:text-white" />
                  }
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  id="role"
                  options={options}
                />
              </div>
            </>
          )}
        </form>
      </ModalContent>

      <ModalFooter>
        <ButtonStyled
          type="button"
          onClick={setIsClose}
          styles="w-full"
          bgColor="bg-red-600"
          title="Cancelar"
        />

        {loading ? (
          <ButtonStyled
            bgColor="bg-darkGray"
            textColor="text-white"
            type="submit"
            styles="w-full"
            title="Cadastrando..."
            icon={
              <CircularProgress
                style={{ width: 20, height: 20, color: '#FFFFFF' }}
              />
            }
          />
        ) : (
          <ButtonStyled
            type="button"
            onClick={formik.handleSubmit}
            styles="w-full bg-green-600"
            title={'Cadastrar'}
            disabled={!formik.isValid}
          />
        )}
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalUser
