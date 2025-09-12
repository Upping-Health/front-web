import SingleCheckbox from '@/components/inputs/checkboxStyled'
import InputStyled from '@/components/inputs/inputStyled'
import RadioStyled from '@/components/inputs/radioStyled'
import { RangeStyled } from '@/components/inputs/rangeStyled'
import SelectStyled from '@/components/inputs/select'
import TextAreaStyled from '@/components/inputs/textAreaStyled'
import { Answer, Field } from '@/interfaces/form-response.interface'

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
  const error = formik.errors[field.uuid]
  const touched = formik.touched[field.uuid]

  const value =
    formik.values[field.uuid] ??
    getResponseAnswerByType(field.type as any, answer)

  const handleChange = (val: any) => {
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
        min={
          field.options && 'min' in field.options
            ? field.options.min
            : undefined
        }
        max={
          field.options && 'max' in field.options
            ? field.options.max
            : undefined
        }
        required={field.required === 1}
        error={error}
        isTouched={touched}
        onBlur={() => formik.setFieldTouched(field.uuid, true)}
      />
    )
  }

  if (field.type === 'textarea') {
    return (
      <TextAreaStyled
        id={field.uuid}
        label={field.label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        required={field.required === 1}
        error={error}
        isTouched={touched}
        onBlur={() => formik.setFieldTouched(field.uuid, true)}
      />
    )
  }

  if (field.type === 'select') {
    const options =
      Array.isArray(field.options) && typeof field.options[0] === 'string'
        ? (field.options as string[]).map((e) => ({ text: e, value: e }))
        : (field.options as { text: string; value: string }[]) ?? []

    return (
      <>
        <SelectStyled
          id={field.uuid}
          label={field.label}
          value={value}
          options={options}
          onChange={(e) => handleChange(e?.target?.value)}
          required={field.required === 1}
          onBlur={() => formik.setFieldTouched(field.uuid, true)}
        />

        {error && touched && (
          <p className="font-light text-red text-sm pt-1 text-center">
            {error}
          </p>
        )}
      </>
    )
  }

  if (field.type === 'checkbox') {
    const options =
      Array.isArray(field.options) && typeof field.options[0] === 'string'
        ? (field.options as string[]).map((e) => ({ text: e, value: e }))
        : (field.options as { text: string; value: string }[]) ?? []

    return (
      <div className="flex flex-col gap-2">
        <label
          className={`mb-1 text-gray-400  text-sm flex items-center gap-1`}
        >
          {field.label}
          {field.required && <span className="text-red">*</span>}
        </label>

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
              formik.setFieldTouched(field.uuid, true)
            }}
          />
        ))}
        {error && touched && (
          <p className="font-light text-red text-sm pt-1 text-center">
            {error}
          </p>
        )}
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
        <label className={`text-gray-400  text-sm flex items-center gap-1`}>
          {field.label}
          {field.required && <span className="text-red">*</span>}
        </label>
        {options.map((opt, idx) => (
          <RadioStyled
            key={idx}
            id={`${field.uuid}-${idx}`}
            label={opt.text}
            checked={value === opt.value}
            onChange={() => {
              handleChange(opt.value)
              formik.setFieldTouched(field.uuid, true)
            }}
          />
        ))}
        {error && touched && (
          <p className="font-light text-red text-sm pt-1 text-center">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (field.type === 'range') {
    return (
      <>
        <label
          className={`mb-3 text-gray-400  text-sm flex items-center gap-1`}
        >
          {field.label}
          {field.required && <span className="text-red">*</span>}
        </label>

        <RangeStyled
          id={field.uuid}
          value={value}
          onChange={(e) => handleChange(e?.target?.value)}
          min={
            field.options && 'min' in field.options
              ? field.options.min
              : undefined
          }
          max={
            field.options && 'max' in field.options
              ? field.options.max
              : undefined
          }
          step={
            field.options && 'step' in field.options
              ? field.options.step
              : undefined
          }
          tooltipText={`${value}`}
        />

        {error && touched && (
          <p className="font-light text-red text-sm pt-1 text-center">
            {error}
          </p>
        )}
      </>
    )
  }

  return null
}
