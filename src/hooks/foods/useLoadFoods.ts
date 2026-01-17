import { ApiResponse } from '@/interfaces/api-response.interface'
import { Food } from '@/interfaces/food.interface'
import api from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type ApiResponsePagination = {
  current_page: number
  data: Food[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

type FoodApiResponse = ApiResponse<ApiResponsePagination>

const useLoadFoods = (hidden: boolean) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(8)
  const [search, setSearch] = useState<string>('')

  const fetchFoods = async (
    page: number,
    perPage: number,
    search: string,
  ): Promise<ApiResponsePagination> => {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      name: search || '',
      type: 'full',
    })

    console.log('CHAMOU API')
    const res = await api.get<FoodApiResponse>(
      `/foods/list?${params.toString()}`,
    )
    return res.data.data
  }

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['foods', currentPage, perPage, search],
    queryFn: () =>
      fetchFoods(currentPage, perPage, search.length >= 2 ? search : ''),
    enabled: hidden,
    staleTime: 1000 * 60 * 2,
  })

  return {
    loading: isLoading || isFetching,
    data: data?.data ?? [],
    currentPage: currentPage,
    lastPage: data?.last_page ?? 1,
    total: data?.total ?? 0,
    perPage,
    loadData: refetch,
    setPerPage,
    setCurrentPage,
    search,
    setSearch,
  }
}

export default useLoadFoods
