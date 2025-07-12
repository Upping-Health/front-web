'use client'
import CardPatients from '@/components/tablesComponents/tablePatients'
import TopDash from '@/components/layoutComponents/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import Person from '@mui/icons-material/Person'
import { CircularProgress } from '@mui/material'
import MenuConsult from '@/components/consult-components/menu'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StraightenIcon from '@mui/icons-material/Straighten'
import CardConsult from '@/components/consult-components/card'

const ConsultPage = () => {
  const patient = {
    name: 'Guilherme Xavier Martins',
    age: 25,
    gender: 'Masculino',
    cpf: '110.525.576-00',
  }

  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title="Guilherme Xavier Martins"
        description="Masculino, 22 anos"
        icon={Person}
        // onClick={() => {}}
        // textBtn='Voltar'
        // btnIcon={ArrowBackIcon}
      />

      <div className="h-full w-full flex gap-4">
        <CardConsult icon={StraightenIcon} title="Antroprometrias" />
        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>
    </div>
  )
}

export default ConsultPage
