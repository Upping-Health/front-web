'use client'
import TopDash from '@/components/layoutComponents/topDash'
import MenuConsult from '@/components/consult-components/menu'
import TableConsult from '@/components/tablesComponents/tableConsult'
import Person from '@mui/icons-material/Person'

export default function ConsultLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        {children}
        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>
    </div>
  )
}
