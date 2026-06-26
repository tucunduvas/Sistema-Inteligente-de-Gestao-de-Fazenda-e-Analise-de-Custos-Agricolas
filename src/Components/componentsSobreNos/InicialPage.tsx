import Visily from "../../assets/visily.png";

export const InicialPage = () => {
  return (
    <section className="bg-white py-16 px-6 lg:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold text-green-700 bg-green-50 rounded-full border border-green-100">
            Sobre o Projeto
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Inovando a Gestão <br />
            <span className="text-[#22C55E]">No Campo</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            O SIGFaz nasceu no Instituto Federal de Mato Grosso do Sul (IFMS)
            com a missão de democratizar a tecnologia de ponta para pequenos e médios produtores rurais brasileiros.
          </p>

          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-[#22C55E] text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md">
              Ver Projeto no GitHub
            </button>
            <button className="px-8 py-3 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Conhecer o IFMS
            </button>
          </div>
        </div>

       
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={Visily}
              alt="Colheita no campo"
              className="w-full h-auto object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
