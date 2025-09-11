'use client'
import React from 'react'
import {
  Apple as AppleIcon,
  FitnessCenter as FitnessCenterIcon,
  CalendarToday as CalendarTodayIcon,
  BarChart as BarChartIcon,
  Group as GroupIcon,
} from '@mui/icons-material'

const modules = [
  {
    icon: AppleIcon,
    title: 'Nutricionista',
    description:
      'Gerencie consultas, planos alimentares, acompanhamento de pacientes e relatórios nutricionais completos.',
    features: [
      'Planos personalizados',
      'Cálculo nutricional',
      'Evolução do paciente',
      'Receitas integradas',
    ],
  },
  {
    icon: FitnessCenterIcon,
    title: 'Personal Trainer',
    description:
      'Crie treinos personalizados, acompanhe progressos e gerencie seus alunos de forma eficiente.',
    features: [
      'Fichas de treino',
      'Acompanhamento físico',
      'Metas e objetivos',
      'Histórico completo',
    ],
  },
]

export default function Modules() {
  return (
    <section id="modulos" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Módulos Especializados
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Cada módulo foi desenvolvido especificamente para atender as
            necessidades únicas dos profissionais de saúde e bem-estar.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 w-full max-w-sm"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-2xl inline-flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                      <Icon sx={{ fontSize: 28, color: 'white' }} />
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <ul className="space-y-2 mt-6">
                    {module.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center font-extralight text-black"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
