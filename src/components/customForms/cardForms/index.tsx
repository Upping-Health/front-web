import React from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { colors } from '@/utils/colors/colors';
interface ICustomForm {}

const CardForm = ({}: ICustomForm) => {
  return (
    <div className="flex flex-col items-center justify-center text-2xl rounded-xl gap-2 py-4 bg-white p-4 text-center shadow dark:bg-slate-700 dark:border-slate-600">

      <AutoAwesomeIcon style={{fontSize: 72, color: colors.newYellow}}/>


      <p className='font-semibold dark:text-white'>Comece criando sua primeira pergunta.</p>

      <p className='text-lg font-light dark:text-white'>Escolha um tipo de campo na barra lateral para começar</p>

    </div>
  )
}

export default CardForm
