import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

interface Props {
  required: boolean
  toggleRequired: () => void
}

const RequiredToggle = ({ required, toggleRequired }: Props) => (
  <button
    type="button"
    onClick={toggleRequired}
    className="flex items-center gap-2 mt-2"
  >
    {required ? (
      <CheckBoxIcon className="text-terciary dark:text-white" />
    ) : (
      <CheckBoxOutlineBlankIcon className="text-gray-400 dark:text-white" />
    )}
    <span className="text-sm text-gray-700 dark:text-white">
      Campo obrigatório
    </span>
  </button>
)

export default RequiredToggle
