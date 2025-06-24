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
          <div className="flex mb-4 w-full h-[46px] gap-4">
            <InputStyled
              id="search"
              type="search"
              styles="border-gray bg-white py-3"
              stylesContainer="w-full"
              stylesInput="font-light  w-full text-sm"
              icon={
                <SearchIcon style={{ color: colors.black, fontSize: 20 }} />
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
                className="bg-white p-3 rounded-xl shadow w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <ProfileRounded user={data} />

                    <div>
                      <p className="font-medium text-black">{data?.name}</p>

                      <div className="flex gap-6 font-light text-sm text-black">
                        <p>{data?.years ?? 0} anos</p>

                        <p>{masks.cpfMask(data?.cpf)}</p>

                        <p>{masks.phoneMask(data?.cpf)}</p>
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
                      styles="bg-primary h-[35px] px-3 rounded-md"
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
