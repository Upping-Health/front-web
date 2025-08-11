'use client'

import ButtonStyled from '@/components/buttons/button'
import ErrorIcon from '@mui/icons-material/Error'

import { useRouter } from 'next/navigation'

export default function PatientNotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center flex flex-col justify-center items-center transition-colors duration-300">
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-red-100 text-red-600 transition-colors duration-300">
          <ErrorIcon className="text-5xl" />
        </div>

        <h1 className="text-5xl font-extrabold text-red-600 mb-4 transition-colors duration-300">
          OPS!
        </h1>
        <p className="text-lg font-semibold text-black dark:text-gray-200 mb-2 transition-colors duration-300">
          Paciente não encontrado
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
          O paciente que você está procurando não existe ou foi removido.
        </p>

        <ButtonStyled
          type="button"
          onClick={() => router.back()}
          title="Voltar"
          styles="bg-red-600  w-3/4"
        />
      </div>
    </div>
  )
}
