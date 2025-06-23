import ButtonStyled from '@/components/button'
import InputStyled from '@/components/inputStyled'
import SelectStyled from '@/components/select'
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
import { validatPatient } from '../../../../formik/validators/validator-patient'
import CustomizedSteppers from '../../StepBar'

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
  const [loadingData, setLoadingData] = useState(false);


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
        cpf: '',
        name: '',
        phone: '',
        email: '',
        birthDate: '',
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
      const { name, cpf, phone, email, birthDate, gender, objective, address } =
        patientSelected
      formik.setValues({
        name: name,
        cpf: cpf,
        phone,
        status: 'ACTIVE' ? true : false,
        objective: objective ? objective : '',
        email,
        birthDate: birthDate,
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
      cpf: '',
      email: '',
      name: '',
      phone: '',
      status: false,
      birthDate: '',
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
      const data: Omit<Patient, 'id' | 'created_at' | 'updated_at' | 'status'> = {
        cpf: masks.unmask(values.cpf),
        phone: masks.unmask(values.phone),
        name: values.name,
        //status: values.status ? 'ACTIVE' : 'INACTIVE',
        email: values.email,
        gender: values.gender as "MALE" | "FEMALE" | "OTHER",
        //objective: values?.objective ?? '',
        birthDate: formatDate(values.birthDate),
        address: {
          city: values.city,
          complement: values?.complement ?? null,
          neighborhood: values.neighborhood,
          number: values.number,
          state: values.state,
          street: values.street,
          zipCode: values.zipCode.replace(/\D/g, ''),
        },
      }

      try {
        if (patientSelected) {
          const { cpf, ...dataWithoutCpf } = data

          await api.put(`/patient/update/${patientSelected.id}`, dataWithoutCpf)
          onSuccessUpdate()
        } else {
          await api.post(`/patient/create/${user?.id}`, data);
          onSuccess()
        }

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

  const autoCompleteAdress = useCallback(async (cep: string) => {
    const cleanedCep = masks.unmask(cep);
    if(cleanedCep.length === 8){
      setLoadingData(true);
      await apiViaCep.get(`${cleanedCep}/json/`)
      .then((response) => {
        console.log(response);
        formik.setFieldValue('street', response?.data?.logradouro ?  response?.data?.logradouro : formik.values.street);
        formik.setFieldValue('city', response?.data?.localidade ? response?.data?.localidade :  formik.values.city);
        formik.setFieldValue('state', response?.data?.uf ? response?.data?.uf : formik.values.state);
        formik.setFieldValue('neighborhood', response?.data?.neighborhood ? response?.data?.neighborhood : formik.values.neighborhood);
      })
      .catch((error) => console.log('[ERROR/API] VIACEP', error))
      .finally(() => setLoadingData(false))
    }
  },[formik.values])

  const autoCompletePatientData = useCallback(async (cpf: string) => {
    const cleanedCpf = masks.unmask(cpf);
    if(cleanedCpf.length === 11){
      setLoadingData(true);
      await api.get(`/patientByCpf/${cleanedCpf}`)
        .then((response) => {
          console.log(response);
          if(response?.data?.data){
            const { data } = response?.data
            formik.setFieldValue('name', data?.name ?? '');
            formik.setFieldValue('email', data?.email ?? '');
            formik.setFieldValue('phone', data?.phone ?? '')
            formik.setFieldValue('gender', data?.gender ?? '');
            formik.setFieldValue('birthDate', data?.birthDate ?? '' )
            formik.setFieldValue('street', data?.address?.street ?? '');
            formik.setFieldValue('zipCode', data?.address?.zipCode ?? '');
            formik.setFieldValue('city',  data?.address?.city ?? '');
            formik.setFieldValue('state',  data?.address?.state ?? '');
            formik.setFieldValue('neighborhood',  data?.address?.neighborhood ?? '');
          }
        })
        .catch((error) => console.log('[ERROR/API] patientByCpf', error))
        .finally(() => setLoadingData(false))
    }
  },[])

  useEffect(() => {
    autoCompleteAdress(formik.values.zipCode);
  },[formik.values.zipCode])

  useEffect(() => {
    autoCompletePatientData(formik.values.cpf)
  },[formik.values.cpf])
  const steps = ['Dados Pessoais', 'Endereço']

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white rounded-20 px-5 py-4 w-[85%] max-w-[500px]">
        <p className="font-semibold text-xl text-center uppercase pb-5">
          {patientSelected ? 'Atualizar Paciente' : 'Cadastro de Paciente'}
        </p>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {loadingData ? 
            <div className='flex items-center flex-col justify-center py-6 gap-4'>
              <CircularProgress style={{ fontSize: 36, color: colors.black }} />
              <p className="text-black font-semibold">Buscando dados...</p>
            </div>
          
          :
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
                    id="cpf"
                    onChange={formik.handleChange}
                    value={masks.cpfMask(formik.values.cpf)}
                    label="CPF"
                    type="tel"
                    placeholder="000.000.000-00"
                    icon={<ArticleOutlined style={{ color: colors.black }} />}
                    error={formik.errors.cpf}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.cpf}
                  />
                  <InputStyled
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    label="Nome"
                    type="text"
                    placeholder="Exemplo"
                    icon={<PersonOutlineOutlined style={{ color: colors.black }} />}
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
                    icon={<EmailOutlinedIcon style={{ color: colors.black }} />}
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
                    icon={<LocalPhoneOutlined style={{ color: colors.black }} />}
                    maxLength={15}
                    error={formik.errors.phone}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.phone}
                  />

                  <InputStyled
                    id="birthDate"
                    onChange={formik.handleChange}
                    value={masks.dateMask(formik.values.birthDate)}
                    label="Data de Nascimento"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    icon={<CalendarMonthOutlined style={{ color: colors.black }} />}
                    maxLength={10}
                    error={formik.errors.birthDate}
                    onBlur={formik.handleBlur}
                    isTouched={formik.touched.birthDate}
                  />

                  <SelectStyled
                    label="Sexo"
                    icon={<Wc style={{ color: colors.black }} />}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    id="gender"
                    options={optionsSex}
                  />

                  <div className="flex gap-5 pt-5">
                    <ButtonStyled
                      type="button"
                      onClick={setIsClose}
                      styles="w-full"
                      bgColor="bg-red"
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
                        styles="w-full"
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
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
                    icon={<AddLocationIcon style={{ color: colors.black }} />}
                  />
                  <SelectStyled
                      id="state"
                      label="Estado"
                      placeholder="Selecione o estado"
                      value={formik.values.state}
                      onChange={(e) => formik.setFieldValue('state', e.target.value)}
                      icon={<AddLocationIcon style={{ color: colors.black }} />}
                      options={states}
                  />
                    
              


                  <div className="flex gap-5 pt-5">
                    <ButtonStyled
                      type="button"
                      onClick={() => setViewTwo(false)}
                      styles="w-full"
                      bgColor="bg-red"
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
                        styles="w-full"
                        title={patientSelected ? 'Atualizar' : 'Cadastrar'}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
        }

        </form>
      </div>
    </Modal>
  )
}

export default ModalPatient
