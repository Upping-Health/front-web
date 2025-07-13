'use client'
import TableConsult from '@/components/tablesComponents/tableConsult'

const AnthropometryPage = () => {
  const patient = {
    name: 'Guilherme Xavier Martins',
    age: 25,
    gender: 'Masculino',
    cpf: '110.525.576-00',
  }

  return <TableConsult rowKey={'id'} data={[]} columns={[]} />
}

export default AnthropometryPage
