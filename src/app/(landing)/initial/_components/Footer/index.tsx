import React from 'react'
import HeartIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MailIcon from '@mui/icons-material/MailOutline'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
import MapPinIcon from '@mui/icons-material/LocationOnOutlined'
import ArrowUpRightIcon from '@mui/icons-material/ArrowUpwardOutlined'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

const FooterLogoDesc = () => (
  <div className="lg:col-span-4">
    <div className="flex items-center gap-3 mb-6">
      <Image
        src={logoImg}
        alt="Logo"
        className="h-16 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </div>
    <p className="text-lg leading-relaxed mb-8 max-w-lg">
      Transforme sua prática médica com nossa plataforma completa de gestão,
      desenvolvida especialmente para profissionais de saúde modernos.
    </p>
    <div className="flex items-center gap-3 text-primary bg-primary/5 rounded-xl p-4 max-w-fit">
      <HeartIcon className="h-5 w-5 fill-current" />
      <span className="text-sm font-medium">
        Feito com dedicação para a saúde
      </span>
    </div>
  </div>
)

const FooterNav = () => {
  const items = ['Início', 'Módulos', 'Preços', 'Benefícios']
  return (
    <div className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-6">Navegação</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
            >
              <span>{item}</span>
              <ArrowOutwardIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterSupport = () => {
  const items = ['Central de Ajuda', 'Documentação', 'Treinamentos', 'Blog']
  return (
    <div className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-6">Suporte</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
            >
              <span>{item}</span>
              <ArrowOutwardIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterContact = () => (
  <div className="lg:col-span-4">
    <h3 className="font-semibold text-lg mb-6">Fale Conosco</h3>
    <div className="space-y-5">
      <a
        href="mailto:contato@uppinghealth.com"
        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors group"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MailIcon fontSize="small" className="text-primary" />
        </div>
        <div>
          <div className="text-sm">Email</div>
          <div className="font-medium">contato@uppinghealth.com</div>
        </div>
      </a>

      <a
        href="tel:+5511999999999"
        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary transition-colors group"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <PhoneIcon fontSize="small" className="text-primary" />
        </div>
        <div>
          <div className="text-sm">Telefone</div>
          <div className="font-medium">(11) 9999-9999</div>
        </div>
      </a>

      <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <MapPinIcon fontSize="small" className="text-primary" />
        </div>
        <div>
          <div className="text-sm">Localização</div>
          <div className="font-medium">Belo Horizonte, MG</div>
        </div>
      </div>
    </div>
  </div>
)

const FooterBottom = () => (
  <div className="border-t border-border mt-12 py-4">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
      <p className="text-sm">
        &copy; 2025 UppingHealth. Todos os direitos reservados.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {['Política de Privacidade', 'Termos de Uso', 'LGPD'].map((item) => (
          <a
            key={item}
            href="#"
            className="hover:text-primary transition-colors text-sm"
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
    <footer className="">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid lg:grid-cols-12 gap-12">
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
