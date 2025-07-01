import { colors } from '@/utils/colors/colors'
import SearchIcon from '@mui/icons-material/Search'
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import PaginationDash from '../paginationDash'
import ButtonExport from '@/components/buttonsComponents/buttonExport'
import FilterTable from '../filterTable'
import InputStyled from '@/components/inputsComponents/inputStyled'
import NotFoundData from '@/components/layoutComponents/notFoundData'

interface TableProps {
  columns: Array<{
    header: string
    field: string
    render?: (value: any, row?: any) => React.ReactNode
  }>
  data: any[]
  onRowClick?: (row: any) => void
  rowKey: string
  sx?: object
  pagination?: boolean
  itemsPerPage?: number
  search?: boolean
  selectable?: boolean
}

const TableDash: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  rowKey,
  sx,
  pagination = true,
  itemsPerPage = 10,
  search = true,
  selectable = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }, [data, columns, searchTerm])

  const numberPages = Math.ceil(filteredData.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [currentPage, filteredData])

  return (
    <div className="relative flex flex-col gap-4 mt-10 s:h-[70%] d:h-[90%] justify-between py-3 w-full">
      <div>
        {search && (
          <div className="flex mb-4 w-full justify-between flex-wrap gap-2">
            <InputStyled
              id="search"
              type="search"
              styles="border-gray bg-white py-3 dark:border-gray-600 dark:bg-gray-700"
              stylesContainer="flex-1"
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
            title="Nenhum resultado encontrado"
            description="Tente ajustar sua pesquisa ou filtros para encontrar os dados desejados."
          />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              ...sx,
              boxShadow:
                '0 1px 3px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.06)',
              borderRadius: 3,
            }}
          >
            <MuiTable
              sx={{
                tableLayout: 'auto',
              }}
            >
              <TableHead className="bg-white dark:bg-slate-700 dark:border-gray-600">
                <TableRow>
                  {columns.map((col, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        padding: '0.7rem 2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1rem',
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: colors.black,
                      }}
                      className="dark:text-white"
                    >
                      {col.header.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataToDisplay.map((row) => (
                  <TableRow
                    key={row[rowKey]}
                    hover
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:nth-of-type(even)': { backgroundColor: '#f6f6f6' },
                      '&:hover': { backgroundColor: '#f6f6f6' },
                    }}
                    className="dark:bg-slate-600 hover:dark:bg-slate-700"
                  >
                    {columns.map((col, index) => {
                      const value = row[col.field]
                      return (
                        <TableCell
                          key={index}
                          sx={{
                            color: colors.black,
                            textAlign: 'left',
                            whiteSpace: 'wrap',
                            fontSize: '0.8rem',
                            padding: '0.5rem 2rem',
                          }}
                          className="dark:text-white"
                        >
                          {col.render ? col.render(value, row) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
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

export default TableDash
