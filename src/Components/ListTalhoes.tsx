import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export interface Talhao {
  id: string;
  nome: string;
  cultura: string;
  area: number;
  produtividade: number;
  valor: number;
  status: string;
}

interface ListaTalhoesProps {
  talhoes: Talhao[];
}

// Funções auxiliares
const getCulturaStyle = (cultura: string) => {
  switch (cultura) {
    case 'Milho': return 'bg-yellow-100 text-yellow-700';
    case 'Algodão': return 'bg-blue-100 text-blue-700';
    case 'Soja': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Plantio': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'Colheita': return 'bg-orange-50 text-orange-600 border-orange-200';
    case 'Desenvolvimento': return 'bg-green-50 text-green-600 border-green-200';
    default: return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export default function ListaTalhoes({ talhoes }: ListaTalhoesProps) {
  if (talhoes.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        Nenhum talhão encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {talhoes.map((talhao, index) => (
        <div
          key={talhao.id}
          className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
            index !== talhoes.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div className="flex flex-col w-40">
            <span className="font-semibold text-gray-800">{talhao.nome}</span>
            <span className="text-xs text-gray-400 mt-0.5">ID: {talhao.id}</span>
          </div>

          <div className="w-24">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCulturaStyle(talhao.cultura)}`}>
              {talhao.cultura}
            </span>
          </div>

          <div className="w-20 text-gray-500">
            {talhao.area.toLocaleString('pt-BR')} ha
          </div>

          <div className="w-24 text-gray-500">
            <span className="font-bold text-gray-800">{talhao.produtividade}</span> sc/ha
          </div>

          <div className="w-32 font-medium text-gray-600">
            {formatarMoeda(talhao.valor)}
          </div>

          <div className="w-32">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(talhao.status)}`}>
              {talhao.status}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-gray-700 transition-colors" title="Visualizar">
              <Eye size={18} />
            </button>
            <button className="hover:text-blue-600 transition-colors" title="Editar">
              <Pencil size={18} />
            </button>
            <button className="hover:text-red-600 transition-colors" title="Excluir">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}