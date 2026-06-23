import { FiAlertTriangle } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

export const ProblemaSolucao = () => {
  return (
    <section className="bg-gray-100 py-20 px-">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
    
        <div className="space-y-6">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-red-400" size={23} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900">O Problema</h2>
          
          <p className="text-gray-600 leading-relaxed">
            Historicamente, a gestão agrícola em pequenas propriedades depende de 
            cadernos de anotações e planilhas desconexas. Essa falta de centralização gera:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shrink-0" />
              Perda de dados históricos essenciais
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shrink-0" />
              Dificuldade em calcular o custo real de produção
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shrink-0" />
              Baixa visibilidade sobre a rentabilidade de cada talhão
            </li>
            <li className="flex items-center text-gray-700">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 shrink-0" />
              Processos manuais lentos e propensos a erros
            </li>
          </ul>
        </div>
        {/* Coluna: A Solução SIGFaz */}
        <div className="space-y-6">
          <div className="w-12 h-12  flex items-center justify-center">
            <FaRegCheckCircle className="text-gray-900" size={23} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900">A Solução SIGFaz</h2>
          
          <p className="text-gray-600 leading-relaxed">
            Oferecemos uma plataforma web integrada que une o dia a dia operacional à 
            inteligência financeira, transformando dados brutos em decisões estratégicas:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <FaRegCheckCircle className="text-green-500 mr-3 shrink-0" size={20} />
              Registro centralizado de atividades e insumos
            </li>
            <li className="flex items-center text-gray-700">
              <FaRegCheckCircle className="text-green-500 mr-3 shrink-0" size={20} />
              Análise automática de custos e margem de lucro
            </li>
            <li className="flex items-center text-gray-700">
              <FaRegCheckCircle className="text-green-500 mr-3 shrink-0" size={20} />
              Dashboards visuais para monitoramento em tempo real 
            </li>
            <li className="flex items-center text-gray-700">
              <FaRegCheckCircle className="text-green-500 mr-3 shrink-0" size={20} />
              Interface simplificada pensada no produtor rural 
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

