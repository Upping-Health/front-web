'use client'
import { colors } from '@/lib/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import ButtonStyled from '@/components/buttons/button'

interface TopDashProps {
  title: string
  description: string
  icon: any
  onClick?: () => void
  textBtn?: string
  btnIcon?: any
  href?: string
  disabled?: boolean
}

const TopDash = ({
  title,
  description,
  icon: Icon,
  onClick,
  textBtn,
  btnIcon: BtnIcon = AddIcon,
  href,
  disabled = false,
}: TopDashProps) => {
  const baseButtonClasses = `py-3 rounded-xl font-semibold flex justify-center items-center gap-2 ${disabled ? 'bg-darkGray' : ''} bg-black text-white px-4 text-sm h-12 shadow-lg bg-primary`

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
      <div className="flex items-center ">
        <div className="flex justify-center items-center bg-primary p-2 rounded-xl mr-4 shadow-lg">
          <Icon style={{ color: colors.white, fontSize: 36 }} />
        </div>

        <div>
          <p className="text-black dark:text-white font-bold uppercase">
            {title}
          </p>
          <p className="text-black dark:text-white text-sm font-light max-w-[400px]">
            {description}
          </p>
        </div>
      </div>

      {onClick ? (
        <ButtonStyled
          title={textBtn}
          icon={<BtnIcon style={{ color: colors.white, fontSize: 24 }} />}
          onClick={onClick}
          type="button"
          styles="px-4 text-sm h-12 shadow-lg bg-primary"
        />
      ) : href ? (
        <Link
          href={href}
          className={baseButtonClasses}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={(e) => disabled && e.preventDefault()}
        >
          {BtnIcon && <BtnIcon style={{ color: colors.white, fontSize: 24 }} />}
          {textBtn}
        </Link>
      ) : null}
    </div>
  )
}

export default TopDash
