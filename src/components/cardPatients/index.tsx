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
          <div className="flex mb-4 w-full">
            <InputStyled
              id="search"
              type="search"
              styles="border-gray bg-white"
              stylesContainer='w-full'
              stylesInput="font-light  w-full text-sm"
              icon={<SearchIcon style={{ color: colors.black, fontSize: 16 }} />}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Buscar pacientes por nome, telefone ou email..."
            />
          </div>
        )}

    
        <div className="">
    
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
