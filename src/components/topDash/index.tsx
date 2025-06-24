'use client'
import { colors } from '@/utils/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import ButtonStyled from '../button'
interface TopDashProps {
  title: string
  description: string
  icon: any
  onClick?: () => void
  textBtn?: string
  btnIcon?: any
}

const TopDash = ({
  title,
  description,
  icon: Icon,
  onClick,
  textBtn,
  btnIcon: BtnIcon = AddIcon
}: TopDashProps) => {
  return (
    <div className="flex mb-4 items-center justify-between flex-wrap gap-4">
      <div className="flex items-center ">
        <div className="flex justify-center items-center bg-primary  p-2 rounded-xl mr-4 shadow-lg">
          <Icon style={{ color: colors.white, fontSize: 48 }} />
        </div>

        <div>
          <p className="text-black dark:text-white text-1xl font-bold uppercase">{title}</p>
          <p className="text-black dark:text-white text-sm font-light max-w-[400px]">
            {description}
          </p>
        </div>
      </div>

      {onClick && (
        <ButtonStyled
          title={textBtn}
          icon={<BtnIcon style={{ color: colors.white, fontSize: 24 }} />}
          onClick={onClick}
          type="button"
          styles="px-4 text-sm h-12 shadow-lg bg-primary"
        />
      )}
    </div>
  )
}

export default TopDash
