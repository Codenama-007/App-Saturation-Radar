"use client"

interface ProgressRingProps {
    label: string
    description: string
    value: number
    size?: "sm" | "lg"
    verdict?: string
}

const ProgressRing = ({
    label,
    description,
    value,
    size = "sm",
    verdict,
}: ProgressRingProps) => {
    const radius = size === "lg" ? 50 : 34
    const viewBox = size === "lg" ? "0 0 120 120" : "0 0 80 80"
    const center = size === "lg" ? 60 : 40
    const strokeWidth = size === "lg" ? 8 : 6
    const dimension = size === "lg" ? "h-36 w-36" : "h-24 w-24"
    const valueSize = size === "lg" ? "text-3xl" : "text-lg"

    const circumference = 2 * Math.PI * radius
    const progress = Math.min(Math.max(value, 0), 100)
    const offset = circumference - (progress / 100) * circumference

    return (
        <div className="flex flex-col items-center text-center">
            <div className="mb-2">
                <p className="text-sm font-medium text-[#f0f6fc]">
                    {label}
                </p>

                <p className="mt-1 max-w-[150px] text-[11px] leading-relaxed text-[#8b949e]">
                    {description}
                </p>
            </div>

            <div className={`relative ${dimension}`}>
                <svg
                    className="h-full w-full -rotate-90"
                    viewBox={viewBox}
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#30363d"
                        strokeWidth={strokeWidth}
                    />

                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#B8F500"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`${valueSize} font-semibold text-[#f0f6fc]`}>
                        {value.toFixed(1)}
                    </span>

                    <span className="text-[9px] text-[#8b949e]">
                        /100
                    </span>
                </div>
            </div>

            {verdict && (
                <p className="mt-3 text-sm font-semibold text-[#B8F500]">
                    {verdict}
                </p>
            )}
        </div>
    )
}

export default ProgressRing