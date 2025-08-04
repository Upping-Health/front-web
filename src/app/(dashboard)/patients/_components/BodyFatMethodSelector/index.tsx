import ButtonStyled from '@/components/buttonsComponents/button'

interface Props {
  selected: string
  onSelect: (value: string) => void
}

const METHODS = [
  { label: 'Nenhuma', value: 'nenhuma', reference: 'Nenhuma' },
  { label: 'Pollock 3', value: 'pollock_3', reference: 'Pollock 3, 1978' },
  { label: 'Pollock 7', value: 'pollock_7', reference: 'Pollock 7, 1978' },
  { label: 'Faulkner', value: 'faulkner', reference: 'Faulkner, 1968' },
  { label: 'Guedes', value: 'guedes', reference: 'Guedes, 1994' },
  { label: 'Petroski', value: 'petroski', reference: 'Petroski, 1995' },
  { label: 'Durnin', value: 'durnin', reference: 'Durnin & Womersley, 1974' },
]

export const BodyFatMethodSelector = ({ selected, onSelect }: Props) => (
  <div className="grid grid-cols-4 gap-2 mb-4">
    {METHODS.map(({ label, value }) => (
      <ButtonStyled
        key={value}
        type="button"
        onClick={() => onSelect(value)}
        styles={`!py-2 border border-primary text-sm ${
          selected === value ? 'bg-transparent text-primary' : 'bg-primary'
        }`}
        textColor={selected === value ? 'text-primary' : 'text-white'}
        title={label}
      />
    ))}
  </div>
)
