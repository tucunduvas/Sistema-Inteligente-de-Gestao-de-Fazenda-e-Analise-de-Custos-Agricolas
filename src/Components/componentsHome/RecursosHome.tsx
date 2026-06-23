import { TechCard } from "../componentsSobreNos/CardTecnologias";
import { LuLayoutDashboard, LuArmchair, LuCalendarCheck, LuMap } from "react-icons/lu";

export const RecursosHome = () => {
  const recursos = [
    {
      Icon: LuMap,
      category: "Gestão",
      title: "Controle de Talhão",
      description: "Mapeie sua propriedade e acompanhe o histórico de cada área cultivada de forma individual."
    },
    {
      Icon: LuArmchair,
      category: "Financeiro",
      title: "Análise de Custos",
      description: "Tenha visão clara dos seus gastos com insumos, maquinário e mão de obra em tempo real."
    },
    {
      Icon: LuCalendarCheck,
      category: "Operacional",
      title: "Gestão de Atividades",
      description: "Agende e monitore todas as tarefas do campo, garantindo que nada passe despercebido."
    },
    {
      Icon: LuLayoutDashboard,
      category: "Inteligência",
      title: "Dashboard Integrado",
      description: "Visualize indicadores de performance e produtividade em gráficos intuitivos e fáceis de ler."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">O que o SIGFaz oferece</h2>
        <p className="text-gray-600">Eficiência e tecnologia de ponta para simplificar o seu dia a dia no campo.</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recursos.map((item, idx) => (
          <TechCard key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};