export const CTAIFMS = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto bg-[#22C55E] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        

        <div className="md:w-2/3 z-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Um projeto com selo de excelência IFMS 
          </h2>
          <p className="text-green-50 text-sm md:text-base leading-relaxed opacity-90">
            O SIGFaz é um projeto de pesquisa e extensão que une o rigor acadêmico às 
            necessidades práticas do campo. Estamos em constante evolução. 
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8 md:mt-0 z-10">
          <button className="px-6 py-3 bg-white text-[#22C55E] font-bold rounded-xl hover:bg-green-50 transition-colors shadow-sm">
            Documentação 
          </button>
          <button className="px-6 py-3 bg-white text-black font-bold rounded-xl border border-white/40 hover:bg-white/10 transition-colors">
            Falar Conosco 
          </button>
        </div>
        <div>

        </div>
      </div>
    </section>
  );
};