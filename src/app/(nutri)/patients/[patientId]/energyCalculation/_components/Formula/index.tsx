import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import SelectStyled from '@/components/inputs/select'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
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
  const formulas = [
    { text: 'Harris-Benedict 1919', value: 'harris_benedict_1919' },
    { text: 'Harris-Benedict 1984', value: 'harris_benedict_1984' },
    { text: 'FAO/WHO', value: 'fao_who' },
    { text: 'Mifflin', value: 'mifflin' },
    { text: 'Katch-McArdle', value: 'katch_mcardle' },
    { text: 'Cunningham', value: 'cunningham' },
    { text: 'Mifflin Obesidade', value: 'mifflin_obesity' },
    { text: 'Mifflin Sobrepeso', value: 'mifflin_overweight' },
    { text: 'Henry-Rees', value: 'henry_rees' },
    { text: 'Tinsley Peso', value: 'tinsley_weight' },
    { text: 'Tinsley LBM', value: 'tinsley_lbm' },
    { text: 'EER 2005', value: 'eer_2005' },
    { text: 'EER 2023 Adulto', value: 'eer_2023_adult' },
    { text: 'EER 2023 Criança', value: 'eer_2023_child' },
    { text: 'EER 2023 Gestante', value: 'eer_2023_pregnant' },
    { text: 'EER 2023 Lactante', value: 'eer_2023_lactating' },
    { text: 'EER IOM Criança', value: 'eer_iom_child' },
    { text: 'FAO/WHO Criança', value: 'fao_who_child' },
    { text: 'Ministério da Saúde Gestante', value: 'ministry_health_pregnant' },
    { text: 'Manual BMR', value: 'manual_bmr' },
    { text: 'Manual GET', value: 'manual_get' },
  ]

  return (
    <CollapsibleSection title="Fórmula">
      <div className="flex gap-4 w-full">
        <div className="flex-1 min-w-0">
          <SelectStyled
            id="formula"
            label="Fórmula teórica"
            options={formulas}
            placeholder="Selecione a fórmula"
            styles="w-full"
            value={values.formula}
            onChange={handleChange}
          />
        </div>

        <div className="flex-1 min-w-0">
          <SelectStyled
            id="formula2"
            label="Fórmula atividade"
            options={formulas}
            placeholder="Selecione a fórmula"
            styles="w-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <SelectStyled
            id="formula3"
            label="Fator Injúria"
            options={formulas}
            placeholder="Selecione a fórmula"
            styles="w-full"
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}

export default Formula
