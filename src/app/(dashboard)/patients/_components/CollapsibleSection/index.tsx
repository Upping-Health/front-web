import { useState, ReactNode } from 'react'
import { Collapse, IconButton } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

type CollapsibleSectionProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="shadow-sm rounded-xl p-4 mb-4 bg-white">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="font-semibold text-primary">{title}</h2>

        <IconButton size="small">
          {open ? (
            <ExpandLess className="text-primary" />
          ) : (
            <ExpandMore className="text-primary" />
          )}
        </IconButton>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="mt-2">{children}</div>
      </Collapse>
    </div>
  )
}
