import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import InputStyled from '@/components/inputs/inputStyled'
import { RangeStyled } from '@/components/inputs/rangeStyled'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<EnergyCalculation>
  touched: FormikTouched<EnergyCalculation>
  values: Partial<EnergyCalculation>
}

export const ProgramarVentaSection = ({
  handleChange,
  handleBlur,
  errors,
  touched,
  values,
}: Props) => (
  <CollapsibleSection title="Programar VENTA">
    <div className="flex flex-row gap-4 mt-6">
      <div className="flex flex-col w-full">
        <RangeStyled
          id="target_weight"
          min={-10}
          max={10}
          step={1}
          value={Number(values.target_weight)}
          onChange={handleChange}
          tooltipText={`${values.target_weight} Kg`}
        />
        <InputStyled
          id="weight"
          type="number"
          placeholder=""
          label="Ajuste ganho/perda de peso (KG)"
          value={values.target_weight}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.target_weight}
          isTouched={touched.target_weight}
        />
      </div>

      <div className="flex flex-col w-full">
        <RangeStyled
          id="target_days"
          min={0}
          max={180}
          step={1}
          value={Number(values.target_days)}
          onChange={handleChange}
          tooltipText={`${values.target_days} Dia(s)`}
        />
        <InputStyled
          id="target_days"
          type="number"
          placeholder=""
          label="Em quantos dias"
          value={values.target_days}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.target_days}
          isTouched={touched.target_days}
        />
      </div>
    </div>
  </CollapsibleSection>
)
