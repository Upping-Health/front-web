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
    <div className="shadow-sm rounded-xl p-4 bg-white dark:bg-gray-800">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="font-semibold text-primary dark:text-white">{title}</h2>

        <IconButton size="small">
          {open ? (
            <ExpandLess className="text-primary dark:text-white" />
          ) : (
            <ExpandMore className="text-primary dark:text-white" />
          )}
        </IconButton>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {open && children ? <div className="mt-2">{children}</div> : null}
      </Collapse>
    </div>
  )
}
