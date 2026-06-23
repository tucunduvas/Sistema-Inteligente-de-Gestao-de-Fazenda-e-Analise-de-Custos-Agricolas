import type { ReactNode } from "react"

interface sectionCardProps{
    bgIcon: string,
    icon: ReactNode
    title: string,
    subtitle: string,
    children: ReactNode
}

export default function SectionCard({bgIcon, icon, title, subtitle, children}: sectionCardProps){
    return(
        <div className="h-[30%] bg-white m-1 p-6 border-gray-200 border shadow-sm text-left w-full rounded-xl border-b">
            <div className="p-3 flex-row flex items-center border-b border-gray-200 pb-4 mb-4">
                <div className={`p-1 ${bgIcon} w-10 h-10 items-center justify-center rounded-xl flex mr-4`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-semibold">{title}</p>
                    <p className="mt-1 text-gray-600">{subtitle}</p>
                </div>
            </div>
            <div>
                {children} 
                {/* aqui coloca quando chamar o componente, pra deixar os inputs dinamicos*/}
            </div>
        </div>
    )
}