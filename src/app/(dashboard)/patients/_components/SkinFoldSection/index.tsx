import { FormikErrors, FormikTouched } from 'formik'
import { BodyFatMethodSelector } from '../BodyFatMethodSelector'
import { CollapsibleSection } from '../CollapsibleSection'
import { DynamicInputGrid } from '../DynamicInputGrid'
import {
  AnthropometryFormValues,
  SkinFold,
} from '@/interfaces/anthroprometryFormValues.interface'

const SKINFOLD_LABELS = [
  { label: 'Tricipital (mm)', key: 'triceps' },
  { label: 'Bicipital (mm)', key: 'biceps' },
  { label: 'Subescapular (mm)', key: 'subscapular' },
  { label: 'Axilar Média (mm)', key: 'midaxillary' },
  { label: 'Supraespinhal (mm)', key: 'supraspinatus' },
  { label: 'Toráxica (mm)', key: 'chest' },
  { label: 'Suprailíaca (mm)', key: 'suprailiac' },
  { label: 'Abdominal (mm)', key: 'abdominal' },
  { label: 'Coxa (mm)', key: 'thigh' },
  { label: 'Panturilha (mm)', key: 'calf' },
]

const METHOD_SKINFOLD_MAP: Record<string, string[]> = {
  pollock_3: ['chest', 'abdominal', 'thigh'],
  pollock_7: [
    'triceps',
    'subscapular',
    'midaxillary',
    'chest',
    'suprailiac',
    'abdominal',
    'thigh',
  ],
  faulkner: ['triceps', 'subscapular', 'suprailiac', 'abdominal'],
  guedes: ['triceps', 'suprailiac', 'abdominal'],
  petroski: ['triceps', 'subscapular', 'suprailiac', 'calf'],
  durnin: ['triceps', 'biceps', 'subscapular', 'suprailiac'],
  nenhuma: [],
}

interface Props {
  values: any
  setMethod: (value: string) => void
  selectedMethod: string
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<AnthropometryFormValues>
  touched: FormikTouched<AnthropometryFormValues>
}

export const SkinFoldSection = ({
  values,
  setMethod,
  selectedMethod,
  handleChange,
  handleBlur,
  errors,
  touched,
}: Props) => {
  const activeKeys = METHOD_SKINFOLD_MAP[selectedMethod] || []

  return (
    <CollapsibleSection title="Dobras cutâneas">
      <BodyFatMethodSelector selected={selectedMethod} onSelect={setMethod} />
      <DynamicInputGrid
        values={values}
        labels={SKINFOLD_LABELS}
        prefix="skin_fold"
        onChange={handleChange}
        onBlur={handleBlur}
        highlightKeys={activeKeys}
        errors={errors}
        touched={touched}
      />
    </CollapsibleSection>
  )
}
