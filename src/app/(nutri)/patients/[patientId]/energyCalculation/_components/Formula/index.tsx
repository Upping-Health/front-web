import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import SelectStyled from '@/components/inputs/select'
import React from 'react'

const Formula = () => {
  const formulas = [
    { text: 'Harris-Benedict (Homem)', value: 'harris-male' },
    { text: 'Harris-Benedict (Mulher)', value: 'harris-female' },
    { text: 'Mifflin-St Jeor', value: 'mifflin' },
    { text: 'Owen', value: 'owen' },
    { text: 'Cunningham', value: 'cunningham' },
    { text: 'FAO/OMS/ONU', value: 'fao-oms-onu' },
    { text: 'Katch-McArdle', value: 'katch' },
    { text: 'Schofield', value: 'schofield' },
  ]

  return (
    <CollapsibleSection title="Fórmula">
      <div className="flex gap-4 w-full">
        <div className="flex-1 min-w-0">
          <SelectStyled
            id="formula1"
            label="Fórmula teórica"
            options={formulas}
            placeholder="Selecione a fórmula"
            styles="w-full"
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
