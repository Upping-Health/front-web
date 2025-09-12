import SingleCheckbox from '@/components/inputs/checkboxStyled'
import InputStyled from '@/components/inputs/inputStyled'
import RadioStyled from '@/components/inputs/radioStyled'
import SelectStyled from '@/components/inputs/select'
import { Answer, Field } from '@/interfaces/form-response.interface'

interface FieldRendererProps {
  field: Field
  answer: Answer
}

const getResponseAnswerByType = (
  type:
    | 'number'
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'range'
    | 'file'
    | 'date',
  answer: Answer,
) => {
  if (type === 'text' || type === 'textarea') return answer?.text_answer || ''
  if (type === 'number' || type === 'range') return answer?.number_answer || 0
  if (type === 'date') return answer?.date_answer || ''
  if (type === 'select' || type === 'radio') return answer?.option_answer || ''
  if (type === 'file') return answer?.file_answer || null

  return ''
}

interface FieldRenderProps {
  field: Field
  answer: Answer
  formik: any
}

export const FieldRender = ({ field, answer, formik }: FieldRenderProps) => {
  const value =
    formik.values[field.uuid] ??
    getResponseAnswerByType(field.type as any, answer)

  const handleChange = (val: any) => {
    console.log(val)
    formik.setFieldValue(field.uuid, val)
  }

  if (field.type === 'text' || field.type === 'number') {
    return (
      <InputStyled
        id={field.uuid}
        label={field.label}
        value={value}
        type={field.type}
        onChange={(e) => handleChange(e.target.value)}
      />
    )
  }

  if (field.type === 'select') {
    const options =
      Array.isArray(field.options) && typeof field.options[0] === 'string'
        ? (field.options as string[]).map((e) => ({ text: e, value: e }))
        : (field.options as { text: string; value: string }[]) ?? []

    return (
      <SelectStyled
        id={field.uuid}
        label={field.label}
        value={value}
        options={options}
        onChange={(e) => handleChange(e?.target?.value)}
      />
    )
  }

  if (field.type === 'checkbox') {
    const options =
      Array.isArray(field.options) && typeof field.options[0] === 'string'
        ? (field.options as string[]).map((e) => ({ text: e, value: e }))
        : (field.options as { text: string; value: string }[]) ?? []

    return (
      <div className="flex flex-col gap-2">
        <label className="mb-1 text-darkGray text-sm">{field.label}</label>
        {options.map((opt, idx) => (
          <SingleCheckbox
            key={idx}
            id={`${field.uuid}-${idx}`}
            label={opt.text}
            checked={value?.includes(opt.value)}
            onChange={() => {
              const newVal = value?.includes(opt.value)
                ? value.filter((v: string) => v !== opt.value)
                : [...(value || []), opt.value]
              handleChange(newVal)
            }}
          />
        ))}
      </div>
    )
  }

  if (field.type === 'radio') {
    const options =
      Array.isArray(field.options) && typeof field.options[0] === 'string'
        ? (field.options as string[]).map((e) => ({ text: e, value: e }))
        : (field.options as { text: string; value: string }[]) ?? []

    return (
      <div className="flex flex-col gap-2">
        <label className="mb-1 text-darkGray text-sm">{field.label}</label>
        {options.map((opt, idx) => (
          <RadioStyled
            key={idx}
            id={`${field.uuid}-${idx}`}
            label={opt.text}
            checked={value === opt.value}
            onChange={() => handleChange(opt.value)}
          />
        ))}
      </div>
    )
  }

  return null
}
