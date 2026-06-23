import dollar from '../../assets/dollar.png';
import increase from '../../assets/increase.png';
import plant from '../../assets/plant.png';
import box from '../../assets/box.png';
import SummaryCard from '../../Components/SummaryCard';
import grafico from '../../assets/grafico.jpg';
export default function DashboardHome() {

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-row justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Olá, "Nome"!</h1>
          <p className="mt-1 text-gray-500">Aqui está o resumo da sua fazenda para hoje, "data".</p>
        </div>
        {/* Canto Direito */}
        <div className="flex flex-row gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none px-6 py-2.5 text-[15px] font-bold rounded-[5px] cursor-pointer transition-colors duration-200">
            Relatórios
          </button>
          <button className="bg-[#1dd05f] hover:bg-[#15a94c] text-white border-none px-6 py-2.5 text-[15px] font-bold rounded-[5px] cursor-pointer transition-colors duration-200">
            + Novo Cadastro
          </button>
        </div>
      </div>

      {/* Resumos */}
     <div className="flex flex-row justify-between gap-4">
        <SummaryCard 
          icon={dollar} 
          altText="Dinheiro" 
          trendText="↓ 2%" 
          trendColor="text-red-500" 
          title="Custo Total da Safra" 
          value="R$ 5.521.531,12" 
        />
        <SummaryCard 
          icon={box} 
          altText="Caixa" 
          trendText="↑ 5%" 
          trendColor="text-green-500" 
          title="Produção Estimada" 
          value="12.450 SC" 
        />
        <SummaryCard 
          icon={increase} 
          altText="Lucro" 
          trendText="↑ 8%" 
          trendColor="text-green-500" 
          title="Lucro Estimado" 
          value="R$ 3.418.569,38" 
        />
        <SummaryCard 
          icon={plant} 
          altText="Planta" 
          trendText="-" 
          trendColor="text-gray-400" 
          title="Área Ativa" 
          value="1.250 ha" 
        />
      </div>

      {/* Gráficos */}
      <div className="flex flex-row gap-4 h-80">
        
        
        <div className="w-2/3 border border-gray-200 bg-white rounded-lg p-5 shadow-sm flex flex-col">
          
          <div className="flex flex-row justify-between items-start gap-2">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Histórico de Produtividade</h3>
              <p className="text-sm text-gray-500 mt-1">Rendimento por cultura em sacas por hectares (sc/ha)</p>
            </div>
            <div className='flex flex-row gap-2 text-sm font-semibold'>
              <span className='text-[#1dd05f] bg-green-50 px-3 py-1.5 rounded-lg cursor-pointer'>Soja</span>
              <span className='text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors'>Milho</span>
            </div>
          </div>
          
          
          <div className="flex-1 min-h-0 mt-4 rounded-md overflow-hidden flex items-center justify-center">
             
            <img src={grafico} alt="Gráfico de Produção" className="w-full h-full object-contain" />
          </div>
          
        </div>

        <div className="w-1/3 border border-gray-200 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-row justify-between gap-2">
            <p>icone</p>
            <p>subida descida</p>
          </div>
          <p>Lucro da Safra</p>
          <p>R$ 5521531312</p>
        </div>
      </div>

      {/* Tabela de Atividades Recentes */}
      <div className="flex flex-row gap-4 h-75">
        <div className="w-1/3 border border-gray-200 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-row justify-between gap-2">
            <p>Clima e Solo pa</p>
            
          </div>
          
          <p>R$ 5521531312</p>
        </div>
        <div className="w-2/3 border border-gray-200 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex flex-row justify-between gap-2">
            <p>icone</p>
            <p>subida descida</p>
          </div>
          <p>Lucro da Safra</p>
          <p>R$ 5521531312</p>
        </div>
      </div>
    </div>
  );
}