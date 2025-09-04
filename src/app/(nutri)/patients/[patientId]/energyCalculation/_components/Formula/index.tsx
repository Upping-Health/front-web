import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import SelectStyled from '@/components/inputs/select'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import {
  activityFactorsByFormula,
  energyCalculationFormulas,
  injuryFactors,
} from '@/lib/energyCalculation/formulas-energyCalculation'
import { FormikErrors, FormikTouched } from 'formik'
import React from 'react'

interface Props {
  values: Partial<EnergyCalculation>
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<EnergyCalculation>
  touched: FormikTouched<EnergyCalculation>
}

const Formula = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: Props) => {
  function getActivityOptions(formula: string) {
    return activityFactorsByFormula[formula] ?? []
  }

  return (
    <CollapsibleSection title="Fórmula">
      <div className="flex gap-4 w-full">
        <div className="flex-1 min-w-0">
          <SelectStyled
            id="formula"
            label="Fórmula teórica"
            options={energyCalculationFormulas}
            placeholder="Selecione a fórmula"
            styles="w-full"
            value={values.formula}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 min-w-0">
          <SelectStyled
            id="activity_factor"
            label="Fator de Atividade"
            options={getActivityOptions(
              values.formula ?? 'harris_benedict_1919',
            )}
            placeholder="Selecione o fator"
            styles="w-full"
            value={values.activity_factor}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 min-w-0">
          <SelectStyled
            id="injury_factor"
            label="Fator de Injúria"
            options={injuryFactors}
            placeholder="Selecione o fator"
            styles="w-full"
            value={values.injury_factor}
            onChange={handleChange}
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}

export default Formula
