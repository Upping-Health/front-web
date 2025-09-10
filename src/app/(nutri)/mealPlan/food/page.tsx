'use client'
import TableDash from '@/components/tables/tableDash'
import TopDash from '@/components/layout/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/lib/colors/colors'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { CircularProgress } from '@mui/material'
import { useMemo } from 'react'

const FoodPlanMenu = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)

  const columns = useMemo(
    () => [
      {
        header: 'Nome',
        field: 'name',
      },
      {
        header: 'Energia',
        field: 'energy',
      },
      {
        header: 'Gordura',
        field: 'energy',
      },
      {
        header: 'Carboídratos',
        field: 'energy',
      },
      {
        header: 'Proteína',
        field: 'energy',
      },
    ],
    [],
  )

  return (
    <div className="w-full relative h-full">
      <TopDash
        title="Alimentos"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={RestaurantOutlinedIcon}
        textBtn={'Novo Alimento'}
        onClick={() => {}}
      />

      {loading ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.primary }}
            />
          </div>
        </>
      ) : (
        <>
          <TableDash columns={columns} data={[]} rowKey="id" />
        </>
      )}

      {/* <ModalSelectPatient
        open={openSelectPatient}
        setIsClose={() => setOpenSelectPatient(false)}
        patientId={patientId}
        setPatientId={setPatientId}
      /> */}
    </div>
  )
}

export default FoodPlanMenu
