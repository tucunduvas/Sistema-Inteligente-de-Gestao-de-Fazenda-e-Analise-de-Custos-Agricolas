import type { ReactNode } from "react"

interface PanelProps {
    bgColor: string,
    title: string,
    icon: ReactNode,
    value: string,
    subtitle: string
}

export default function Panel({ bgColor, title, icon, value, subtitle }: PanelProps) {
    return (
        // Removi: w-[45%], h-37.5 e m-4.
        // Adicionei: w-full e h-full. Agora ele se adapta!
        <div className={`w-full h-full ${bgColor} flex flex-col rounded-xl shadow-sm p-5`}>
            
            <div className="flex flex-row justify-between items-start">
                <p className="text-sm md:text-base text-gray-500 font-semibold pr-2">
                    {title}
                </p>
                <div className="shrink-0">{icon}</div>
            </div>
            
            {/* O mt-auto empurra o texto pra baixo caso um título seja maior que o outro */}
            <div className="mt-auto pt-4">
                <h1 className="font-bold text-2xl md:text-3xl">{value}</h1>
                <p className="font-medium text-xs md:text-sm text-gray-400 mt-1">{subtitle}</p>
            </div>

        </div>
    )
}