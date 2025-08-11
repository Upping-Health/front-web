'use client'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Avaliations = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <div className="mb-8">
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="h-6 w-6 text-yellow fill-yellow-400"
              />
            ))}
          </div>
          <p className="text-lg opacity-90">
            "O UppingHealth transformou completamente minha prática. Agora tenho
            mais tempo para meus pacientes!"
          </p>
          <p className="text-sm opacity-75 mt-2">
            - Bruno Pinheiro, Nutricionista
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Pronto para transformar
          <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            sua prática profissional?
          </span>
        </h2>

        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Junte-se a mais de 1000 profissionais que já escolheram o UppingHealth{' '}
          para gerenciar seus consultórios com excelência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type={'button'}
            className={`py-3 mx-auto  bg-white hover:scale-105 shadow-xl rounded-xl px-10 font-semibold flex justify-center items-center gap-2 transition duration-200 ease-in-out`}
            onClick={() => {}}
          >
            <p className="text-primary font-semibold">Começar Teste Gratuito</p>

            <ArrowForwardIcon className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Avaliations
