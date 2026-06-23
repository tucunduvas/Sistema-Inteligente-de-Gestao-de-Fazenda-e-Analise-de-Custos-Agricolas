import { useEffect, useState } from "react";
import api from "../../services/api";
import { TrendingDown, Plus, Trash2, RefreshCw } from "lucide-react";
import Button from "../../Components/Button";

interface Gasto {
  id: number;
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
}

export default function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    categoria: "",
    descricao: "",
    valor: "",
    data: "",
  });

  async function obterGastos() {
    try {
      setLoading(true);
      const response = await api.get("/custos/");
      // Normaliza resposta (pode vir como tupla/array ou objetos)
      const data = response.data;
      const normalized: any[] = Array.isArray(data)
        ? data
        : [];
      setGastos(normalized as Gasto[]);
    } catch (error) {
      console.error("Ocorreu um erro ao obter o histórico de despesas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function registarGasto(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.categoria || !formData.descricao || !formData.valor || !formData.data) {
      alert("É obrigatório o preenchimento de todos os campos do formulário.");
      return;
    }

    try {
      await api.post("/custos/", {
        categoria: formData.categoria,
        descricao: formData.descricao,
        valor: Number(formData.valor),
        data: formData.data,
      });
      
      alert("Despesa financeira registada com sucesso.");
      setFormData({ categoria: "", descricao: "", valor: "", data: "" }); 
      obterGastos(); 
    } catch (error) {
      console.error("Erro durante o registo da despesa:", error);
      alert("Não foi possível efetuar o registo. Verifique a estabilidade da ligação.");
    }
  }

  async function eliminarGasto(id: number) {
    if (!window.confirm("Tem a certeza de que deseja eliminar este registo financeiro? Esta ação é irreversível.")) return;

    try {
      await api.delete(`/custos/${id}`);
      alert("Registo eliminado com sucesso.");
      obterGastos();
    } catch (error) {
      console.error("Erro ao eliminar a despesa:", error);
      alert("Ocorreu uma falha ao tentar eliminar o registo.");
    }
  }

  useEffect(() => {
    obterGastos();
  }, []);

  function processarAlteracao(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Funções de formatação
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const formatarData = (dataISO: string) => {
    if (!dataISO) return "";
    const partes = dataISO.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
  };

  return (
    <div className="flex flex-col text-left m-10 gap-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Controlo de Gastos</h1>
          <p className="mt-2 text-gray-600">Efetue o lançamento e monitorização dos custos operacionais da fazenda.</p>
        </div>
        <div onClick={obterGastos}>
          <Button 
            icon={<RefreshCw className="text-gray-600" size={18} />}  
            text="Atualizar Registos" 
            bgColor="bg-gray-200" 
            fontColor="text-gray-700" 
            bgHover="hover:bg-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        
        {/* Formulário de Registo de Despesas */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
              <TrendingDown size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Lançar Despesa</h2>
          </div>

          <form onSubmit={registarGasto} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Categoria da Despesa</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={processarAlteracao}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              >
                <option value="">Selecione a categoria apropriada</option>
                <option value="Sementes e Mudas">Sementes e Mudas</option>
                <option value="Fertilizantes">Fertilizantes e Corretivos</option>
                <option value="Defensivos">Defensivos Agrícolas</option>
                <option value="Combustível">Combustível</option>
                <option value="Manutenção">Manutenção de Máquinas</option>
                <option value="Mão de Obra">Mão de Obra / Salários</option>
                <option value="Impostos">Impostos e Taxas</option>
                <option value="Outros">Outros Custos</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição Detalhada</label>
              <input
                name="descricao"
                value={formData.descricao}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: Aquisição de 1000L de Diesel"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valor (R$)</label>
              <input
                name="valor"
                value={formData.valor}
                onChange={processarAlteracao}
                type="number"
                step="0.01"
                placeholder="Ex: 4500.00"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data da Ocorrência</label>
              <input
                name="data"
                value={formData.data}
                onChange={processarAlteracao}
                type="date"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Registar Saída Financeira
              </button>
            </div>
          </form>
        </div>

        {/* Histórico Financeiro */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Lançamentos</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                  <th className="py-3 px-6 font-medium">Data</th>
                  <th className="py-3 px-6 font-medium">Categoria</th>
                  <th className="py-3 px-6 font-medium">Descrição</th>
                  <th className="py-3 px-6 font-medium text-right">Valor</th>
                  <th className="py-3 px-6 font-medium text-center">Operações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">A processar as informações financeiras...</td>
                  </tr>
                ) : gastos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">Não existem lançamentos financeiros registados.</td>
                  </tr>
                ) : (
                  gastos.map((gasto) => (
                    <tr key={gasto.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm text-gray-600 font-medium">
                        {formatarData(gasto.data)}
                      </td>
                      <td className="py-3 px-6 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}>
                          {gasto.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-800 truncate max-w-[200px]" title={gasto.descricao}>
                        {gasto.descricao}
                      </td>
                      <td className="py-3 px-6 text-sm font-semibold text-rose-600 text-right">
                        {formatarMoeda(gasto.valor)}
                      </td>
                      <td className="py-3 px-6 text-sm flex justify-center">
                        <button 
                          onClick={() => eliminarGasto(gasto.id)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Anular Registo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}