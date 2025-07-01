import { CircularProgress } from '@mui/material'
import { colors } from '@/utils/colors/colors'

const LoadingFullScreen = ({
  labelLoading,
}: {
  labelLoading: string | null
}) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center z-[9999]">
    <CircularProgress size={100} style={{ color: colors.white }} />

    <p className="text-white mt-4">
      {labelLoading ? labelLoading : 'Carregando...'}
    </p>
  </div>
)

export default LoadingFullScreen
