import { LuUserPlus, LuClipboard } from "react-icons/lu";
import { FiPieChart } from "react-icons/fi";

export const PassosHome = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-12">Pronto para começar em 3 passos</h2>
          <div className="space-y-10">
            <Step number="01" title="Cadastre sua fazenda" desc="Crie sua conta em poucos minutos e configure os dados básicos da sua propriedade." />
            <Step number="02" title="Registre suas atividades" desc="Insira as atividades diárias, manejos e custos de forma simples e rápida." />
            <Step number="03" title="Visualize seus resultados" desc="Acompanhe o crescimento da sua produtividade através de relatórios automáticos." />
          </div>
          <button className="mt-12 px-8 py-3 bg-[#22C55E] text-white font-bold rounded-xl">Começar agora →</button>
        </div>
        
        <div className="bg-green-50 rounded-3xl p-8 flex flex-col justify-center gap-8">
            <FeatureItem Icon={LuUserPlus} title="Registro Fácil" desc="Interface intuitiva para qualquer perfil." />
            <FeatureItem Icon={LuClipboard} title="Relatórios PDF" desc="Gere documentos prontos para impressão." />
            <FeatureItem Icon={FiPieChart} title="Gráficos de Esforço" desc="Entenda onde está investindo seu tempo." />
        </div>
      </div>
    </section>
  );
};

const Step = ({ number, title, desc }: any) => (
  <div className="flex gap-6">
    <span className="text-[#22C55E] font-bold text-xl">{number}</span>
    <div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  </div>
);

const FeatureItem = ({ Icon, title, desc }: any) => (
  <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
    <div className="p-3 bg-green-100 rounded-xl text-[#22C55E]"><Icon size={24}/></div>
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);