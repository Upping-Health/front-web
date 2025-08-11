'use client'
import React from 'react'
import HeartIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MailIcon from '@mui/icons-material/MailOutline'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
import MapPinIcon from '@mui/icons-material/LocationOnOutlined'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'

const FooterLogoDesc = () => (
  <div className="lg:col-span-4">
    <div className="flex items-center gap-3 mb-6">
      <Image
        src={logoImg}
        alt="Logotipo UppingHealth"
        className="h-16 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
    <p className="text-lg leading-relaxed mb-8 max-w-lg text-gray-700 dark:text-gray-300">
      Transforme sua prática médica com nossa plataforma completa de gestão,
      desenvolvida especialmente para profissionais de saúde modernos.
    </p>
    <div
      className="flex items-center gap-3 text-primary bg-primary/10 rounded-xl p-4 max-w-fit"
      aria-label="Mensagem de dedicação"
    >
      <HeartIcon className="h-5 w-5 fill-current" aria-hidden="true" />
      <span className="text-sm font-medium select-none">
        Feito com dedicação para a saúde
      </span>
    </div>
  </div>
)

const FooterNav = () => {
  const items = ['Início', 'Módulos', 'Preços', 'Benefícios']
  return (
    <nav aria-label="Navegação principal" className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white">
        Navegação
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-current={item === 'Início' ? 'page' : undefined}
            >
              <span>{item}</span>
              <ArrowOutwardIcon
                className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const FooterSupport = () => {
  const items = ['Central de Ajuda', 'Documentação', 'Treinamentos', 'Blog']
  return (
    <nav aria-label="Suporte e ajuda" className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white">
        Suporte
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <span>{item}</span>
              <ArrowOutwardIcon
                className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const FooterContact = () => (
  <section aria-labelledby="contato-title" className="lg:col-span-4">
    <h3
      id="contato-title"
      className="font-semibold text-lg mb-6 text-gray-900 dark:text-white"
    >
      Fale Conosco
    </h3>
    <div className="space-y-5">
      <a
        href="mailto:contato@uppinghealth.com"
        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MailIcon
            fontSize="small"
            className="text-primary"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="text-sm text-gray-700 dark:text-gray-300">Email</div>
          <div className="font-medium text-gray-900 dark:text-white">
            contato@uppinghealth.com
          </div>
        </div>
      </a>

      <a
        href="tel:+5511999999999"
        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors group focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <PhoneIcon
            fontSize="small"
            className="text-primary"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Telefone
          </div>
          <div className="font-medium text-gray-900 dark:text-white">
            (11) 9999-9999
          </div>
        </div>
      </a>

      <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border dark:bg-gray-800 dark:border-gray-700">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center dark:bg-primary/20">
          <MapPinIcon
            fontSize="small"
            className="text-primary"
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Localização
          </div>
          <div className="font-medium text-gray-900 dark:text-white">
            Belo Horizonte, MG
          </div>
        </div>
      </div>
    </div>
  </section>
)

const FooterBottom = () => (
  <div className="border-t border-border mt-12 py-4">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
      <p className="text-sm text-gray-600 dark:text-gray-400 select-none">
        &copy; 2025 UppingHealth. Todos os direitos reservados.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {['Política de Privacidade', 'Termos de Uso', 'LGPD'].map((item) => (
          <a
            key={item}
            href="#"
            className="hover:text-primary transition-colors text-sm text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </div>
)

const Footer = () => {
  return (
    <footer className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <FooterLogoDesc />
          <FooterNav />
          <FooterSupport />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
