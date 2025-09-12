'use client'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import StarIcon from '@mui/icons-material/Star'
import FlashOnIcon from '@mui/icons-material/FlashOn'

const Plans = () => {
  const plans = [
    {
      name: 'Starter',
      description: 'Ideal para profissionais iniciantes',
      price: '97',
      period: '/mês',
      badge: null,
      features: [
        'Até 100 pacientes',
        'Agendamento básico',
        'Prontuário eletrônico',
        'Relatórios básicos',
        'Suporte por email',
        '1 usuário',
      ],
      cta: 'Começar Teste Grátis',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Para consultórios estabelecidos',
      price: '197',
      period: '/mês',
      badge: 'Mais Popular',
      features: [
        'Pacientes ilimitados',
        'Agendamento avançado',
        'Prontuário completo',
        'Relatórios avançados',
        'Telemedicina integrada',
        'Até 5 usuários',
        'Integração WhatsApp',
        'Backup automático',
        'Suporte prioritário',
      ],
      cta: 'Escolher Professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Para clínicas e grupos médicos',
      price: '397',
      period: '/mês',
      badge: 'Completo',
      features: [
        'Tudo do Professional',
        'Usuários ilimitados',
        'Multi-localização',
        'API personalizada',
        'Relatórios personalizados',
        'Integração com laboratórios',
        'Gestor financeiro completo',
        'Suporte 24/7',
        'Treinamento dedicado',
      ],
      cta: 'Falar com Especialista',
      popular: false,
    },
  ]

  return (
    <section id="planos" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Planos que crescem com você
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Escolha o plano ideal para o seu momento profissional. Todos os
            planos incluem 14 dias grátis sem compromisso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <section
              key={index}
              role="region"
              aria-labelledby={`plan-title-${index}`}
              className={`relative mb-5 rounded-lg border-0 bg-white text-black shadow-md transition-all duration-300 flex flex-col ${
                plan.popular
                  ? 'scale-105 shadow-large ring-2 ring-primary/20'
                  : 'shadow-soft hover:shadow-medium hover:-translate-y-2'
              }`}
              tabIndex={-1}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center bg-gradient-primary text-white px-4 py-1 rounded-2xl text-sm font-semibold shadow-md select-none">
                    {plan.popular ? (
                      <StarIcon
                        className="w-3 h-3 mr-1"
                        fontSize="small"
                        aria-hidden="true"
                      />
                    ) : (
                      <FlashOnIcon
                        className="w-3 h-3 mr-1"
                        fontSize="small"
                        aria-hidden="true"
                      />
                    )}
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-1.5 p-6 text-center pb-8 pt-8">
                <h3
                  id={`plan-title-${index}`}
                  className="text-2xl font-bold text-black mb-2"
                >
                  {plan.name}
                </h3>
                <p className="text-zinc-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-primary">
                    R$ {plan.price}
                  </span>
                  <span className="text-zinc-400">{plan.period}</span>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-6 flex flex-col flex-grow">
                <ul className="space-y-3 flex-grow text-black">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckIcon
                        className="h-5 w-5 text-green flex-shrink-0"
                        fontSize="small"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  aria-label={`${plan.cta} - plano ${plan.name}`}
                  className={`w-full mt-auto px-6 py-3 rounded-lg font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary ${
                    plan.popular
                      ? 'bg-gradient-primary text-white hover:shadow-primary'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </section>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                14 dias
              </div>
              <p className="text-zinc-400">Teste gratuito completo</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                Sem taxas
              </div>
              <p className="text-zinc-400">Setup e migração gratuitos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-zinc-400">Suporte quando precisar</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center px-4 sm:px-0">
          <h3 className="text-2xl font-bold text-black mb-4">
            Ainda tem dúvidas?
          </h3>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto leading-relaxed">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <button
            type="button"
            aria-label="Falar com especialista UppingHealth"
            className="py-3 mx-auto border-primary border-2 hover:scale-105 hover:bg-primary hover:text-white shadow-xl rounded-xl px-10 font-semibold flex justify-center items-center gap-2 transition duration-200 ease-in-out text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => {}}
          >
            Falar com especialista
          </button>
        </div>
      </div>
    </section>
  )
}

export default Plans
