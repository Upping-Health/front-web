import { BodyFatMethodSelector } from '../BodyFatMethodSelector'
import { CollapsibleSection } from '../CollapsibleSection'
import { DynamicInputGrid } from '../DynamicInputGrid'
const SKINFOLD_LABELS = [
  { label: 'Tricipital', key: 'triceps' },
  { label: 'Bicipital', key: 'biceps' },
  { label: 'Subescapular', key: 'subscapular' },
  { label: 'Axilar Média', key: 'midaxillary' },
  { label: 'Supraespinhal', key: 'suprailiac' },
  { label: 'Abdominal', key: 'abdominal' },
  { label: 'Coxa', key: 'thigh' },
  { label: 'Toráxica', key: 'chest' },
]

interface Props {
  values: any
  setMethod: (value: string) => void
  selectedMethod: string
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
}

export const SkinFoldSection = ({
  values,
  setMethod,
  selectedMethod,
  handleChange,
  handleBlur,
}: Props) => (
  <CollapsibleSection title="Dobras cutâneas">
    <BodyFatMethodSelector selected={selectedMethod} onSelect={setMethod} />
    <DynamicInputGrid
      values={values}
      labels={SKINFOLD_LABELS}
      prefix="skin_fold"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </CollapsibleSection>
)
