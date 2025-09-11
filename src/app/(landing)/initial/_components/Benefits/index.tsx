import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SecurityIcon from '@mui/icons-material/Security'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const benefits = [
  {
    icon: IntegrationInstructionsIcon,
    title: 'Integração Completa',
    description:
      'Conecte agendamentos, prontuários, relatórios e financeiro em um só lugar, eliminando retrabalho.',
  },
  {
    icon: AccessTimeIcon,
    title: 'Atendimento Sem Faltas',
    description:
      'Envio automático de lembretes por WhatsApp, SMS ou e-mail para reduzir ausências de pacientes.',
  },
  {
    icon: AssessmentIcon,
    title: 'Prontuário Inteligente',
    description:
      'Histórico clínico centralizado com prescrições digitais, anexos e evolução do paciente.',
  },
  {
    icon: CheckCircleIcon,
    title: 'Fácil de Usar',
    description:
      'Interface intuitiva que você aprende em minutos, sem complicações.',
  },
]

const Benefits = () => {
  return (
    <section id="beneficios" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Por que escolher o UppingHealth?
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Mais do que um software, é uma solução completa que transforma a
            gestão da sua prática profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <article
                key={index}
                tabIndex={0}
                role="group"
                aria-label={`${benefit.title}: ${benefit.description}`}
                className="text-center group hover:scale-105 focus:scale-105 transition-transform duration-300 ease-in-out py-6 rounded-lg cursor-pointer outline-none focus:ring-4 focus:ring-primary"
              >
                <div className="mx-auto mb-6 p-6 bg-gradient-primary rounded-3xl w-fit shadow-primary group-hover:shadow-large transition-shadow duration-300">
                  <IconComponent
                    className="h-10 w-10 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits
