
interface TechCardProps {
  Icon: React.ComponentType<{ size: number }>;
  category: string;
  title: string;
  description: string;
}
export const TechCard = ({ Icon, category, title, description }: TechCardProps) => {
  return (
    <div className="p-8 border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {/* Ícone dinâmico */}
        <div className="p-2 bg-green-50 rounded-lg text-green-600">
          <Icon size={24} />
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold text-black-400 border border-gray-200 px-2 py-0.5 rounded-full">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed text-left">
        {description}
      </p>
    </div>
  );
};