import { useEffect, useState } from "react";
import api from "../../services/api";
import { Package, Plus, Trash2, RefreshCw } from "lucide-react";
import Button from "../../Components/Button";

interface Insumo {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  preco_unitario: number;
}

export default function Insumos() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: "",
    unidade: "",
    preco_unitario: "",
  });

  async function obterInsumos() {
    try {
      setLoading(true);
      const response = await api.get("/insumos/");
      setInsumos(response.data);
    } catch (error) {
      console.error("Erro ao obter o inventário de insumos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function registarInsumo(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.nome || !formData.categoria || !formData.quantidade || !formData.unidade || !formData.preco_unitario) {
      alert("Por favor, preencha todos os campos do formulário.");
      return;
    }

    try {
      await api.post("/insumos/", {
        nome: formData.nome,
        categoria: formData.categoria,
        quantidade: Number(formData.quantidade),
        unidade: formData.unidade,
        preco_unitario: Number(formData.preco_unitario),
      });
      
      alert("Insumo registado com sucesso no stock.");
      setFormData({ nome: "", categoria: "", quantidade: "", unidade: "", preco_unitario: "" }); 
      obterInsumos(); 
    } catch (error) {
      console.error("Erro durante o registo do insumo:", error);
      alert("Não foi possível registar o insumo. Verifique a ligação.");
    }
  }

  async function eliminarInsumo(id: number) {
    if (!window.confirm("Confirma a eliminação deste insumo do inventário?")) return;

    try {
      await api.delete(`/insumos/${id}`);
      alert("Registo eliminado com sucesso.");
      obterInsumos();
    } catch (error) {
      console.error("Erro ao eliminar o insumo:", error);
      alert("Não foi possível eliminar o registo.");
    }
  }

  useEffect(() => {
    obterInsumos();
  }, []);

  function processarAlteracao(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Função para formatar valores monetários (Euro/Real)
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className="flex flex-col text-left m-10 gap-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Insumos</h1>
          <p className="mt-2 text-gray-600">Controle o inventário de sementes, fertilizantes e defensivos agrícolas.</p>
        </div>
        <div onClick={obterInsumos}>
          <Button 
            icon={<RefreshCw className="text-gray-600" size={18} />}  
            text="Atualizar Dados" 
            bgColor="bg-gray-200" 
            fontColor="text-gray-700" 
            bgHover="hover:bg-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        
        {/* Formulário de Registo */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Package size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Novo Insumo</h2>
          </div>

          <form onSubmit={registarInsumo} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Designação do Produto</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: Ureia Agrícola"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={processarAlteracao}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Selecione a categoria</option>
                <option value="Sementes">Sementes</option>
                <option value="Fertilizantes">Fertilizantes</option>
                <option value="Defensivos">Defensivos (Agrotóxicos)</option>
                <option value="Outros">Outros</option>
              </select>
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
                  placeholder="Ex: 500"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Unidade Medida</label>
                <select
                  name="unidade"
                  value={formData.unidade}
                  onChange={processarAlteracao}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="kg">Quilogramas (kg)</option>
                  <option value="L">Litros (L)</option>
                  <option value="ton">Toneladas (ton)</option>
                  <option value="sacas">Sacas</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Preço Unitário (R$)</label>
              <input
                name="preco_unitario"
                value={formData.preco_unitario}
                onChange={processarAlteracao}
                type="number"
                step="0.01"
                placeholder="Ex: 150.50"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Registar Insumo
              </button>
            </div>
          </form>
        </div>

        {/* Tabela de Inventário */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Inventário Atual</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                  <th className="py-3 px-6 font-medium">Produto</th>
                  <th className="py-3 px-6 font-medium">Categoria</th>
                  <th className="py-3 px-6 font-medium text-right">Quantidade</th>
                  <th className="py-3 px-6 font-medium text-right">Custo Total</th>
                  <th className="py-3 px-6 font-medium text-center">Operações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">A processar dados...</td>
                  </tr>
                ) : insumos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">O inventário encontra-se vazio.</td>
                  </tr>
                ) : (
                  insumos.map((insumo) => (
                    <tr key={insumo.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm font-semibold text-gray-800">{insumo.nome}</td>
                      <td className="py-3 px-6 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          insumo.categoria === 'Sementes' ? 'bg-green-100 text-green-700' :
                          insumo.categoria === 'Fertilizantes' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {insumo.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-600 text-right">
                        {insumo.quantidade} {insumo.unidade}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-800 font-medium text-right">
                        {formatarMoeda(insumo.quantidade * insumo.preco_unitario)}
                      </td>
                      <td className="py-3 px-6 text-sm flex justify-center">
                        <button 
                          onClick={() => eliminarInsumo(insumo.id)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Eliminar Insumo"
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