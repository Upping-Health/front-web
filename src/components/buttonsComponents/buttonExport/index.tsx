import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import React from 'react'

interface IButtonExportStyled {
  onClick?: () => void
}
const ButtonExport = ({ onClick }: IButtonExportStyled) => {
  return (
    <button
      className={`flex justify-center items-center border-gray bg-white border rounded-xl px-4 gap-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
      onClick={onClick}
    >
      <FileDownloadOutlined />

      <p className="text-black dark:text-white font-medium text-sm">Exportar</p>
    </button>
  )
}

export default ButtonExport
