import {
  LuLayoutTemplate,
  LuServer,
  LuDatabase,
  LuGraduationCap,
} from "react-icons/lu";
import { IoCodeSlash } from "react-icons/io5";
import { TechCard } from "./CardTecnologias";

export const Tecnologia = () => {
  const Informacao = [
    {
      Icon: LuLayoutTemplate,
      category: "Frontend",
      title: "React",
      description:
        "Uma biblioteca JavaScript moderna para criar interfaces de usuário dinâmicas, rápidas e totalmente responsivas para desktop e dispositivos móveis.",
    },
    {
      Icon: LuServer,
      category: "Backend",
      title: "FastAPI",
      description:
        "Um framework Python de alto desempenho para construir APIs, garantindo que o processamento de dados financeiros seja instantâneo e seguro.",
    },
    {
      Icon: LuDatabase,
      category: "Banco de Dados",
      title: "PostgreSQL",
      description:
        "O banco de dados relacional mais avançado do mundo, protegendo cada registro de custo e produção com máxima integridade e confiabilidade.",
    },
  ];
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tecnologia de Ponta
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {Informacao.map((tech, index) => (
          <TechCard
            key={index}
            Icon={tech.Icon}
            category={tech.category}
            title={tech.title}
            description={tech.description}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-16 gap-8 grayscale opacity-40">
        <IoCodeSlash size={32} />
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tighter"></span>
          <LuGraduationCap size={32} />
          <span className="font-bold text-xl tracking-tighter">IFMS</span>
        </div>
      </div>
    </section>
  );
};
