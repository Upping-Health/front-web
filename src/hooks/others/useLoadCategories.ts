import { ApiResponse } from '@/interfaces/api-response.interface'
import { Categories } from '@/interfaces/categories.interface'
import { Food } from '@/interfaces/food.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

type CategoriesApiResponse = ApiResponse<Categories[]>

type QueryParams = Record<string, any>

const useLoadCategories = (hidden: boolean, params?: QueryParams) => {
  const [data, setData] = useState<Categories[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)

      const res = await api.get<CategoriesApiResponse>('/categories', {
        params,
      })

      setData(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /categories/index', error?.response)
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    if (!hidden) loadData()
  }, [hidden, loadData])

  return { loading, data, loadData }
}

export default useLoadCategories
