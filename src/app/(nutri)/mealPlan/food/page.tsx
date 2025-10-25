'use client'
import TableDash from '@/components/tables/tableDash'
import TopDash from '@/components/layout/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/lib/colors/colors'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { CircularProgress } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import ModalFood from './_components/ModalFood'
import useLoadFoods from '@/hooks/foods/useLoadFoods'

const FoodPlanMenu = ({ params }: { params: { id: string } }) => {
  const { data, loadData, loading } = useLoadFoods(true)
  const [openModal, setopenModal] = useState<boolean>(false)

  const handleOpenModal = useCallback(() => {
    setopenModal(true)
  }, [])

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
    <>
      <div className="w-full relative h-full">
        <TopDash
          title="Alimentos"
          description="Acompanhe e gerencie seus pacientes com facilidade."
          icon={RestaurantOutlinedIcon}
          textBtn={'Novo Alimento'}
          onClick={handleOpenModal}
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
      </div>
      <ModalFood
        open={openModal}
        loadNewData={loadData}
        setIsClose={() => setopenModal(false)}
        dataSelected={null}
      />
    </>
  )
}

export default FoodPlanMenu
