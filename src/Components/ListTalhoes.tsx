import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

type TalhaoUI = {
  id: number;
  nome?: string;
  cultura: string;
  area: number;
  produtividade?: number;
  custoHa?: number | null;
  status?: string;
  tipoCultura: string;
  idade: number;
  volumeEstimado: number;
  idFazenda: number;
};


const getCulturaStyle = (cultura: string) => {
  switch (cultura) {
    case 'Milho':
      return 'bg-yellow-100 text-yellow-700';
    case 'Algodão':
      return 'bg-blue-100 text-blue-700';
    case 'Soja':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Plantio':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Colheita':
      return 'bg-orange-50 text-orange-600 border-orange-200';
    case 'Desenvolvimento':
      return 'bg-green-50 text-green-600 border-green-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

function normalizeTalhao(raw: any, fallbackIndex: number): TalhaoUI {
  // Caso 1: API retorna objetos já nomeados
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const id = typeof raw.id === 'number' ? raw.id : fallbackIndex;

    // backend atual retorna: { id, area, tipoCultura, idade, volumeEstimado, idFazenda }
      const tipoCultura = raw.tipoCultura ?? raw.cultura ?? '';
      const cultura = tipoCultura || 'Cultura';

    return {
      id,
      nome: raw.nome,
      cultura,
      area: Number(raw.area ?? 0),
      produtividade: raw.produtividade ? Number(raw.produtividade) : undefined,
      custoHa: raw.custoHa ?? (raw.valor !== undefined ? Number(raw.valor) : null),
      status: raw.status,
      tipoCultura,
      idade: Number(raw.idade ?? 0),
      volumeEstimado: Number(raw.volumeEstimado ?? 0),
      idFazenda: Number(raw.idFazenda ?? 0),
    };
  }


  // Caso 2: API retorna tuplas via fetchall()
  // Não sabemos a ordem exata aqui, então tentamos mapear por posição usando o schema do model.
  // Modelo Talhao (Pydantic) não tem id; mas no SELECT * FROM Talhao normalmente vem id primeiro.
  if (Array.isArray(raw)) {
    const [idMaybe, areaMaybe, tipoCulturaMaybe, idadeMaybe, volumeMaybe, idFazendaMaybe] = raw;
    const id = typeof idMaybe === 'number' ? idMaybe : fallbackIndex;

    return {
      id,
      cultura: String(tipoCulturaMaybe ?? 'Cultura'),
      area: Number(areaMaybe ?? 0),
      produtividade: undefined,
      custoHa: null,
      status: undefined,
      tipoCultura: String(tipoCulturaMaybe ?? ''),
      idade: Number(idadeMaybe ?? 0),
      volumeEstimado: Number(volumeMaybe ?? 0),
      idFazenda: Number(idFazendaMaybe ?? 0),
    };
  }

  // Caso 3: fallback total
  return {
    id: fallbackIndex,
    cultura: 'Cultura',
    area: 0,
    tipoCultura: '',
    idade: 0,
    volumeEstimado: 0,
    idFazenda: 0,
  };
}

export default function ListaTalhoes() {
  const navigate = useNavigate();
  const [talhoes, setTalhoes] = useState<TalhaoUI[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let mounted = true;

    async function buscarTalhoes() {
      try {
        setLoading(true);
        const response = await api.get('/talhoes/');
        const data = response.data;

        const normalized: TalhaoUI[] = Array.isArray(data)
          ? data.map((raw: any, idx: number) => normalizeTalhao(raw, idx + 1))
          : [];

        if (mounted) setTalhoes(normalized);
      } catch (e) {
        console.error('Erro ao buscar talhões:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    buscarTalhoes();

    return () => {
      mounted = false;
    };
  }, []);

  const rows = useMemo(() => {
    return talhoes.map((t) => {
      const cultura = t.cultura || t.tipoCultura || 'Cultura';
      return {
        ...t,
        cultura,
        status: t.status ?? '—',
        custoHa: typeof t.custoHa === 'number' ? t.custoHa : null,
      };
    });
  }, [talhoes]);


  return (
    <div className="w-full mx-auto bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden text-sm">
      <div className="flex flex-col">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Carregando talhões...</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum talhão cadastrado.</div>
        ) : (
          rows.map((talhao, index) => (
            <div
              key={talhao.id}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== rows.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex flex-col w-40">
                <span className="font-semibold text-gray-800">
                  {talhao.nome ?? `Talhão #${talhao.id}`}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">ID: {talhao.id}</span>
              </div>

              <div className="w-24">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getCulturaStyle(
                    talhao.cultura,
                  )}`}
                >
                  {talhao.cultura}
                </span>
              </div>

              <div className="w-20 text-gray-500">
                {Number(talhao.area).toLocaleString('pt-BR')} ha
              </div>

              <div className="w-24 text-gray-500">
                <span className="font-bold text-gray-800">
                  {talhao.tipoCultura || talhao.cultura}
                </span>{' '}
                sc/ha
              </div>



              <div className="w-32 font-medium text-gray-600">
                {typeof talhao.custoHa === 'number' ? formatarMoeda(talhao.custoHa) : '—'}
              </div>

              <div className="w-32">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                    talhao.status ?? '',
                  )}`}
                >
                  {talhao.status}
                </span>
              </div>


              <div className="flex items-center gap-3 text-gray-400">
                <button
                  className="hover:text-gray-700 transition-colors"
                  title="Visualizar"
                  onClick={() => navigate(`/dashboard/CadTalhoes`)}
                >
                  <Eye size={18} />
                </button>

                <button
                  className="hover:text-blue-600 transition-colors"
                  title="Editar"
                  onClick={() => {
                    navigate(`/dashboard/CadTalhoes`, { state: { id: talhao.id } });
                  }}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="hover:text-red-600 transition-colors"
                  title="Excluir"
                  onClick={async () => {
                    if (!window.confirm('Confirmar exclusão do talhão?')) return;
                    try {
                      await api.delete(`/talhoes/${talhao.id}/`);
                      // atualiza lista após exclusão
                      setTalhoes((prev) => prev.filter((x) => x.id !== talhao.id));
                    } catch (e) {
                      console.error('Erro ao deletar talhão:', e);
                      alert('Erro ao deletar talhão.');
                    }
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

