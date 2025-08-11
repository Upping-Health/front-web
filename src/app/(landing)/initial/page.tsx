export const metadata = {
  metadataBase: new URL('https://uppinghealth.com'),
  title: 'UppingHealth - Gestão em Saúde',
  description:
    'UppingHealth é o sistema completo de gestão em saúde que otimiza agendamentos, prontuários eletrônicos e processos administrativos com segurança e eficiência.',
  openGraph: {
    title: 'UppingHealth - Sistema de Gestão em Saúde para Clínicas',
    description:
      'Otimize sua clínica ou hospital com UppingHealth. Gestão completa com agendamentos, prontuários eletrônicos, faturamento e mais.',
    url: 'https://uppinghealth.com',
    siteName: 'UppingHealth',
    images: [
      {
        url: 'https://uppinghealth.com/imagem-preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'UppingHealth - Sistema de Gestão em Saúde para Clínicas e Hospitais',
    description:
      'Otimize sua clínica ou hospital com UppingHealth. Gestão completa com agendamentos, prontuários eletrônicos, faturamento e mais.',
    images: ['https://uppinghealth.com/imagem-preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

import HeaderLanding from './_components/Header'
import HeroLanding from './_components/Hero'
import Benefits from './_components/Benefits'
import Plans from './_components/Plans'
import Avaliations from './_components/Avaliations'
import Footer from './_components/Footer'

export default function Initial() {
  return (
    <main className="font-sans">
      <HeaderLanding />
      <HeroLanding />
      <Benefits />
      <Plans />
      <Avaliations />
      <Footer />
    </main>
  )
}
