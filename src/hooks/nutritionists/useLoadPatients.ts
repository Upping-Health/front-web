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
          document: p.profile?.document ?? null,
          phone: p.profile?.phone ?? null,
          birth_date: p.profile?.birth_date ?? null,
          gender:
            p.profile?.gender === 'male' || p.profile?.gender === 'female'
              ? p.profile.gender
              : 'male',
          status: p.status,
          age: p.profile?.age ?? 0,
          photo: p.profile?.photo ?? null,

          address: {
            street: p.profile?.street ?? null,
            number: p.profile?.number ?? null,
            complement: p.profile?.complement ?? null,
            neighborhood: p.profile?.neighborhood ?? null,
            city: p.profile?.city ?? null,
            state: p.profile?.state ?? null,
            zipCode: p.profile?.zip_code ?? null,
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
