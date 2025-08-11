'use client'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Avaliations = () => {
  return (
    <section
      id="contact"
      aria-labelledby="avaliations-title"
      className="py-20 bg-gradient-hero"
    >
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <div className="mb-8">
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

          <blockquote className="text-lg sm:text-xl opacity-90 leading-relaxed">
            "O UppingHealth transformou completamente minha prática. Agora tenho
            mais tempo para meus pacientes!"
          </blockquote>

          <cite className="text-sm sm:text-base opacity-70 mt-2 block">
            - Bruno Pinheiro, Nutricionista
          </cite>
        </div>

        <h2
          id="avaliations-title"
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
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
              hover:scale-105 hover:shadow-primary transition-transform duration-200 eaase-in-out
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
