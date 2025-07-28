import ButtonStyled from '@/components/buttonsComponents/button'
import InputStyled from '@/components/inputsComponents/inputStyled'
import SelectStyled from '@/components/inputsComponents/select'
import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import apiViaCep from '@/services/apiViaCep'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import { formatDate } from '@/utils/format/date'
import masks from '@/utils/masks/masks'
import { states } from '@/utils/states'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import HomeIcon from '@mui/icons-material/Home'
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined'
import Person from '@mui/icons-material/Person'
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined'
import Wc from '@mui/icons-material/Wc'
import { CircularProgress, Modal } from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useContext, useEffect, useState } from 'react'
import { validatPatient } from '@/formik/validators/validator-patient'
import CustomizedSteppers from '../../../../../components/layoutComponents/stepBar'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  patientSelected?: Patient | null
  loadData: () => Promise<void>
}

const ModalPatient = ({
  open,
  setIsClose,
  patientSelected,
  loadData,
}: ModalParams) => {
  const { onShowFeedBack, user } = useContext(DefaultContext)
  const [viewTwo, setViewTwo] = useState(false)
  const [loading, setloading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Paciente cadastrado com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Paciente atualizado com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao cadastrar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao atualizar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const optionsSex = [
    { value: 'MALE', text: 'Masculino' },
    { value: 'FEMALE', text: 'Feminino' },
    { value: 'OTHER', text: 'Outros' },
  ]

  useEffect(() => {
    setViewTwo(false)
    if (!open) return formik.resetForm()
    if (!patientSelected) {
      formik.setValues({
        uuid: '',
        document: '',
        name: '',
        phone: '',
        email: '',
        birth_date: '',
        objective: '',
        gender: 'MALE',
        status: false,
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
      })
    }
    if (patientSelected) {
      const {
        name,
        document,
        phone,
        email,
        birth_date,
        gender,
        objective,
        address,
      } = patientSelected
      formik.setValues({
        uuid: '',
        name: name,
        document: document,
        phone,
        status: 'ACTIVE' ? true : false,
        objective: objective ? objective : '',
        email,
        birth_date: birth_date,
        gender,
        street: address?.street ?? '',
        number: address?.number ?? '',
        complement: address?.complement ?? '',
        neighborhood: address?.neighborhood ?? '',
        city: address?.city ?? '',
        state: address?.state ?? '',
        zipCode: address?.zipCode ?? '',
      })
    }
  }, [patientSelected, open])

  const formik = useFormik({
    initialValues: {
      uuid: '',
      document: '',
      email: '',
      name: '',
      phone: '',
      status: false,
      birth_date: '',
      gender: 'MALE',
      objective: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    },
    validate: validatPatient,
    onSubmit: async (values) => {
      setloading(true)
      const data: Omit<any, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        document: masks.unmask(values.document),
        phone: masks.unmask(values.phone),
        name: values.name,
        patient_id: values.uuid,
        //status: values.status ? 'ACTIVE' : 'INACTIVE',
        email: values.email,
        gender: values.gender as 'MALE' | 'FEMALE' | 'OTHER',
        //objective: values?.objective ?? '',
        birth_date: values.birth_date,
        address: {
          city: values.city,
          complement: values?.complement ?? null,
          neighborhood: values.neighborhood,
          number: values.number,
          state: values.state,
          street: values.street,
          zip_code: values.zipCode.replace(/\D/g, ''),
        },
      }

      try {
        await api.post(`/patients/link-patient-to-professional`, data)
        onSuccess()
        await loadData()
      } catch (error) {
        if (patientSelected) {
          onErrorUpdate(error)
        } else {
          onError(error)
        }
      } finally {
        setloading(false)
      }
    },
  })

  const autoCompleteAdress = useCallback(
    async (cep: string) => {
      const cleanedCep = masks.unmask(cep)
      if (cleanedCep.length === 8) {
        setLoadingData(true)
        await apiViaCep
          .get(`${cleanedCep}/json/`)
          .then((response) => {
            console.log(response)
            formik.setFieldValue(
              'street',
              response?.data?.logradouro
                ? response?.data?.logradouro
                : formik.values.street,
            )
            formik.setFieldValue(
              'city',
              response?.data?.localidade
                ? response?.data?.localidade
                : formik.values.city,
            )
            formik.setFieldValue(
              'state',
              response?.data?.uf ? response?.data?.uf : formik.values.state,
            )
            formik.setFieldValue(
              'neighborhood',
              response?.data?.neighborhood
                ? response?.data?.neighborhood
                : formik.values.neighborhood,
            )
          })
          .catch((error) => console.log('[ERROR/API] VIACEP', error))
          .finally(() => setLoadingData(false))
      }
    },
    [formik.values],
  )

  const clearPatientData = () => {
    formik.setFieldValue('uuid', '')
    formik.setFieldValue('name', '')
    formik.setFieldValue('email', '')
    formik.setFieldValue('phone', '')
    formik.setFieldValue('gender', '')
    formik.setFieldValue('birthDate', '')
    formik.setFieldValue('street', '')
    formik.setFieldValue('zipCode', '')
    formik.setFieldValue('city', '')
    formik.setFieldValue('state', '')
    formik.setFieldValue('neighborhood', '')
  }

  const autoCompletePatientData = useCallback(async (document: string) => {
    const cleanedCpf = masks.unmask(document)
    if (cleanedCpf.length === 11) {
      setLoadingData(true)
      await api
        .get(`/patients/${cleanedCpf}`)
        .then((response) => {
          console.log(response)
          const data = response?.data?.data
          if (data) {
            formik.setFieldValue('uuid', data?.uuid ?? '')
            formik.setFieldValue('name', data?.name ?? '')
            formik.setFieldValue('email', data?.email ?? '')
            formik.setFieldValue('phone', data?.phone ?? '')
            formik.setFieldValue('gender', data?.gender ?? '')
            formik.setFieldValue('birth_date', data?.birth_date ?? '')
            formik.setFieldValue('street', data?.address?.street ?? '')
            formik.setFieldValue('zipCode', data?.address?.zipCode ?? '')
            formik.setFieldValue('city', data?.address?.city ?? '')
            formik.setFieldValue('state', data?.address?.state ?? '')
            formik.setFieldValue(
              'neighborhood',
              data?.address?.neighborhood ?? '',
            )
          } else {
            clearPatientData()
          }
        })
        .catch((error) => {
          console.log('[ERROR/API] patientByCpf', error)
          clearPatientData()
        })
        .finally(() => setLoadingData(false))
    }
  }, [])

  useEffect(() => {
    autoCompleteAdress(formik.values.zipCode)
  }, [formik.values.zipCode])

  useEffect(() => {
    autoCompletePatientData(formik.values.document)
  }, [formik.values.document])
  const steps = ['Dados Pessoais', 'Endereço (Opcional)']

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white dark:bg-slate-800 rounded-20 px-5 py-4 w-[85%] max-w-[500px]">
        <p className="font-semibold text-xl text-center uppercase pb-5 dark:text-white">
          {patientSelected ? 'Atualizar Paciente' : 'Cadastro de Paciente'}
        </p>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {loadingData ? (
            <div className="flex items-center flex-col justify-center py-6 gap-4">
              <CircularProgress className="text-3xl dark:text-white" />
              <p className="text-black dark:text-white font-semibold">
                Buscando dados...
              </p>
            </div>
          ) : (
            <>
              <CustomizedSteppers
                steps={steps}
                activeTab={viewTwo ? 1 : 0}
                iconStep1={<Person />}
                iconStep2={<HomeIcon />}
              />
              {!viewTwo && (
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
                    stylesInput="dark:bg-slate-500"
                    stylesLabel="dark:text-white"
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
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
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
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
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
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
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
                    stylesInput="dark:bg-slate-500"
                    stylesLabel="dark:text-white"
                  />

                  <SelectStyled
                    label="Sexo"
                    icon={<Wc className="text-black dark:text-white" />}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    id="gender"
                    options={optionsSex}
                    styles="dark:text-white"
                    stylesLabel="dark:text-white"
                  />

                  <div className="flex gap-5 pt-5">
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
                        styles="w-full bg-green-600"
                        title={'Próximo'}
                        onClick={() => setViewTwo(true)}
                      />
                    )}
                  </div>
                </div>
              )}

              {viewTwo && (
                <div className="flex flex-col gap-2">
                  <InputStyled
                    id="zipCode"
                    label="CEP"
                    type="text"
                    placeholder="00000-000"
                    value={masks.cepMask(formik.values.zipCode)}
                    onChange={formik.handleChange}
                    error={formik.errors.zipCode}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.zipCode}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />

                  <InputStyled
                    id="street"
                    type="text"
                    label="Rua"
                    placeholder="Rua Exemplo"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.errors.street}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.street}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />
                  <InputStyled
                    id="number"
                    type="text"
                    label="Número"
                    placeholder="123"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.errors.number}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.number}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />
                  <InputStyled
                    id="complement"
                    type="text"
                    label="Complemento"
                    placeholder="Apto, casa..."
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                    error={formik.errors.complement}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.complement}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />
                  <InputStyled
                    id="neighborhood"
                    label="Bairro"
                    type="text"
                    placeholder="Centro"
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                    error={formik.errors.neighborhood}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.neighborhood}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />
                  <InputStyled
                    id="city"
                    type="text"
                    label="Cidade"
                    placeholder="São Paulo"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.errors.city}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.city}
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    stylesInput="dark:bg-slate-800 dark:text-white"
                    stylesLabel="dark:text-white"
                  />
                  <SelectStyled
                    id="state"
                    label="Estado"
                    placeholder="Selecione o estado"
                    value={formik.values.state}
                    onChange={(e) =>
                      formik.setFieldValue('state', e.target.value)
                    }
                    icon={
                      <AddLocationIcon className="text-black dark:text-white" />
                    }
                    options={states}
                    styles="dark:text-white"
                    stylesLabel="dark:text-white"
                  />

                  <div className="flex gap-5 pt-5">
                    <ButtonStyled
                      type="button"
                      onClick={() => setViewTwo(false)}
                      styles="w-full"
                      bgColor="bg-red-600"
                      title="Voltar"
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
                        type="submit"
                        styles="w-full bg-green-600"
                        title={patientSelected ? 'Atualizar' : 'Cadastrar'}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </Modal>
  )
}

export default ModalPatient
