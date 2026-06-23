import { useEffect, useState } from "react";
import api from "../../services/api";
import { Tractor, Plus, Trash2, RefreshCw } from "lucide-react";
import Button from "../../Components/Button";

interface Maquina {
  id: number;
  nome: string;
  tipo: string;
  marca: string;
  ano: number;
}

export default function Maquinas() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    marca: "",
    ano: "",
  });

  async function obterMaquinas() {
    try {
      setLoading(true);
      const response = await api.get("/maquinas/");
      setMaquinas(response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao obter os registos das máquinas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function registarMaquina(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.nome || !formData.tipo || !formData.marca || !formData.ano) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/maquinas/", {
        // backend/controllers/maquinas.py espera: modelo, tipo, status
        // No front coletamos: nome, tipo, marca, ano
        nome: formData.nome,
        modelo: formData.marca,
        tipo: formData.tipo,
        status: "Ativo",
        ano: Number(formData.ano),
      });
      
      alert("Máquina registada com sucesso na plataforma.");
      setFormData({ nome: "", tipo: "", marca: "", ano: "" }); 
      obterMaquinas(); 
    } catch (error) {
      console.error("Ocorreu um erro durante o registo da máquina:", error);
      alert("Não foi possível concluir o registo. Verifique a ligação ao servidor.");
    }
  }

  async function eliminarMaquina(id: number) {
    if (!window.confirm("Confirma a eliminação permanente deste registo?")) return;
    if (!Number.isFinite(id) || id <= 0) {
      alert("ID inválido para eliminar.");
      return;
    }

    try {
      await api.delete(`/maquinas/${id}`);
      alert("Registo eliminado com sucesso.");
      obterMaquinas();
    } catch (error) {
      console.error("Erro ao eliminar a máquina:", error);
      alert("Não foi possível eliminar o registo.");
    }
  }

  useEffect(() => {
    obterMaquinas();
  }, []);

  function processarAlteracao(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex flex-col text-left m-10 gap-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Parque de Máquinas</h1>
          <p className="mt-2 text-gray-600">Efetue a gestão e monitorização dos equipamentos agrícolas da propriedade.</p>
        </div>
        <div onClick={obterMaquinas}>
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
        
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <Tractor size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Registar Máquina</h2>
          </div>

          <form onSubmit={registarMaquina} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Designação do Equipamento</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: Trator John Deere Série 8"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={processarAlteracao}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="">Selecione a categoria</option>
                <option value="Trator">Trator</option>
                <option value="Colheitadeira">Colheitadeira</option>
                <option value="Plantadeira">Plantadeira</option>
                <option value="Pulverizador">Pulverizador</option>
                <option value="Caminhão">Caminhão</option>
                <option value="Implemento">Implemento</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Marca/Fabricante</label>
              <input
                name="marca"
                value={formData.marca}
                onChange={processarAlteracao}
                type="text"
                placeholder="Ex: John Deere"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ano de Fabrico</label>
              <input
                name="ano"
                value={formData.ano}
                onChange={processarAlteracao}
                type="number"
                placeholder="Ex: 2023"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Confirmar Registo
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Inventário de Equipamentos</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                  <th className="py-3 px-6 font-medium">Ref.</th>
                  <th className="py-3 px-6 font-medium">Equipamento</th>
                  <th className="py-3 px-6 font-medium">Categoria</th>
                  <th className="py-3 px-6 font-medium">Marca</th>
                  <th className="py-3 px-6 font-medium">Ano</th>
                  <th className="py-3 px-6 font-medium text-center">Operações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">A obter dados do servidor...</td>
                  </tr>
                ) : maquinas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">Não existem registos de equipamentos disponíveis.</td>
                  </tr>
                ) : (
                  maquinas.map((maquina) => (
                    <tr key={maquina.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm text-gray-500">#{maquina.id}</td>
                      <td className="py-3 px-6 text-sm font-semibold text-gray-800">{maquina.nome}</td>
                      <td className="py-3 px-6 text-sm">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {maquina.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-600">{maquina.marca}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{maquina.ano}</td>
                      <td className="py-3 px-6 text-sm flex justify-center">
                        <button 
                          onClick={() => eliminarMaquina(maquina.id)}
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