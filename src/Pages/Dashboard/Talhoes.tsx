import { useState } from "react";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { Download, Plus, Map, TrendingUp, DollarSign, Search, Filter } from "lucide-react";
import Panel from "../../Components/Panel";
import ListaTalhoes from "../../Components/ListTalhoes";
import type { Talhao } from "../../Components/ListTalhoes";
import DashboardCards from "../../Components/DashboardCards";

// MOCK - substitua pelos dados reais (API, contexto, etc.)
const TODOS_TALHOES: Talhao[] = [
  { id: '200-FAZ', nome: 'Talhão Sul 04', cultura: 'Milho', area: 85, produtividade: 140, valor: 4100.00, status: 'Plantio' },
  { id: '300-FAZ', nome: 'Várzea Central', cultura: 'Algodão', area: 210.3, produtividade: 280, valor: 5500.00, status: 'Colheita' },
  { id: '400-FAZ', nome: 'Encosta Leste', cultura: 'Soja', area: 45.2, produtividade: 62, valor: 3150.00, status: 'Desenvolvimento' },
  { id: '500-FAZ', nome: 'Platô Norte', cultura: 'Milho', area: 130, produtividade: 155, valor: 4300.00, status: 'Plantio' },
  { id: '600-FAZ', nome: 'Baixada Oeste', cultura: 'Soja', area: 98.7, produtividade: 70, valor: 3300.00, status: 'Colheita' },
  { id: '700-FAZ', nome: 'Serra Verde', cultura: 'Algodão', area: 175, produtividade: 260, valor: 5200.00, status: 'Desenvolvimento' },
];

const ITENS_POR_PAGINA = 5;

export default function Talhoes() {
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [busca, setBusca] = useState<string>("");

  const talhoesFiltrados = TODOS_TALHOES.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.cultura.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.max(1, Math.ceil(talhoesFiltrados.length / ITENS_POR_PAGINA));
  const paginaSegura = Math.min(paginaAtual, totalPaginas);

  const inicio = (paginaSegura - 1) * ITENS_POR_PAGINA;
  const talhoesDaPagina = talhoesFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  function irParaPagina(pagina: number) {
    if (pagina < 1 || pagina > totalPaginas) return;
    setPaginaAtual(pagina);
  }

  const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="flex flex-col text-left m-10 g-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Talhões</h1>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button icon={<Download className="text-gray-600" size={20} />} text="Exportar" bgColor="bg-gray-200" fontColor="text-gray-600" bgHover="bg-gray-100"/>
          <Button onClick={() => navigate("/dashboard/CadTalhoes")} icon={<Plus className="text-white" size={20} />} text="Novo Talhão" bgColor="bg-green-600" fontColor="text-white" bgHover="bg-green-400"/>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Visualize e gerencie a produtividade de suas áreas produtivas.</p>
      <div className="w-full p-1 gap-3 flex flex-row items-center justify-center">
        <Panel bgColor="bg-green-100" title="ÁREA TOTAL GERENCIADA" icon={<Map className="text-gray-700" size={20} />} value="616.0 ha" subtitle="+12.5% em relação à última safra"/>
        <Panel bgColor="bg-white" title="PRODUÇÃO ESTIMADA" icon={<TrendingUp className="text-green-700" size={20} />} value="89.9k Scs" subtitle="Estimativa baseada no histórico local"/>
        <Panel bgColor="bg-blue-100" title="CUSTO MÉDIO OPERACIONAL" icon={<DollarSign className="text-gray-700" size={20} />} value="R$3.750,00" subtitle="Inclui insumos a maquinário"/>
      </div>

      <div className="w-full mx-auto bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="w-full bg-white flex justify-between items-center p-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Filtrar por nome ou cultura..."
              className="w-64 outline-none bg-transparent text-gray-700 placeholder-gray-400 p-2"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPaginaAtual(1);
              }}
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <Filter className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors" size={20} />
            <p className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors text-sm font-medium">
              Filtros Avançados
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 border-y border-gray-200 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-2 w-40"><span>Nome do Talhão</span></div>
          <div className="w-24">Cultura</div>
          <div className="w-20">Área (ha)</div>
          <div className="w-24">Prod. Estimada</div>
          <div className="w-32">Custo/ha</div>
          <div className="w-32">Status</div>
          <div className="w-21"></div>
        </div>

        <ListaTalhoes talhoes={talhoesDaPagina} />

        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200 text-sm rounded-b-xl">
          <div className="text-gray-500">
            Exibindo <span className="font-bold text-gray-700">{talhoesDaPagina.length}</span> de{" "}
            <span className="font-bold text-gray-700">{talhoesFiltrados.length}</span> talhões cadastrados
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => irParaPagina(paginaSegura - 1)}
              disabled={paginaSegura === 1}
              className={`px-4 py-1.5 rounded-lg border font-medium transition-colors ${
                paginaSegura === 1
                  ? "border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Anterior
            </button>

            {numerosPaginas.map((num) => (
              <button
                key={num}
                onClick={() => irParaPagina(num)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                  num === paginaSegura
                    ? "bg-green-500 text-white shadow-sm hover:bg-green-600"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => irParaPagina(paginaSegura + 1)}
              disabled={paginaSegura === totalPaginas}
              className={`px-4 py-1.5 rounded-lg border font-medium transition-colors ${
                paginaSegura === totalPaginas
                  ? "border-gray-100 text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Próximo
            </button>
          </div>
        </div>

      </div>
      <DashboardCards/>
    </div>
  );
}