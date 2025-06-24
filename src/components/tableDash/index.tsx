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
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import ButtonExport from '../buttonExport'
import FilterTable from '../filterTable'

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

            <FilterTable options={[]} onSelect={() => {}} selected='' />
            <ButtonExport 
              onClick={() => {}}
            
            />
            {/* <SelectStyled
                icon={<Wc style={{ color: colors.primary }} />}
                value={''}
                onChange={() => {}}
                id="gender"
  
              /> */}
          </div>
        )}

    
        <div className="">
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
            <TableHead
                sx={{
                  ///boxShadow: "0 5px 10px #e1e5ee",
                  background: colors.white,
                  
                }}
              >

                <TableRow >

                  {selectable && (
                    <TableCell align='center'>
                     <button
                      onClick={() => {}}
                      className={`w-5 h-5 border border-primary bg-white text-gray-700 
                        transition-colors duration-200`}
                    >
                      
                    </button>


                    </TableCell>
                  )}
                  {columns.map((col, index) => (
                    <TableCell
                    key={index}
                    sx={{
                      padding: "0.7rem 2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1rem",
                      fontSize: "0.8rem",
                      fontWeight: 900,
                      color: colors.black
                    }}
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
                
                      '&:nth-of-type(even)': {
                        backgroundColor: '#f6f6f6',
                      },
                      '&:hover': {
                        backgroundColor: '#f6f6f6',
                      },
                    }}
                  >

                    {selectable && (
                        <TableCell align='center'>
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => {}}
                          />
                        </TableCell>
                      )}
                    {columns.map((col, index) => {
                      const value = row[col.field]
                      return (
                        <TableCell
                          key={index}
                          sx={{
                          //padding: '8px',
                            color: colors.black,
                            textAlign: 'left',
                            whiteSpace: 'wrap',
                            fontSize: "0.8rem",
                            padding: "0.5rem 2rem",

                          }}
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

export default TableDash
