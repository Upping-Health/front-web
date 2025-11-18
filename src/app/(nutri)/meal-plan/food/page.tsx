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
import Loading from '@/components/layout/loading'

const FoodPlanMenu = ({ params }: { params: { id: string } }) => {
  const { data, loadData, loading } = useLoadFoods(false)
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
        header: 'SKU',
        field: 'sku',
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
            <Loading text="Carregando alimentos..." className="!h-3/4" />
          </>
        ) : (
          <>
            <TableDash columns={columns} data={data} rowKey="id" />
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
