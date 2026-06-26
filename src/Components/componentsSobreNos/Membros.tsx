import { CardMembros } from "./CardMembros";
import imgRoberto from "../../assets/roberto.png";
import imgAna from "../../assets/ana.png";
import imgMarcos from "../../assets/marcos.png";
import imgJuliana from "../../assets/juliana.png";

export const Equipe = () => {
  const membros = [
    {
      name: "Dr. Roberto Silva",
      role: "Coordenador de Projeto",
      image: imgRoberto,
      description:
        "Especialista em Engenharia de Software e Gestão de Agronegócios com 15 anos de experiência.",
    },
    {
      name: "Ana Oliveira",
      role: "Desenvolvedora Full-Stack",
      image: imgAna,
      description:
        "Estudante de Análise de Sistemas, focada na arquitetura React e integração de APIs de alta performance.",
    },
    {
      name: "Marcos Souza",
      role: "Engenheiro de Dados",
      image: imgMarcos,
      description:
        "Responsável pela modelagem de dados no PostgreSQL e otimização de consultas para grandes volumes rurais.",
    },
    {
      name: "Juliana Santos",
      role: "UX/UI Designer",
      image: imgJuliana,
      description:
        "Especialista em criar interfaces intuitivas para produtores rurais, focando em acessibilidade e usabilidade no campo.",
    },
  ];

  return (
    <section className="bg-[#F9FAFB] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Mentes dedicadas a transformar o agronegócio através da ciência e
          tecnologia aplicada.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {membros.map((pessoa, index) => (
          <CardMembros
            key={index}
            name={pessoa.name}
            role={pessoa.role}
            image={pessoa.image}
            description={pessoa.description}
          />
        ))}
      </div>
    </section>
  );
};
