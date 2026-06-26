import Button from "../../Components/componentsCadTalhoes/Button";
import SectionCard from "../../Components/SectionCard";
import { Leaf, Calendar, Droplet, User, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CadTalhoes() {
  //criando um estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    id:0 , 
    nome: "",
    area_hectares: "",
    cultura_id: "",
    data_plantio: "",
    insumo: "",
    maquina_id: "",
    operador: "",
  });
  //requisição de post ok
  async function salvarTalhao() {
    try {
      const response = await api.post("/talhoes/", formData);
      console.log("Talhão cadastrado!:", response.data, formData);
      alert("Talhão salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  }
  //requisição de get ok
  async function buscarTalhoes() {
    try {
      const response = await api.get("/talhoes/");
      console.log("Talhões encontrados:", response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //requisição de put ok (avaliando se necessario)
  async function atualizarTalhao() {
    try {
      const response = await api.put(`/talhoes/${formData.id}/`, formData);
      console.log("Talhão atualizado!", response.data, formData);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar!");
    }
  }
  //requisição de delete ok 
  async function deletarTalhao(id: number) {
    try {
      await api.delete(`/talhoes/${id}/`);

      console.log("Talhão deletado!", id);
      alert("Talhão deletado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar!");
    }
  }
{/*usando o useEffect para chamar a função de buscar os talhões quando o componente for montado */}
  useEffect(() => {
    buscarTalhoes();
  }, []);

  //chamando a função para buscar os talhões cadastrados
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Card principal */}
        <div className="rounded-2xl p-10">
          {/* Cabeçalho */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-12">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">
                {" "}
                Novo Cadastro de Talhão
              </h1>
              <p className="max-w-1xl text-gray-600">
                {" "}
                Preencha as informações abaixo para registrar uma nova área
                produtiva ou atualizar uma cultura existente.
              </p>
            </div>
          </div>
          {/* Seções */}
          <div className="space-y-10">
            {/* Informações Gerais */}
            <SectionCard
              bgIcon="bg-green-100"
              icon={<Leaf size={22} className="text-green-600" />}
              title="Informações Gerais"
              subtitle="Identifique o local e a extensão da área."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nome do Talhão
                  </label>
                  <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ex: Talhão Norte 01"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Área Total (Hectares)
                  </label>
                  <input
                    name="area_hectares"
                    value={formData.area_hectares}
                    onChange={handleChange}
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Planejamento de Safra */}
            <SectionCard
              bgIcon="bg-blue-100"
              icon={<Calendar size={22} className="text-blue-600" />}
              title="Planejamento de Safra"
              subtitle="Defina a cultura e o cronograma de plantio."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Cultura Plantada
                  </label>
                  <select
                    name="cultura_id"
                    value={formData.cultura_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value={1}>Selecione a cultura</option>
                    <option value={2}>Soja</option>
                    <option value={3}>Milho</option>
                    <option value={4}>Feijão</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Data de Plantio
                  </label>
                  <input
                    name="data_plantio"
                    value={formData.data_plantio}
                    onChange={handleChange}
                    type="date"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Recursos e Operação */}
            <SectionCard
              bgIcon="bg-yellow-100"
              icon={<Droplet size={22} className="text-yellow-600" />}
              title="Recursos e Operação"
              subtitle="Insumos, maquinário e pessoal responsável."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Insumos Utilizados
                  </label>
                  <select
                    name="insumo"
                    value={formData.insumo}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Selecione o insumo principal</option>
                    <option value="Adubo">Adubo</option>
                    <option value="Herbicida">Herbicida</option>
                    <option value="Sementes">Sementes</option>
                  </select>
                  <p className="text-gray-500 text-sm">
                    Estoque atual: 1000 kg
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Máquina Utilizada
                  </label>
                  <select
                    name="maquina_id"
                    value={formData.maquina_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Selecione a máquina</option>
                    <option value={1}>Trator</option>
                    <option value={2}>Plantadeira</option>
                    <option value={3}>Pulverizador</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Operador Responsável
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Nome completo do operador"
                    name="operador"
                    value={formData.operador}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
          {/* teste para mostrar os dados do formulário em tempo real */}
          
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
          
          <div className="mt-12 flex justify-end gap-2.5">

            {/*vai excluir o talhão com id 1, teste para mostrar a função de
            delete funcionando! depois muda para excluir o talhão selecionado */}

            <div onClick={() => deletarTalhao(Number(formData.id))}>
              <Button
                icon={<X size={15} />}
                bgColor="bg-gray-200"
                fontColor="text-black"
                text="Excluir"
                bgHover="hover:bg-gray-600"
              />
            </div>
              <div onClick={atualizarTalhao}>
              <Button
                icon={<Save size={15} color="white" />}
                bgColor="bg-blue-600"
                fontColor="text-white"
                text="Atualizar"
                bgHover="hover:bg-blue-700"
              />
            </div>
            <div onClick={salvarTalhao}>
              <Button
                icon={<Save size={15} color="white" />}
                bgColor="bg-green-600"
                fontColor="text-white"
                text="Cadastrar"
                bgHover="hover:bg-green-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
