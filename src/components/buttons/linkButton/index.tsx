import { ReactNode } from 'react'
import Link from 'next/link'

interface HeaderLinkProps {
  href: string
  children: ReactNode
}

export const LinkButton = ({ href, children }: HeaderLinkProps) => {
  return (
    <Link
      href={href}
      className="
        relative flex gap-2 p-2 border rounded-6
        dark:bg-gray-700 dark:border-slate-600
        items-center justify-center
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors
      "
    >
      {children}
    </Link>
  )
}
