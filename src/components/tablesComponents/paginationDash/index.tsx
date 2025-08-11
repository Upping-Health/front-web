import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import { colors } from '@/lib/colors/colors'

interface PaginationDashProps {
  count: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const PaginationDash: React.FC<PaginationDashProps> = ({
  count,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    console.log(event)
    setCurrentPage(page)
  }

  return (
    <div>
      <Pagination
        count={count}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& .MuiPaginationItem-root': {
            backgroundColor: colors.black,
            color: colors.white,
            borderColor: colors.black,
            borderWidth: 0,
            opacity: 0.3,

            '&.Mui-selected': {
              backgroundColor: colors.black,
              opacity: 100,
              color: colors.white,
              fontWeight: 'bold',
              borderColor: colors.white,
              borderWidth: 0,
            },
            '&:hover': {
              backgroundColor: 'lightgray',
            },
          },

          '.dark & .MuiPaginationItem-root': {
            backgroundColor: 'oklch(27.8% 0.033 256.848)',
          },
        }}
      />
    </div>
  )
}

export default PaginationDash
