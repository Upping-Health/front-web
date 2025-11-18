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
        header: 'Fonte',
        field: '',
        render(_: any, row: any) {
          return 'TBCA'
        },
      },
      {
        header: 'SKU',
        field: 'sku',
      },
      {
        header: 'Status',
        field: 'is_public',
        render(_: any, row: any) {
          return (
            <div
              className={`
              text-black
              h-[35px]
              px-3
              w-14
              rounded-6
              shadow-md
              font-semibold
              flex
              justify-center
              items-center
              transition
              duration-300
              text-xs
              ${row.is_public === 1 ? 'bg-paid text-white' : 'bg-yellow-100 text-black'}
            `}
            >
              <p
                className={`${row.is_public === 1 ? 'text-paidFont' : 'text-yellow-400'} font-semibold`}
              >
                {row.is_public === 1 ? 'Público' : 'Privado'}
              </p>
            </div>
          )
        },
      },
    ],
    [],
  )

  return (
    <>
      <div className="w-full relative h-full">
        <TopDash
          title="Alimentos"
          description="Gerencie seus alimentos de forma simples e organizada."
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
