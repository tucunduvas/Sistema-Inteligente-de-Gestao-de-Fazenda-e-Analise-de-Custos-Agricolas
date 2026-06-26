import type { ReactNode } from "react"

interface ButtonProps{
    icon: ReactNode,
    bgColor: string,
    fontColor: string,
    text: string,
    bgHover: string
}

export default function Button({icon, bgColor, fontColor, text, bgHover}: ButtonProps){
    return(
        <button className={`${bgColor} flex flex-row gap-1 p-2 items-center justify-center rounded-md shadow cursor-pointer transition-colors hover:${bgHover}`}>
            {icon}
            <p className={`${fontColor}`}>{text}</p>
        </button>
    )
}