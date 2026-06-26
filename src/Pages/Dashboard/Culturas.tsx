import { useEffect, useState } from "react";
import api from "../../services/api";
import { Leaf, Plus, Trash2, RefreshCw } from "lucide-react";
import Button from "../../Components/Button";

// Tipagem para a Cultura
interface Cultura {
    id: number;
    nome: string;
    tipo: string;
    ciclo_dias: number;
}

export default function Culturas() {
    const [culturas, setCulturas] = useState<Cultura[]>([]);
    const [loading, setLoading] = useState(false);

    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: "",
        tipo: "",
        ciclo_dias: "",
    });

    // Função para buscar culturas no backend
    async function buscarCulturas() {
        try {
            setLoading(true);
            const response = await api.get("/culturas/");
            setCulturas(response.data);
        } catch (error) {
            console.error("Erro ao buscar culturas:", error);
        } finally {
            setLoading(false);
        }
    }

    // Função para salvar nova cultura
    async function salvarCultura(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.nome || !formData.tipo || !formData.ciclo_dias) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            await api.post("/culturas/", {
                nome: formData.nome,
                tipo: formData.tipo,
                ciclo_dias: Number(formData.ciclo_dias),
            });

            alert("Cultura cadastrada com sucesso!");
            setFormData({ nome: "", tipo: "", ciclo_dias: "" }); // Limpa o form
            buscarCulturas(); // Atualiza a lista
        } catch (error) {
            console.error("Erro ao cadastrar cultura:", error);
            alert("Erro ao cadastrar cultura.");
        }
    }

    // Função para deletar cultura
    async function deletarCultura(id: number) {
        if (!window.confirm("Tem certeza que deseja excluir esta cultura?")) return;

        try {
            await api.delete(`/culturas/${id}`);
            alert("Cultura deletada com sucesso!");
            buscarCulturas(); // Atualiza a lista
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Erro ao deletar cultura.");
        }
    }

    // Executa a busca ao carregar a página
    useEffect(() => {
        buscarCulturas();
    }, []);

    // Handler para inputs do formulário
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="flex flex-col text-left m-10 gap-6">

            {/* Cabeçalho */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Culturas</h1>
                    <p className="mt-2 text-gray-600">Gerencie as culturas plantadas na sua fazenda.</p>
                </div>
                <div onClick={buscarCulturas}>
                    <Button
                        icon={<RefreshCw className="text-gray-600" size={18} />}
                        text="Atualizar"
                        bgColor="bg-gray-200"
                        fontColor="text-gray-700"
                        bgHover="hover:bg-gray-300"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mt-4">

                {/* Lado Esquerdo: Formulário de Cadastro */}
                <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <Leaf size={20} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Nova Cultura</h2>
                    </div>

                    <form onSubmit={salvarCultura} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nome da Cultura</label>
                            <input
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Ex: Soja"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="Grão">Grão</option>
                                <option value="Cereal">Cereal</option>
                                <option value="Fibra">Fibra</option>
                                <option value="Hortaliça">Hortaliça</option>
                                <option value="Frutífera">Frutífera</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Ciclo (Dias)</label>
                            <input
                                name="ciclo_dias"
                                value={formData.ciclo_dias}
                                onChange={handleChange}
                                type="number"
                                placeholder="Ex: 120"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors"
                            >
                                <Plus size={18} />
                                Cadastrar Cultura
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lado Direito: Lista de Culturas */}
                <div className="w-full lg:w-2/3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Culturas Cadastradas</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                                    <th className="py-3 px-6 font-medium">ID</th>
                                    <th className="py-3 px-6 font-medium">Nome</th>
                                    <th className="py-3 px-6 font-medium">Tipo</th>
                                    <th className="py-3 px-6 font-medium">Ciclo (Dias)</th>
                                    <th className="py-3 px-6 font-medium text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-gray-500">Carregando dados...</td>
                                    </tr>
                                ) : culturas.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-gray-500">Nenhuma cultura cadastrada.</td>
                                    </tr>
                                ) : (
                                    culturas.map((cultura) => (
                                        <tr key={cultura.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-6 text-sm text-gray-500">#{cultura.id}</td>
                                            <td className="py-3 px-6 text-sm font-semibold text-gray-800">{cultura.nome}</td>
                                            <td className="py-3 px-6 text-sm">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                    {cultura.tipo}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6 text-sm text-gray-600">{cultura.ciclo_dias} dias</td>
                                            <td className="py-3 px-6 text-sm flex justify-center">
                                                <button
                                                    onClick={() => deletarCultura(cultura.id)}
                                                    className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Excluir Cultura"
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