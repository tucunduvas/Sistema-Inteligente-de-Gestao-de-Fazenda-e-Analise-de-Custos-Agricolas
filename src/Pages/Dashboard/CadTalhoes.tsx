import Button from "../../Components/componentsCadTalhoes/Button";
import SectionCard from "../../Components/SectionCard";
import { Leaf, Calendar, Droplet, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getErrorMessage } from "./utils/validateApi";

type TalhaoForm = {
  id: number;
  area: number | "";
  tipoCultura: string;
  idade: number | "";
  volumeEstimado: number | "";
  idFazenda: number | "";
};

export default function CadTalhoes() {
  const [culturasOptions, setCulturasOptions] = useState<any[]>([]);

  const [formData, setFormData] = useState<TalhaoForm>({
    id: 0,
    area: "",
    tipoCultura: "",
    idade: "",
    volumeEstimado: "",
    idFazenda: "",
  });

  async function salvarTalhao() {
    try {
      const idFazendaNum = formData.idFazenda === "" ? NaN : Number(formData.idFazenda);
      if (!Number.isFinite(idFazendaNum) || idFazendaNum <= 0) {
        alert("Informe um idFazenda válido (existente no cadastro de Fazendas).");
        return;
      }

      const payload = {
        area: Number(formData.area),
        tipoCultura: formData.tipoCultura,
        idade: Number(formData.idade),
        volumeEstimado: Number(formData.volumeEstimado),
        idFazenda: idFazendaNum,
      };

      if (!Number.isFinite(payload.area) || payload.area <= 0) {
        alert("Informe uma Área (Hectares) válida (> 0)." );
        return;
      }
      if (!Number.isFinite(payload.idade) || payload.idade <= 0) {
        alert("Informe uma Idade válida (> 0)." );
        return;
      }
      if (!Number.isFinite(payload.volumeEstimado) || payload.volumeEstimado <= 0) {
        alert("Informe um Volume Estimado válido (> 0)." );
        return;
      }
      if (!payload.tipoCultura) {
        alert("Selecione o Tipo de Cultura." );
        return;
      }

      const response = await api.post("/talhoes/", payload);
      console.log("Talhão cadastrado!:", response.data, payload);
      alert("Talhão salvo com sucesso!");
      await buscarTalhoes();
    } catch (error) {
      console.error(error);
      alert(getErrorMessage(error));
    }
  }


  async function buscarTalhoes() {
    try {
      const response = await api.get("/talhoes/");
      console.log("Talhões encontrados:", response.data);
    } catch (error) {
      console.error(error);
    }
  }


  async function atualizarTalhao() {
    try {
      const payload = {
        area: Number(formData.area),
        tipoCultura: formData.tipoCultura,
        idade: Number(formData.idade),
        volumeEstimado: Number(formData.volumeEstimado),
        idFazenda: Number(formData.idFazenda),
      };

      const response = await api.put(`/talhoes/${formData.id}/`, payload);
      console.log("Talhão atualizado!", response.data, payload);
      alert("Talhão atualizado com sucesso!");
      await buscarTalhoes();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar!");
    }
  }

  async function deletarTalhao(id: number) {
    try {
      await api.delete(`/talhoes/${id}/`);
      console.log("Talhão deletado!", id);
      alert("Talhão deletado com sucesso!");
      await buscarTalhoes();
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar!");
    }
  }

  async function buscarCulturas() {
    try {
      const response = await api.get('/culturas/');
      setCulturasOptions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar culturas:', error);
    }
  }


  useEffect(() => {
    buscarTalhoes();
    buscarCulturas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev };

      if (name === "area") next.area = value === "" ? "" : Number(value);
      else if (name === "idade") next.idade = value === "" ? "" : Number(value);
      else if (name === "volumeEstimado")
        next.volumeEstimado = value === "" ? "" : Number(value);
      else if (name === "idFazenda") next.idFazenda = value === "" ? "" : Number(value);
      else if (name === "tipoCultura") next.tipoCultura = value;
      else if (name === "id") next.id = value === "" ? 0 : Number(value);

      return next;

    });
  }

  return (
    <div className="min-h-screen px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="rounded-2xl p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-12">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">
                Novo Cadastro de Talhão
              </h1>
              <p className="max-w-1xl text-gray-600">
                Preencha os campos para cadastrar/atualizar o talhão.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <SectionCard
              bgIcon="bg-green-100"
              icon={<Leaf size={22} className="text-green-600" />}
              title="Informações Gerais"
              subtitle="Dados básicos do talhão."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Área (Hectares)
                  </label>
                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ID da Fazenda
                  </label>
                  <input
                    name="idFazenda"
                    value={formData.idFazenda}
                    onChange={handleChange}
                    type="number"
                    placeholder="Ex: 1"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              bgIcon="bg-blue-100"
              icon={<Calendar size={22} className="text-blue-600" />}
              title="Planejamento de Safra"
              subtitle="Cultura e parâmetros do talhão."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tipo de Cultura
                  </label>

                  <select
                    name="tipoCultura"
                    value={formData.tipoCultura}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Selecione a cultura</option>
                    {culturasOptions.map((c) => (
                      <option key={c.id ?? c.nome ?? c.tipo} value={c.nome ?? c.tipo}>
                        {c.nome ?? c.tipo}
                      </option>
                    ))}
                  </select>
                </div>



                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Idade
                  </label>
                  <input
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    type="number"
                    placeholder="Ex: 45"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              bgIcon="bg-yellow-100"
              icon={<Droplet size={22} className="text-yellow-600" />}
              title="Volume Estimado"
              subtitle="Informação utilizada no cálculo/gestão."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Volume Estimado
                  </label>
                  <input
                    name="volumeEstimado"
                    value={formData.volumeEstimado}
                    onChange={handleChange}
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ID do Talhão (para Atualizar/Excluir)
                  </label>
                  <input
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    type="number"
                    placeholder="Ex: 1"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="mt-12 flex justify-end gap-2.5">
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

