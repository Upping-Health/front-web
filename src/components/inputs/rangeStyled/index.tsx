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
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-full">
      <div
        className="absolute -top-5 transform -translate-x-1/2 text-white text-sm px-2 rounded bg-primary whitespace-nowrap"
        style={{ left: `${percent}%` }}
      >
        {tooltipText}
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
