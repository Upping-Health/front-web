'use client'
import CardPatients from '@/components/tablesComponents/tablePatients'
import TopDash from '@/components/layoutComponents/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'
import MenuConsult from '@/components/consult-components/menu'

const ConsultPage = () => {
  const patient = {
    name: 'Guilherme Xavier Martins',
    age: 25,
    gender: 'Masculino',
    cpf: '110.525.576-00',
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* <TopDash
        title="Iniciar consulta"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={AddIcon}
      /> */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
            {patient.name[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p className="text-sm text-gray-500">{patient.age} anos</p>
            <p className="text-sm text-gray-500">{patient.gender}</p>
          </div>
        </div>
      </div>

      <MenuConsult />
    </div>
  )
}

export default ConsultPage
