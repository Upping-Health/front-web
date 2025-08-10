import ButtonStyled from '@/components/buttons/button'
import Patient from '@/interfaces/patient.interface'
import { SEX_PT_BR } from '@/lib/types/sex'
import { CircularProgress } from '@mui/material'
import React, { memo } from 'react'

interface PatientHeaderProps {
  patient: Patient | null
  loading: boolean
  formik: any
  countdown: number
}

const PatientHeader = ({
  patient,
  loading,
  formik,
  countdown,
}: PatientHeaderProps) => {
  console.log('PatientHeader')
  return (
    <div className="flex items-center justify-between shadow-sm rounded-xl p-4 bg-white dark:bg-gray-800">
      <div className="flex flex-col">
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Nome:
          </span>{' '}
          <span className="text-gray-900 dark:text-white font-light">
            {patient?.name}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Idade:
          </span>{' '}
          <span className="text-gray-900 dark:text-white font-light">
            {patient?.age ?? 1} anos
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Gênero:
          </span>{' '}
          <span className="text-gray-900 dark:text-white font-light">
            {SEX_PT_BR[patient?.gender ?? 'male']}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {loading ? (
          <ButtonStyled
            bgColor="bg-darkGray"
            textColor="text-white"
            type="submit"
            styles="w-[150px]"
            title="Salvando..."
            icon={
              <CircularProgress
                style={{ width: 20, height: 20, color: '#FFFFFF' }}
              />
            }
          />
        ) : (
          <ButtonStyled
            type="submit"
            styles="w-[150px] bg-green-600"
            title={'Salvar'}
            disabled={!formik.isValid}
          />
        )}
        {!loading && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Salvando automaticamente em{' '}
            <span className="font-semibold">{countdown}s</span>...
          </p>
        )}
      </div>
    </div>
  )
}

export default memo(PatientHeader)
