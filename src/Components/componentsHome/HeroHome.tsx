import Visily from "../../assets/visily.png"; // Substitua pelo print do Dashboard

export const HeroHome = () => {
  return (
    <section className="py-16 px-6 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Gestão <span className="text-[#22C55E]">Inteligente</span> para sua <span className="text-[#22C55E]">Fazenda</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Otimize sua produção, controle custos e tome decisões baseadas em dados reais. 
            O SIGFaz é a ferramenta completa para o produtor moderno.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-[#22C55E] text-white font-bold rounded-xl hover:bg-green-600 transition-all">
              Começar agora
            </button>
            <button className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50">
              Saiba mais
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={Visily} alt="Dashboard SIGFaz" className="rounded-2xl shadow-2xl border border-gray-100" />
        </div>
      </div>
    </section>
  );
};