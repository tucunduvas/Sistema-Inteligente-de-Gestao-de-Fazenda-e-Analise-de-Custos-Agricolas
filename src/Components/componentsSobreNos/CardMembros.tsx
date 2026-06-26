import { LuGithub, LuLinkedin } from 'react-icons/lu';

interface MemberCardProps {
  image: string;
  name: string;
  role: string;
  description: string;
}

export const CardMembros = ({ image, name, role, description }: MemberCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-24 h-24 overflow-hidden mb-4 ">
        <img src={image} alt={name} className="w-35 h-35 object-contain" />
      </div>

      <h3 className="text-lg font-bold text-gray-900">{name} </h3>
      <p className="text-sm font-medium text-green-600 mb-4">{role}</p>

      <p className="text-black-500 text-xs mb-4 text-justify">
        {description} 
      </p>

      <div className="flex gap-4 text-gray-400">
        <a href="#" className="hover:text-gray-600 transition-colors"><LuGithub size={18} /></a>
        <a href="#" className="hover:text-gray-600 transition-colors"><LuLinkedin size={18} /></a>
      </div>
    </div>
  );
};