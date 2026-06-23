import type { ReactNode } from "react"

interface ButtonProps{
    icon: ReactNode,
    bgColor: string,
    fontColor: string,
    text: string,
    bgHover: string, 
    onClick?: () => void
}

export default function Button({icon, bgColor, fontColor, text, bgHover, onClick}: ButtonProps){
    return(
        <button onClick={onClick} className={`${bgColor} flex flex-rol gap-1 p-2 items-center justify-center rounded-md shadow cursor-pointer transition-colors hover:${bgHover}`}>
            {icon}
            <p className={`${fontColor}`}>{text}</p>
        </button>
    )
}