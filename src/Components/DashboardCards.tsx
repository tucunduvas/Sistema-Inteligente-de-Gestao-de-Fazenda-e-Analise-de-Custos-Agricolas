import React from 'react';
import { TrendingUp, Map, ChevronRight } from 'lucide-react';

export default function DashboardCards() {
  return (

    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      
      <div className="bg-white rounded-xl p-6 shadow-sm  flex flex-col">
        

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Distribuição de Culturas</h2>
          <p className="text-sm text-gray-500 mt-1">Percentual de área ocupada por tipo de plantio nesta safra.</p>
        </div>


        <div className="flex flex-col gap-5">
          

          <div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-gray-800">Soja</span>
              <span className="font-medium text-gray-800">42%</span>
            </div>
            {/* Fundo da barra */}
            <div className="w-full bg-gray-100 rounded-full h-2">
              {/* Preenchimento da barra (Width dinâmico no style) */}
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

          {/* Item 2: Algodão */}
          <div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-gray-800">Algodão</span>
              <span className="font-medium text-gray-800">34%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className=" h-2 rounded-full" style={{ width: '34%' }}></div>
            </div>
          </div>

          {/* Item 3: Milho */}
          <div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-gray-800">Milho</span>
              <span className="font-medium text-gray-800">24%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-orange-400 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>

        </div>
      </div>


      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col">
        

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Alertas Recentes</h2>
          <p className="text-sm text-gray-500 mt-1">Eventos que requerem atenção nos seus talhões.</p>
        </div>


        <div className="flex flex-col gap-4 flex-1">
          

          <div className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-white items-start">
            <div className="mt-0.5 text-gray-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Aumento de Custos</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                O custo médio por hectare no Talhão Sul 04 subiu 12% devido a insumos.
              </p>
            </div>
          </div>


          <div className="flex gap-4 p-4 border border-green-200 rounded-xl bg-green-50 items-start">
            <div className="bg-emerald-500 p-1.5 rounded-lg text-white mt-0.5">
              <Map size={18} />
            </div>
            <div>

              <h3 className="font-semibold text-green-900 text-sm">Colheita Iniciada</h3>
              <p className="text-sm text-green-800/80 mt-1 leading-relaxed">
                Várzea Central atingiu maturação. Colheita foi disparada hoje.
              </p>
            </div>
          </div>

        </div>


        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-1 text-sm font-semibold text-emerald-500 hover:text-emerald-600 transition-colors">
            Ver todos os alertas
            <ChevronRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
}