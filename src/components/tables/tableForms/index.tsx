import ButtonStyled from '@/components/buttons/button'
import ButtonActive from '@/components/buttons/buttonActive'
import ButtonExport from '@/components/buttons/buttonExport'
import InputStyled from '@/components/inputs/inputStyled'
import NotFoundData from '@/components/layout/notFoundData'
import api from '@/services/api'
import QuizIcon from '@mui/icons-material/Quiz'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import FilterTable from '../filterTable'
import PaginationDash from '../paginationDash'

interface TableProps {
  data: any[]
  pagination?: boolean
  itemsPerPage?: number
  search?: boolean
}

const CardForms: React.FC<TableProps> = ({
  data,
  pagination = true,
  itemsPerPage = 10,
  search = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const router = useRouter()

  const updateStatusForm = useCallback((data: any) => {
    setLoadingIds((prev) => [...prev, data.uuid])

    api
      .put(`/forms/change-status/${data.uuid}`)
      .then(() => {
        data.is_active = !data.is_active
      })
      .catch(() => {})
      .finally(() => {
        setLoadingIds((prev) => prev.filter((item) => item !== data.uuid))
      })
  }, [])

  const numberPages = Math.ceil(data.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    if (!data) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [currentPage, data])

  return (
    <div className="relative flex flex-col gap-4 s:h-[70%] d:h-[90%] justify-between pb-3 w-full">
      <div>
        {search && (
          <div className="flex mb-4 w-full justify-between flex-wrap gap-2">
            <InputStyled
              id="search"
              type="search"
              styles="border-gray bg-white py-3 dark:bg-gray-700 dark:!border-gray-600"
              stylesContainer="flex-1"
              stylesInput="font-light w-full text-sm dark:!bg-gray-700"
              icon={
                <SearchIcon className="text-xl dark:text-white text-black" />
              }
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Buscar pacientes por nome, telefone ou email..."
            />

            <div className="flex gap-2">
              <FilterTable
                options={[
                  { label: 'Ativo', value: 'active' },
                  { label: 'Inativo', value: 'inactive' },
                ]}
                onSelect={(value) => console.log(value)}
                selected="active"
                label="Ordenar por"
              />

              <FilterTable
                options={[
                  { label: 'Ativo', value: 'active' },
                  { label: 'Inativo', value: 'inactive' },
                ]}
                onSelect={() => {}}
                selected="inactive"
              />

              <ButtonExport onClick={() => {}} />
            </div>
          </div>
        )}

        {dataToDisplay.length === 0 ? (
          <NotFoundData
            title="Nenhum formulário encontrado."
            description=" Crie formulários personalizados para coletar informações dos seus
            pacientes de forma organizada e eficiente"
          />
        ) : (
          <div className="flex flex-row gap-4 justify-between flex-wrap">
            {dataToDisplay.map((data, index) => {
              const isLoading = loadingIds.includes(data?.uuid)

              return (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl shadow w-full dark:bg-slate-600 dark:border-slate-500"
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <div className="bg-green h-10 w-10 rounded-xl flex justify-center items-center">
                        <QuizIcon className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-black dark:text-white">
                          {data?.title}
                        </p>
                        <p className="font-extralight text-black dark:text-white text-sm">
                          {data?.type_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <ButtonActive
                        active={data?.is_active}
                        onClick={() => updateStatusForm(data)}
                        disabled={isLoading}
                        loading={isLoading}
                      />

                      {/* <ButtonStyled
                        onClick={() => {}}
                        title={'Respostas'}
                        type="button"
                        styles="bg-transparent border border-gray h-[35px] px-3 text-sm"
                        textColor="text-black dark:text-white"
                      /> */}
                      <ButtonStyled
                        onClick={() => router.push(`/forms/${data.uuid}/edit`)}
                        title={'Editar'}
                        type="button"
                        styles="bg-black h-[35px] px-3 text-sm shadow-md dark:bg-white dark:text-black"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {pagination && dataToDisplay.length > 0 && (
        <div className="flex justify-end mt-2 pr-4">
          <PaginationDash
            count={numberPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default CardForms
