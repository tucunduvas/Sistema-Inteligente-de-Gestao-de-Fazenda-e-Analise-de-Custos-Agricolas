import { useEffect, useState } from "react";
import api from "../../services/api";
import { ClipboardList, Plus, Trash2, RefreshCw } from "lucide-react";
import Button from "../../Components/Button";

interface Atividade {
  id: number;
  tipo: string;
  data: string;
  talhao: string;
  descricao: string;
}

export default function Atividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    tipo: "",
    data: "",
    talhao: "",
    descricao: "",
  });

  async function obterAtividades() {
    try {
      setLoading(true);
      const response = await api.get("/atividades/");
      setAtividades(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os registos das atividades:", error);
    } finally {
      setLoading(false);
    }
  }

  async function registarAtividade(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.tipo || !formData.data || !formData.talhao || !formData.descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/atividades/", {
        tipo: formData.tipo,
        data: formData.data,
        talhao: formData.talhao,
        descricao: formData.descricao,
      });
      
      alert("Atividade agrícola registada com sucesso.");
      setFormData({ tipo: "", data: "", talhao: "", descricao: "" }); 
      obterAtividades(); 
    } catch (error) {
      console.error("Ocorreu um erro durante o registo da atividade:", error);
      alert("Não foi possível concluir o registo. Verifique a ligação ao servidor.");
    }
  }

  async function eliminarAtividade(id: number) {
    if (!window.confirm("Confirma a eliminação permanente deste registo?")) return;

    try {
      await api.delete(`/atividades/${id}`);
      alert("Registo eliminado com sucesso.");
      obterAtividades();
    } catch (error) {
      console.error("Erro ao eliminar a atividade:", error);
      alert("Não foi possível eliminar o registo.");
    }
  }

  useEffect(() => {
    obterAtividades();
  }, []);

  function processarAlteracao(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Função para formatar a data para o padrão de exibição (DD/MM/AAAA)
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
          <h1 className="text-3xl font-bold text-gray-800">Atividades Agrícolas</h1>
          <p className="mt-2 text-gray-600">Registe e acompanhe todas as operações de campo da propriedade.</p>
        </div>
        <div onClick={obterAtividades}>
          <Button 
            icon={<RefreshCw className="text-gray-600" size={18} />}  
            text="Atualizar Histórico" 
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
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <ClipboardList size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Nova Operação</h2>
          </div>

          <form onSubmit={registarAtividade} className="space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tipo de Operação</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={processarAlteracao}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Selecione a operação</option>
                <option value="Preparo de Solo">Preparo de Solo</option>
                <option value="Plantio">Plantio</option>
                <option value="Pulverização">Pulverização / Defensivos</option>
                <option value="Adubação">Adubação</option>
                <option value="Colheita">Colheita</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Data de Execução</label>
              <input
                name="data"
                value={formData.data}
                onChange={processarAlteracao}
                type="date"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Talhão / Área Afetada</label>
              <input
                name="talhao"
                value={formData.talhao}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: Talhão 01 - Setor Sul"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição / Observações</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={processarAlteracao}
                rows={3}
                placeholder="Detalhes adicionais da operação..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Registar Operação
              </button>
            </div>
          </form>
        </div>

        {/* Tabela de Histórico */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Diário de Campo</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                  <th className="py-3 px-6 font-medium">Data</th>
                  <th className="py-3 px-6 font-medium">Operação</th>
                  <th className="py-3 px-6 font-medium">Local (Talhão)</th>
                  <th className="py-3 px-6 font-medium">Detalhes</th>
                  <th className="py-3 px-6 font-medium text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">A processar o diário de campo...</td>
                  </tr>
                ) : atividades.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">Nenhum registo de atividade encontrado.</td>
                  </tr>
                ) : (
                  atividades.map((atividade) => (
                    <tr key={atividade.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm text-gray-600 font-medium">
                        {formatarData(atividade.data)}
                      </td>
                      <td className="py-3 px-6 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700`}>
                          {atividade.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-800">{atividade.talhao}</td>
                      <td className="py-3 px-6 text-sm text-gray-600 max-w-xs truncate" title={atividade.descricao}>
                        {atividade.descricao}
                      </td>
                      <td className="py-3 px-6 text-sm flex justify-center">
                        <button 
                          onClick={() => eliminarAtividade(atividade.id)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Eliminar Registo"
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