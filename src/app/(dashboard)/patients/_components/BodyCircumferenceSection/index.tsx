import { CollapsibleSection } from '../CollapsibleSection'
import { DynamicInputGrid } from '../DynamicInputGrid'

const BODY_CIRCUMFERENCE_LABELS = [
  { label: 'Cintura', key: 'waist' },
  { label: 'Quadril', key: 'hip' },
  { label: 'Pescoço', key: 'neck' },
  { label: 'Ombro', key: 'shoulder' },
  { label: 'Peito', key: 'chest' },
  { label: 'Abdômen', key: 'abdominal' },
  { label: 'Braço Relaxado Direito', key: 'relaxed_right_arm' },
  { label: 'Braço Contraído Direito', key: 'contracted_right_arm' },
  { label: 'Antebraço Direito', key: 'right_forearm' },
  { label: 'Coxa Proximal Direita', key: 'right_proximal_thigh' },
  { label: 'Coxa Média Direita', key: 'right_mid_thigh' },
  { label: 'Coxa Distal Direita', key: 'right_distal_thigh' },
  { label: 'Panturrilha Direita', key: 'right_calf' },
  { label: 'Braço Relaxado Esquerdo', key: 'relaxed_left_arm' },
  { label: 'Braço Contraído Esquerdo', key: 'contracted_left_arm' },
  { label: 'Antebraço Esquerdo', key: 'left_forearm' },
  { label: 'Coxa Proximal Esquerda', key: 'left_proximal_thigh' },
  { label: 'Coxa Média Esquerda', key: 'left_mid_thigh' },
  { label: 'Coxa Distal Esquerda', key: 'left_distal_thigh' },
  { label: 'Panturrilha Esquerda', key: 'left_calf' },
]

interface Props {
  values: any
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
}

export const BodyCircumferenceSection = ({
  values,
  handleChange,
  handleBlur,
}: Props) => (
  <CollapsibleSection title="Circunferências Corporais">
    <DynamicInputGrid
      values={values}
      labels={BODY_CIRCUMFERENCE_LABELS}
      prefix="body_circumference"
      onChange={handleChange}
      onBlur={handleBlur}
      columns={4}
    />
  </CollapsibleSection>
)
