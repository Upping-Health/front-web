import InputStyled from '@/components/inputs/inputStyled'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import { FormikErrors, FormikTouched } from 'formik'

interface Props<T> {
  values: T
  labels: { label: string; key: keyof T }[]
  prefix?: string
  onChange: (e: React.ChangeEvent<any>) => void
  onBlur: (e: React.FocusEvent<any>) => void
  columns?: number
  highlightKeys?: string[]
  errors: FormikErrors<AnthropometryFormValues>
  touched: FormikTouched<AnthropometryFormValues>
}

export function DynamicInputGrid<T>({
  values,
  labels,
  prefix = '',
  onChange,
  onBlur,
  columns = 4,
  highlightKeys = [],
  errors,
  touched,
}: Props<T>) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {labels.map(({ label, key }) => {
        const fullKey = `${prefix}${prefix ? '.' : ''}${String(key)}`
        const shouldHighlight = highlightKeys.includes(String(key))

        const errorsFormik = (errors as Record<string, any>)?.[prefix]?.[key]
        const touchedFormik = (touched as Record<string, any>)?.[prefix]?.[key]
        return (
          <div key={String(key)} className="flex flex-col">
            <InputStyled
              id={fullKey}
              label={label}
              placeholder="0"
              type="number"
              value={values[key] ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              highlight={shouldHighlight}
              error={errorsFormik}
              isTouched={touchedFormik}
            />
          </div>
        )
      })}
    </div>
  )
}
