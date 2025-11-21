import ButtonExport from '@/components/buttons/buttonExport'
import InputStyled from '@/components/inputs/inputStyled'
import NotFoundData from '@/components/layout/notFoundData'
import { colors } from '@/lib/colors/colors'
import { exportTable } from '@/lib/export/export-xlsx'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
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
import FilterTable from '../filterTable'
import PaginationDash from '../paginationDash'

interface TableFilterOption {
  label: string
  value: string
}

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
  exportName?: string
  defaultSort?: { field: string; direction: 'asc' | 'desc' }
  filters?: {
    label: string
    options: TableFilterOption[]
    onSelect: (value: string) => void
    selected?: string
  }
}

const TableDash: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  rowKey,
  sx,
  pagination = true,
  itemsPerPage = 8,
  search = true,
  defaultSort,
  exportName = 'upping-health-exportacao',
  filters,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    field: string
    direction: 'asc' | 'desc'
  } | null>(defaultSort || null)

  const handleSort = (field: string) => {
    setSortConfig((prev) => {
      if (prev && prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { field, direction: 'asc' }
    })
  }

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }, [data, columns, searchTerm])

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.field]
      const bValue = b[sortConfig.field]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  const numberPages = Math.ceil(sortedData.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedData.slice(startIndex, endIndex)
  }, [currentPage, sortedData])

  return (
    <div className="relative flex flex-col justify-between w-full flex-1 pb-4">
      {search && (
        <div className="flex mb-4 w-full justify-between flex-wrap gap-2">
          <InputStyled
            id="search"
            type="search"
            styles="border-gray bg-white py-2 h-[42px] dark:bg-gray-700 dark:!border-gray-600"
            stylesContainer="flex-1"
            stylesInput="font-light w-full text-sm dark:!bg-gray-700"
            icon={<SearchIcon className="text-xl dark:text-white text-black" />}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Busca..."
          />

          <div className="flex gap-2">
            {filters && (
              <FilterTable
                label={filters.label}
                options={filters.options}
                selected={filters.selected}
                onSelect={(value) => {
                  filters.onSelect(value)
                  setCurrentPage(1)
                }}
              />
            )}
            <ButtonExport
              onClick={() => exportTable(columns, sortedData, exportName)}
            />
          </div>
        </div>
      )}

      <div className="h-full overflow-auto">
        {dataToDisplay?.length === 0 ? (
          <NotFoundData
            title="Nenhum resultado encontrado"
            description="Tente ajustar sua pesquisa ou filtros para encontrar os dados desejados."
          />
        ) : (
          <TableContainer
            component={Paper}
            className="dark:bg-gray-800 overflow-x-auto"
            sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              ...sx,
            }}
          >
            <MuiTable sx={{ tableLayout: 'auto' }}>
              <TableHead
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.08)',
                }}
                className="dark:bg-gray-800"
              >
                <TableRow>
                  {columns.map((col) => {
                    const isSorted = sortConfig?.field === col.field
                    return (
                      <TableCell
                        key={col.field}
                        onClick={() => handleSort(col.field)}
                        onMouseEnter={() => setHoveredColumn(col.field)}
                        onMouseLeave={() => setHoveredColumn(null)}
                        sx={{
                          padding: '0.75rem 1.5rem',
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: colors.black,
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                        className="dark:text-gray-300"
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {col.header}
                          {(hoveredColumn === col.field ||
                            sortConfig?.field === col.field) &&
                            (isSorted ? (
                              <SortIcon fontSize="small" />
                            ) : (
                              <SortIcon
                                fontSize="small"
                                style={{ opacity: 0.4 }}
                              />
                            ))}
                        </span>
                      </TableCell>
                    )
                  })}
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
                      transition: 'all 0.2s ease',
                      '&:nth-of-type(even)': {
                        backgroundColor: 'rgba(0,0,0,0.02)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(201,11,11,0.08)',
                      },
                    }}
                    className="dark:hover:bg-gray-600"
                  >
                    {columns.map((col, index) => {
                      const value = row[col.field]
                      return (
                        <TableCell
                          key={index}
                          sx={{
                            color: colors.black,
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            padding: '0.75rem 1.5rem',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}
                          className="dark:text-gray-200 dark:border-gray-700"
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
        <div className="flex justify-end mt-2">
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
