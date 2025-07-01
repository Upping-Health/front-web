import { CircularProgress } from '@mui/material'
import { colors } from '@/utils/colors/colors'

const LoadingFullScreen = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
    <CircularProgress size={100} style={{ color: colors.black }} />
  </div>
)

export default LoadingFullScreen
