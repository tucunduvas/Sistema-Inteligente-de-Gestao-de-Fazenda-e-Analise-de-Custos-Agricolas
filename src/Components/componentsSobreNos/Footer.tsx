
import { LuGithub, LuUsers, LuSprout } from 'react-icons/lu';

export const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
      
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center text-white">
                <LuSprout color="white" />
              </div>
              <span className="text-2xl font-bold text-[#22C55E]">SIGFaz</span>
            </div>
            <p className="text-black-500 text-sm leading-relaxed">
              Transformando a gestão agrícola com tecnologia inteligente e dados integrados. 
            </p>
          </div>

          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Plataforma</h4>
            <ul className="space-y-4 text-sm text-black-500">
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors">Funcionalidades </li>
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors">Preços </li>
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors">Segurança </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Institucional</h4>
            <ul className="space-y-4 text-sm text-black-500">
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors">Sobre o Projeto </li>
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors flex items-center gap-1">
                IFMS <span className="text-[10px] scale-75">↗</span> 
              </li>
              <li className="hover:text-[#22C55E] cursor-pointer transition-colors">Termos de Uso </li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Social</h4>
            <div className="flex gap-6 text-black-400">
              <a href="#" className="hover:text-gray-900 transition-colors"><LuGithub size={22} /></a>
              <a href="#" className="hover:text-gray-900 transition-colors"><LuUsers size={22} /></a>
            </div>
          </div>
        </div>

        <div className="pt-20 text-center">
          <p className="text-black-400 text-xs font-medium">
            © 2026 SIGFaz. Todos os direitos reservados. Projeto Acadêmico IFMS. 
          </p>
        </div>
      </div>
    </footer>
  );
};