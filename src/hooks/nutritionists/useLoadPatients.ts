import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'

const fetchPatients = async (): Promise<Patient[]> => {
  const res = await api.get('/patients')
  return res?.data?.data?.map((item: any) => {
    const p = item.patient
    return {
      uuid: p.uuid,
      name: p.name,
      email: p.email,
      document: p.profile?.document ?? null,
      phone: p.profile?.phone ?? null,
      birth_date: p.profile?.birth_date ?? null,
      gender: p.profile?.gender ?? null,
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
      },
    }
  })
}

const useLoadPatients = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)

  const query = useQuery<Patient[]>({
    queryKey: ['patients', user?.uuid],
    queryFn: fetchPatients,
    enabled: !hidden && !!user,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error('[ERROR API] /patients/', error?.response?.data || error)
      },
    },
  })

  return {
    loading: query.isLoading || query.isFetching,
    data: query.data || [],
    loadData: fetchPatients,
  }
}

export default useLoadPatients
