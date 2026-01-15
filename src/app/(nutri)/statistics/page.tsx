'use client'
import CardDash from '@/components/tables/cardDash'
import TopDash from '@/components/layout/topDash'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupOffIcon from '@mui/icons-material/GroupRemove'
import Groups from '@mui/icons-material/Groups'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import { Skeleton } from '@mui/material'

const DashboardContent = () => {
  function onPressButon() {}

  return (
    <div className="w-full">
      <TopDash
        title="Estatísticas"
        description="Veja as principais métricas e informações."
        icon={InsertChartOutlinedIcon}
      />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {loading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={100}
              className="rounded-xl bg-light"
            />
            <Skeleton
              variant="rectangular"
              height={100}
              className="rounded-xl bg-light"
            />

            <Skeleton
              variant="rectangular"
              height={100}
              className="rounded-xl bg-light"
            />
          </>
        ) : (
          <div className="flex flex-wrap gap-4 w-full">
            <div className="flex-1 min-w-[250px]">
              <CardDash
                className="bg-terciary"
                icon={<Groups />}
                title="Pacientes"
                value={data.totalPatients}
              />
            </div>
            <div className="flex-1 min-w-[250px]">
              <CardDash
                className="bg-green"
                icon={<GroupAddIcon />}
                title="Pacientes Ativos"
                value={data.totalPatientsActive}
              />
            </div>
            <div className="flex-1 min-w-[250px]">
              <CardDash
                className="bg-red"
                icon={<GroupOffIcon />}
                title="Pacientes Inativos"
                value={data.totalPatientsInactive}
              />
            </div>
          
          </div>
        )}
      </div> */}

      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded-xl shadow-md">
          {loadingStats ? (
            <Skeleton
              variant="rectangular"
              height={300}
              className="rounded-xl bg-light"
            />
          ) : (
            <GraphicApiaristStats data={apiaristStats} />
          )}
        </div>
      </div>

      <div className="mt-10">
        {loadingLatest ? (
          <Skeleton
            variant="rectangular"
            height={400}
            className="rounded-xl bg-light"
          />
        ) : (
          <ApiaristAssociatesTable data={apiaristLatest} />
        )}
      </div> */}
    </div>
  )
}

export default DashboardContent
