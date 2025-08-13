import { useState } from 'react'

interface RangeWithTooltipProps {
  id: string
  min: number
  max: number
  step?: number
  value: number
  tooltipText: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RangeStyled = ({
  id,
  min,
  max,
  step = 1,
  value,
  onChange,
  tooltipText,
}: RangeWithTooltipProps) => {
  const rawPercent = ((value - min) / (max - min)) * 100
  const clampedPercent = Math.min(Math.max(rawPercent, 5), 95)

  return (
    <div className="relative w-full">
      <div
        className="absolute -top-7 transform -translate-x-1/2 text-white text-sm font-medium px-3 py-1 rounded-lg bg-primary shadow-md whitespace-nowrap"
        style={{ left: `${clampedPercent}%` }}
      >
        {tooltipText}

        <div
          className="
      absolute left-1/2 transform -translate-x-1/2 top-full
      w-0 h-0
      [border-left:6px_solid_transparent]
      [border-right:6px_solid_transparent]
      [border-top:6px_solid_#4b8690]
    "
        />
      </div>

      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="range-input w-full"
      />
    </div>
  )
}
