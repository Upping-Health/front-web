'use client'
import TableDash from '@/components/tables/tableDash'
import TopDash from '@/components/layout/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/lib/colors/colors'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { CircularProgress } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import ModalRecipes from './_components/ModalRecipes'
import useLoadFoods from '@/hooks/foods/useLoadFoods'
import Loading from '@/components/layout/loading'

const RecipesPage = ({ params }: { params: { id: string } }) => {
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
        header: 'FONTE',
        field: 'sku',
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
          title="Receitas"
          description="Gerencie suas receitas de forma simples e organizada."
          icon={RestaurantOutlinedIcon}
          textBtn={'Nova Receita'}
          onClick={handleOpenModal}
        />

        {/* {loading ? (
          <>
            <Loading text="Carregando receitas..." className="!h-3/4" />
          </>
        ) : (
          <>
            <TableDash columns={columns} data={data} rowKey="id" />
          </>
        )} */}
      </div>
      {/* <ModalRecipes
        open={openModal}
        loadNewData={()  => {}}
        setIsClose={() => setopenModal(false)}
        dataSelected={null}
      /> */}
    </>
  )
}

export default RecipesPage
