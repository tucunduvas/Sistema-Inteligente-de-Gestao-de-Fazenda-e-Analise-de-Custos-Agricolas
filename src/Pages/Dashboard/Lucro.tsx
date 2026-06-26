import { useEffect, useState } from "react";
import api from "../../services/api";
import { TrendingUp, DollarSign, Sprout, RefreshCw, Trash2, Plus } from "lucide-react";
import Button from "../../Components/Button";

interface Gasto {
  id: number;
  valor: number;
}

interface Producao {
  id: number;
  cultura: string;
  talhao: string;
  quantidade: number;
  unidade: string;
  valor_unitario: number;
  data: string;
}

export default function Lucro() {
  const [producoes, setProducoes] = useState<Producao[]>([]);
  const [totalCustos, setTotalCustos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    cultura: "",
    talhao: "",
    quantidade: "",
    unidade: "sacas",
    valor_unitario: "",
    data: "",
  });

  async function obterDadosFinanceiros() {
    try {
      setLoading(true);
      // Faz as duas requisições em paralelo para maior rapidez
      const [resProducao, resCustos] = await Promise.all([
        api.get("/producao/"),
        api.get("/custos/")
      ]);
      
      setProducoes(resProducao.data);
      
      // Calcula a soma total de todos os custos registados
      const somaCustos = resCustos.data.reduce((acc: number, custo: Gasto) => acc + custo.valor, 0);
      setTotalCustos(somaCustos);
      
    } catch (error) {
      console.error("Ocorreu um erro ao obter os dados financeiros:", error);
    } finally {
      setLoading(false);
    }
  }

  async function registarProducao(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.cultura || !formData.quantidade || !formData.valor_unitario || !formData.data) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/producao/", {
        ...formData,
        quantidade: Number(formData.quantidade),
        valor_unitario: Number(formData.valor_unitario),
      });
      
      alert("Receita/Produção registada com sucesso!");
      setFormData({ cultura: "", talhao: "", quantidade: "", unidade: "sacas", valor_unitario: "", data: "" }); 
      obterDadosFinanceiros(); 
    } catch (error) {
      console.error("Erro durante o registo da produção:", error);
      alert("Não foi possível efetuar o registo.");
    }
  }

  async function eliminarProducao(id: number) {
    if (!window.confirm("Confirma a eliminação deste registo de receita?")) return;

    try {
      await api.delete(`/producao/${id}`);
      alert("Registo eliminado com sucesso.");
      obterDadosFinanceiros();
    } catch (error) {
      console.error("Erro ao eliminar a produção:", error);
    }
  }

  useEffect(() => {
    obterDadosFinanceiros();
  }, []);

  function processarAlteracao(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Cálculos Financeiros
  const totalReceitas = producoes.reduce((acc, prod) => acc + (prod.quantidade * prod.valor_unitario), 0);
  const lucroLiquido = totalReceitas - totalCustos;
  const margemLucro = totalReceitas > 0 ? ((lucroLiquido / totalReceitas) * 100).toFixed(1) : 0;

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className="flex flex-col text-left m-10 gap-6">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lucro e Resultados</h1>
          <p className="mt-2 text-gray-600">Acompanhe o balanço financeiro, receitas de colheita e a margem de lucro.</p>
        </div>
        <div onClick={obterDadosFinanceiros}>
          <Button 
            icon={<RefreshCw className="text-gray-600" size={18} />}  
            text="Atualizar Balanço" 
            bgColor="bg-gray-200" 
            fontColor="text-gray-700" 
            bgHover="hover:bg-gray-300"
          />
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Receita Total (Produção)</p>
            <h3 className="text-2xl font-bold text-gray-800">{formatarMoeda(totalReceitas)}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-rose-100 rounded-full text-rose-600">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Custos Operacionais</p>
            <h3 className="text-2xl font-bold text-gray-800">{formatarMoeda(totalCustos)}</h3>
          </div>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm flex items-center gap-4 ${lucroLiquido >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className={`p-4 rounded-full ${lucroLiquido >= 0 ? 'bg-emerald-200 text-emerald-700' : 'bg-red-200 text-red-700'}`}>
            <DollarSign size={28} />
          </div>
          <div>
            <p className={`text-sm font-medium ${lucroLiquido >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              Lucro Líquido ({margemLucro}%)
            </p>
            <h3 className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-emerald-800' : 'text-red-800'}`}>
              {formatarMoeda(lucroLiquido)}
            </h3>
          </div>
        </div>
      </div>

      {/* Secção Inferior: Formulário e Tabela de Receitas */}
      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Sprout size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Registar Receita/Colheita</h2>
          </div>

          <form onSubmit={registarProducao} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cultura Produzida</label>
              <input
                name="cultura"
                value={formData.cultura}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: Soja"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quantidade</label>
                <input
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={processarAlteracao}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Unidade</label>
                <select
                  name="unidade"
                  value={formData.unidade}
                  onChange={processarAlteracao}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="sacas">Sacas</option>
                  <option value="ton">Toneladas</option>
                  <option value="kg">Quilogramas</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Valor Unitário Venda (R$)</label>
              <input
                name="valor_unitario"
                value={formData.valor_unitario}
                onChange={processarAlteracao}
                type="number"
                step="0.01"
                placeholder="Ex: 135.50"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data da Venda/Colheita</label>
              <input
                name="data"
                value={formData.data}
                onChange={processarAlteracao}
                type="date"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Confirmar Registo
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Receitas (Produção)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                  <th className="py-3 px-6 font-medium">Data</th>
                  <th className="py-3 px-6 font-medium">Cultura</th>
                  <th className="py-3 px-6 font-medium text-right">Volume</th>
                  <th className="py-3 px-6 font-medium text-right">Receita Bruta</th>
                  <th className="py-3 px-6 font-medium text-center">Operações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">A processar o balanço...</td>
                  </tr>
                ) : producoes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">Sem registos de receita até ao momento.</td>
                  </tr>
                ) : (
                  producoes.map((prod) => (
                    <tr key={prod.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm text-gray-600 font-medium">
                        {prod.data.split('-').reverse().join('/')}
                      </td>
                      <td className="py-3 px-6 text-sm font-semibold text-gray-800">{prod.cultura}</td>
                      <td className="py-3 px-6 text-sm text-gray-600 text-right">
                        {prod.quantidade} {prod.unidade}
                      </td>
                      <td className="py-3 px-6 text-sm font-semibold text-emerald-600 text-right">
                        {formatarMoeda(prod.quantidade * prod.valor_unitario)}
                      </td>
                      <td className="py-3 px-6 text-sm flex justify-center">
                        <button 
                          onClick={() => eliminarProducao(prod.id)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Anular Receita"
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