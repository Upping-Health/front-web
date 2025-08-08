import React, { useMemo } from 'react'
import { CollapsibleSection } from '../CollapsibleSection'

type AnalysisResult = {
  title: string
  value?: string | number
}

type AnalysesResultsProps = {
  title: string
  data: AnalysisResult[]
}

export default function AnalysesResults({ title, data }: AnalysesResultsProps) {
  console.log(title)
  return (
    <CollapsibleSection title={title}>
      {data?.map(({ title, value }, index) => (
        <div
          key={index}
          className={`flex justify-between px-2 py-2 ${
            index % 2 === 0 ? 'bg-zinc-100' : 'bg-white'
          } ${index === 0 ? 'rounded-t-lg' : ''} ${
            index === data.length - 1 ? 'rounded-b-lg' : ''
          }`}
        >
          <span className="text-sm italic">{title ?? 'N/A'}</span>
          <span className="font-bold text-black text-sm italic">
            {value ?? 'N/A'}
          </span>
        </div>
      ))}
    </CollapsibleSection>
  )
}
