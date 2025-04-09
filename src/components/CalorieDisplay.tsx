import { useMemo } from "react"

type CalorieDisplayProps = {
    calories: number
    text: string
}
export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    const isEmpty = useMemo(() => calories === 0, [calories])
    return (
        <>
            {
                isEmpty ? (
                    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                        {`No registra ${text}`}
                    </p>
                ) : (
                    <>
                        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                            <span className="font-black text-6xl text-orange">{calories}</span>
                            {text}
                        </p>
                    </>
                )
            }

        </>
    )
}
