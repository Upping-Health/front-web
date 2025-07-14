'use client'
import MenuConsult from '@/components/consult-components/menu'
import TopDash from '@/components/layoutComponents/topDash'
import TableConsult from '@/components/tablesComponents/tableConsult'
import { Person } from '@mui/icons-material'
import { notFound } from 'next/navigation'

const AnthropometryPage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title={'Guilherme Xavier Martins'}
        description={'160 an0s'}
        icon={Person}
        href={'/'}
        textBtn="Nova antropometria"
      />
      <div className="h-full w-full flex gap-4">
        <TableConsult rowKey={'id'} data={[]} columns={[]} />

        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>
    </div>
  )
}

export default AnthropometryPage
