import { FormikErrors, FormikTouched } from 'formik'
import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import {
  AnthropometryFormValues,
  BodyCircumference,
} from '@/interfaces/anthroprometryFormValues.interface'
import { DynamicInputGrid } from '@/app/(nutri)/patients/_components/DynamicInputGrid'

interface Props {
  values: any
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<AnthropometryFormValues>
  touched: FormikTouched<AnthropometryFormValues>
}

const BODY_CIRCUMFERENCE_SECTIONS = [
  {
    title: 'Tronco',
    columns: 2,
    fields: [
      { label: 'Pescoço (cm)', key: 'neck' },
      { label: 'Ombro (cm)', key: 'shoulder' },
      { label: 'Tórax (cm)', key: 'chest' },
      { label: 'Abdômen (cm)', key: 'abdominal' },
      { label: 'Cintura (cm)', key: 'waist' },
      { label: 'Quadril (cm)', key: 'hip' },
    ],
  },
  {
    title: 'Membros superiores',
    columns: 2,
    fields: [
      { label: 'Braço Relaxado Esquerdo (cm)', key: 'relaxed_left_arm' },
      { label: 'Braço Relaxado Direito (cm)', key: 'relaxed_right_arm' },
      { label: 'Braço Contraído Esquerdo (cm)', key: 'contracted_left_arm' },
      { label: 'Braço Contraído Direito (cm)', key: 'contracted_right_arm' },
      { label: 'Antebraço Esquerdo (cm)', key: 'left_forearm' },
      { label: 'Antebraço Direito (cm)', key: 'right_forearm' },
    ],
  },
  {
    title: 'Membros inferiores',
    columns: 2,
    fields: [
      { label: 'Coxa Proximal Esquerda (cm)', key: 'left_proximal_thigh' },
      { label: 'Coxa Proximal Direita (cm)', key: 'right_proximal_thigh' },
      { label: 'Coxa Média Esquerda (cm)', key: 'left_mid_thigh' },
      { label: 'Coxa Média Direita (cm)', key: 'right_mid_thigh' },
      { label: 'Coxa Distal Esquerda (cm)', key: 'left_distal_thigh' },
      { label: 'Coxa Distal Direita (cm)', key: 'right_distal_thigh' },
      { label: 'Panturrilha Esquerda (cm)', key: 'left_calf' },
      { label: 'Panturrilha Direita (cm)', key: 'right_calf' },
    ],
  },
]

export const BodyCircumferenceSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: Props) => (
  <CollapsibleSection title="Circunferências Corporais">
    {BODY_CIRCUMFERENCE_SECTIONS.map(({ title, columns, fields }) => (
      <div key={title} style={{ marginBottom: '2rem' }}>
        <p className="text-black font-light mb-2">{title}</p>
        <DynamicInputGrid
          values={values}
          labels={fields}
          prefix="body_circumference"
          onChange={handleChange}
          onBlur={handleBlur}
          columns={columns}
          errors={errors}
          touched={touched}
        />
      </div>
    ))}
  </CollapsibleSection>
)
