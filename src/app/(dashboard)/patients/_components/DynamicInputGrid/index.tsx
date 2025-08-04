import InputStyled from '@/components/inputsComponents/inputStyled'

interface Props<T> {
  values: T
  labels: { label: string; key: keyof T }[]
  prefix?: string
  onChange: (e: React.ChangeEvent<any>) => void
  onBlur: (e: React.FocusEvent<any>) => void
  columns?: number
}

export function DynamicInputGrid<T>({
  values,
  labels,
  prefix = '',
  onChange,
  onBlur,
  columns = 4,
}: Props<T>) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {labels.map(({ label, key }) => (
        <div key={String(key)} className="flex flex-col">
          <InputStyled
            id={`${prefix}${prefix ? '.' : ''}${String(key)}`}
            label={label}
            placeholder="0"
            type="number"
            value={values[key] ?? ''}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      ))}
    </div>
  )
}
