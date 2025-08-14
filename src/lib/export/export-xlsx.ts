import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

type ExportFormat = 'xlsx' | 'csv'

interface ExportColumn {
  header: string
  field: string
  render?: (value: any, row?: any) => any
  noExport?: boolean
}

export const exportTable = (
  columns: ExportColumn[],
  data: any[],
  filename = 'export',
  format: ExportFormat = 'xlsx',
) => {
  const exportColumns = columns.filter((col) => !col.noExport)

  const exportData = data.map((row) => {
    const obj: any = {}
    exportColumns.forEach((col) => {
      const value = col.render
        ? col.render(row[col.field], row)
        : row[col.field]
      obj[col.header] = value
    })
    return obj
  })

  if (format === 'csv') {
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `${filename}.csv`)
  } else {
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    const range = XLSX.utils.decode_range(worksheet['!ref']!)
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })]
      if (cell) {
        cell.s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: 'C90B0B' } },
          alignment: { horizontal: 'center', vertical: 'center' },
        }
      }
    }

    for (let R = 1; R <= range.e.r; ++R) {
      const bgColor = R % 2 === 0 ? 'FFFFFF' : 'F3F3F3'
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })]
        if (cell) {
          cell.s = {
            ...(cell.s || {}),
            fill: { fgColor: { rgb: bgColor } },
          }
        }
      }
    }

    const colWidths = exportColumns.map((col) => ({
      wch: Math.max(col.header.length + 2, 15),
    }))
    worksheet['!cols'] = colWidths

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')

    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true,
    })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, `${filename}.xlsx`)
  }
}
