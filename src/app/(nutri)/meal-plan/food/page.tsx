'use client'
import Loading from '@/components/layout/loading'
import TopDash from '@/components/layout/topDash'
import TableDash from '@/components/tables/tableDash'
import useLoadFoods from '@/hooks/foods/useLoadFoods'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import { useCallback, useMemo, useState } from 'react'
import ModalFood from './_components/ModalFood'

const filterOptions = [
  {
    label: 'Meus Alimentos',
    value: 'tbca',
  },
  {
    label: 'IBGE',
    value: 'ibge',
  },
  {
    label: 'USDA',
    value: 'usda',
  },
  {
    label: 'TBCA',
    value: 'tbca',
  },
  {
    label: 'Tucunduva',
    value: 'tucunduva',
  },
]

const FoodPlanMenu = ({ params }: { params: { id: string } }) => {
  const { data, loadData, loading, currentPage, setCurrentPage, total } =
    useLoadFoods(false)
  const [openModal, setopenModal] = useState<boolean>(false)

  console.log(data)
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
        header: 'Categoria',
        field: '',
        render(_: any, row: any) {
          return row?.category?.title
        },
      },
      {
        header: 'Referência',
        field: '',
        render(_: any, row: any) {
          return row?.source?.name
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
            <TableDash
              columns={columns}
              data={data}
              rowKey="id"
              filters={{
                label: 'Filtros',
                options: filterOptions,
                onSelect: (value: string) => console.log('teste'),
              }}
              externalPagination
              itemsPerPage={total}
              setCurrentPageExternal={setCurrentPage}
              currentPageExternal={currentPage}
            />
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
