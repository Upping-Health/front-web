import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadPatients = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<Patient[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/patients`)

      const patients: Patient[] = res?.data?.data?.map((item: any) => {
        const p = item.patient

        return {
          uuid: p.uuid,
          name: p.name,
          email: p.email,
          document: p.profile?.document ?? '',
          phone: p.profile?.phone ?? '',
          birth_date: p.profile?.birth_date ?? '',
          gender:
            p.profile?.gender === 'male' || p.profile?.gender === 'female'
              ? p.profile.gender
              : 'male',
          status: p.status,
          age: null,
          profile: {
            photo: p.profile?.photo ?? '',
          },
          address: {
            street: p.profile?.street ?? '',
            number: p.profile?.number ?? '',
            complement: p.profile?.complement,
            neighborhood: p.profile?.neighborhood ?? '',
            city: p.profile?.city ?? '',
            state: p.profile?.state ?? '',
            zipCode: p.profile?.zip_code ?? '',
            // country: p.profile?.country ?? ""
          },
        }
      })
      setdata(patients)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadPatients
