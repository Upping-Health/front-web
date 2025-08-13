import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import InputStyled from '@/components/inputs/inputStyled'
import { RangeStyled } from '@/components/inputs/rangeStyled'

interface Props {
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: any
  touched: any
  values: any
}

export const ProgramarVentaSection = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}: Props) => (
  <CollapsibleSection title="Programar VENTA">
    <div className="flex flex-row gap-4 mt-4">
      <div className="flex flex-col w-full">
        <RangeStyled
          id="weight"
          min={0}
          max={200}
          step={1}
          value={values.weight || 0}
          onChange={handleChange}
          tooltipText="Teste"
        />
        <InputStyled
          id="title"
          label="Ajuste ganho/perda de peso"
          type="text"
          placeholder="Título"
          value={values.title || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          isTouched={touched.title}
        />
      </div>

      <div className="flex flex-col w-full">
        <RangeStyled
          id="weight"
          min={0}
          max={200}
          step={1}
          value={values.weight || 0}
          onChange={handleChange}
          tooltipText="Teste"
        />
        <InputStyled
          id="weight"
          label="Em quantos dias"
          type="number"
          placeholder="Peso em kg"
          value={values.weight || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.weight}
          isTouched={touched.weight}
        />
      </div>
    </div>
  </CollapsibleSection>
)
