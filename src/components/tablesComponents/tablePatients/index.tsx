import masks from '@/utils/masks/masks'
import SearchIcon from '@mui/icons-material/Search'
import React, { useMemo, useState } from 'react'
import PaginationDash from '../paginationDash'
import ButtonStyled from '@/components/buttonsComponents/button'
import ButtonExport from '@/components/buttonsComponents/buttonExport'
import FilterTable from '../filterTable'
import InputStyled from '@/components/inputsComponents/inputStyled'
import ProfileRounded from '@/components/profileRounded'
interface TableProps {
  data: any[]
  pagination?: boolean
  itemsPerPage?: number
  search?: boolean
}

const CardPatients: React.FC<TableProps> = ({
  data,
  pagination = true,
  itemsPerPage = 10,
  search = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const numberPages = Math.ceil(data.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [currentPage, data])

  return (
    <div className="relative flex flex-col gap-4 mt-10 s:h-[70%] d:h-[90%] justify-between py-3 w-full">
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

        <div className="flex flex-row gap-4 justify-between flex-wrap">
          {dataToDisplay.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-white p-3 rounded-xl shadow w-full dark:bg-gray-700 border dark:border-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <ProfileRounded user={data} />

                    <div>
                      <p className="font-medium text-black dark:text-white">
                        {data?.name}
                      </p>

                      <div className="flex gap-6 font-light text-sm text-black dark:text-white">
                        <p>{data?.years ?? 0} anos</p>

                        <p>{masks.cpfMask(data?.document)}</p>

                        <p>{masks.phoneMask(data?.phone)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="bg-blue-50 border-blue-200 border h-[35px] px-4 flex items-center justify-center rounded-md text-blue-700 text-sm font-medium">
                      10 consultas
                    </span>
                    {/* <ButtonActive active={data?.status === 'ACTIVE'} /> */}

                    <ButtonStyled
                      onClick={() => {}}
                      title={'Histórico'}
                      type="button"
                      styles="bg-terciary h-[35px] px-3 rounded-md"
                    />
                    <ButtonStyled
                      onClick={() => {}}
                      title={'Iniciar consulta'}
                      type="button"
                      styles="bg-black h-[35px] px-3 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {pagination && (
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

export default CardPatients
