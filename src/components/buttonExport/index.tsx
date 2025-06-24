import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import React from 'react'

interface IButtonExportStyled {

  onClick?: () => void

}
const ButtonExport = ({onClick,  }: IButtonExportStyled) => {
  return (
    <button className={`flex justify-center items-center border-gray bg-white border rounded-xl px-4 gap-2`} onClick={onClick}>

      <FileDownloadOutlined/>

      <p className='text-black font-medium'>Exportar</p>
    </button>
  )
}

export default ButtonExport