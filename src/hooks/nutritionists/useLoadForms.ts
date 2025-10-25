import { useQuery } from '@tanstack/react-query'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'

const fetchForms = async (): Promise<Schedule[]> => {
  const res = await api.get('/forms')
  return res?.data?.data ?? []
}

const useLoadForms = (hidden: boolean) => {
  const query = useQuery<Schedule[]>({
    queryKey: ['forms'],
    queryFn: fetchForms,
    enabled: !hidden,
    staleTime: 1000 * 60 * 2,
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error('[ERROR API] /forms/', error?.response?.data || error)
      },
    },
  })

  return {
    loading: query.isLoading || query.isFetching,
    data: query.data || [],
    loadData: query.refetch,
  }
}

export default useLoadForms
