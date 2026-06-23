export const CTAHome = () => {
    return (
        <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto bg-[#22C55E] rounded-3xl p-12 text-center text-white shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Comece a gerenciar sua fazenda hoje
                </h2>
                <p className="text-green-50 mb-10 max-w-2xl mx-auto opacity-90">
                    Junte-se a produtores que já estão transformando seus dados em lucro.
                    Experimente nossa plataforma gratuitamente por 15 dias.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-8 py-3 bg-white text-[#22C55E] font-bold rounded-xl hover:bg-green-50">
                        Experimente grátis
                    </button>
                    <button className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-xl hover:bg-white/10">
                        Falar com consultor
                    </button>
                </div>
            </div>
        </section>
    );
};