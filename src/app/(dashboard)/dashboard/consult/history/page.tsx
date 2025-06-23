// app/(dashboard)/patient/[id]/page.tsx
'use client'
import TopDash from '@/components/topDash';
import useLoadPatientById from '@/hooks/nutritionists/useLoadPatientById';
import AddIcon from '@mui/icons-material/Add';
const ConsultHistory = ({ params }: { params: {id: string } }) => {
  const {data} = useLoadPatientById(params.id)

  return (
    <div className="w-full relative">
      <TopDash
          title="Histórico de consultas"
          description="Acompanhe e gerencie seus pacientes com facilidade."
          icon={AddIcon}

        />
    </div>
  );
}

export default ConsultHistory;