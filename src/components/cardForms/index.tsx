import React, { useMemo, useState } from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { colors } from '@/utils/colors/colors'
import PaginationDash from '../PaginationDash'
import SearchIcon from '@mui/icons-material/Search'
import InputStyled from '../inputStyled'
import SelectStyled from '../select'
import Wc from '@mui/icons-material/Wc'
import ButtonActive from '../buttonActive'
import ButtonStyled from '../button'
import AssignmentInd from '@mui/icons-material/AssignmentInd'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ButtonExport from '../buttonExport'
import FilterTable from '../filterTable'
import ProfileRounded from '../profileRounded'
import masks from '@/utils/masks/masks'
import QuizIcon from '@mui/icons-material/Quiz'
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

  const numberPages = Math.ceil(data.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    console.log(data);
    if(!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data?.slice(startIndex, endIndex)
  }, [currentPage, data])

  return (
    <div className="relative flex flex-col gap-4 mt-10 s:h-[70%] d:h-[90%] justify-between py-3 w-full">
      <div>
        {search && (
          <div className="flex mb-4 w-full h-[46px] gap-4">
            <InputStyled
              id="search"
              type="search"
              styles="border-gray bg-white py-3 dark:border-gray-600 dark:bg-gray-700"
              stylesContainer="w-full"
              stylesInput="font-light  w-full text-sm dark:bg-gray-700"
              icon={
                <SearchIcon className="text-xl dark:text-white text-black" />
              }
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Buscar pacientes por nome, telefone ou email..."
            />

            <FilterTable
              options={[
                {
                  label: 'Ativo',
                  value: 'active',
                },
                {
                  label: 'Inativo',
                  value: 'inactive',
                },
              ]}
              onSelect={() => {}}
              selected="inactive"
            />
            <ButtonExport onClick={() => {}} />

            {/* <SelectStyled
                icon={<Wc style={{ color: colors.primary }} />}
                value={''}
                onChange={() => {}}
                id="gender"
  
              /> */}
          </div>
        )}

        <div className="flex flex-row gap-4 justify-between flex-wrap">
          {dataToDisplay.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-white p-3 rounded-xl shadow w-full  dark:bg-slate-600 dark:border-slate-500"
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div className="bg-newGreen h-12 w-12 rounded-xl flex justify-center items-center">
                      <QuizIcon className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white">
                        {data?.title}
                      </p>
                      <p className="font-extralight text-black dark:text-white text-sm">
                        {data?.type_id} 
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <ButtonActive active={data?.is_active} />

                    <ButtonStyled
                      onClick={() => {}}
                      title={'Respostas'}
                      type="button"
                      styles="bg-transparent border border-gray h-[35px] px-3 text-sm"
                      textColor="text-black dark:text-white"
                    />
                    <ButtonStyled
                      onClick={() => {}}
                      title={'Editar'}
                      type="button"
                      styles="bg-black h-[35px] px-3 text-sm"
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

export default CardForms
