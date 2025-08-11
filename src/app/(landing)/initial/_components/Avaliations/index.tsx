'use client'
import React, { useState, useEffect } from 'react'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Image from 'next/image'
import medico from '@/assets/medico.png'

const testimonials = [
  {
    id: 1,
    text: 'O UppingHealth transformou completamente minha prática. Agora tenho mais tempo para meus pacientes!',
    author: 'Bruno Pinheiro',
    role: 'Nutricionista',
    image: medico,
  },
  {
    id: 2,
    text: 'Sistema intuitivo e completo. Minha agenda nunca esteve tão organizada e meus pacientes adoram o atendimento!',
    author: 'Ana Souza',
    role: 'Fisioterapeuta',
    image: medico,
  },
  {
    id: 3,
    text: 'A eficiência no consultório aumentou drasticamente. Recomendo para todos os colegas da área!',
    author: 'Carlos Mendes',
    role: 'Personal Trainer',
    image: medico,
  },
]

const Avaliations = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000) // troca a cada 7 segundos para dar mais tempo

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="contact"
      aria-labelledby="avaliations-title"
      className="py-10 bg-gradient-hero relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center text-white relative min-h-[220px]">
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === currentIndex
                ? 'opacity-100 relative z-10'
                : 'opacity-0 pointer-events-none z-0'
            }`}
            aria-hidden={i !== currentIndex}
          >
            <div
              className="flex justify-center items-center gap-1 mb-4"
              aria-label="Avaliação com 5 estrelas"
            >
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="h-6 w-6 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="relative w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-white/30 shadow-md mx-auto">
              <Image
                src={testimonial.image}
                alt={`Foto de ${testimonial.author}`}
                objectFit="cover"
                loading="lazy"
                priority={false}
              />
            </div>

            <blockquote className="text-lg sm:text-xl opacity-90 leading-relaxed">
              "{testimonial.text}"
            </blockquote>

            <cite className="text-sm sm:text-base opacity-70 mt-2 block">
              - {testimonial.author}, {testimonial.role}
            </cite>
          </div>
        ))}

        <h2
          id="avaliations-title"
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight mt-12"
        >
          Pronto para transformar
          <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            sua prática profissional?
          </span>
        </h2>

        <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Junte-se a mais de 1000 profissionais que já escolheram o UppingHealth{' '}
          para gerenciar seus consultórios com excelência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            aria-label="Começar teste gratuito UppingHealth"
            className="w-full sm:w-auto py-3 bg-white rounded-xl shadow-xl px-10 font-semibold flex justify-center items-center gap-2 text-primary
              hover:scale-105 hover:shadow-primary transition-transform duration-200 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60"
            onClick={() => {}}
          >
            <span>Começar Teste Gratuito</span>
            <ArrowForwardIcon className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Avaliations
