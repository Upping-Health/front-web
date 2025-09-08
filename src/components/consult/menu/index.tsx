import StraightenIcon from '@mui/icons-material/Straighten'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import Link from 'next/link'
import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { usePathname } from 'next/navigation'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import FolderIcon from '@mui/icons-material/Folder'
export const consultTabs = {
  antropometrias: {
    name: 'Antropometria',
    icon: <StraightenIcon />,
    path: 'anthropometry',
  },
  calculos: {
    name: 'Cálculo Energético',
    icon: <FlashOnIcon />,
    path: 'energyCalculation',
  },
  anamnesis: {
    name: 'Anamnese',
    icon: <AssignmentIcon />,
    path: 'anamnesis',
  },
  documents: {
    name: 'Documentos',
    icon: <FolderIcon />,
    path: 'documents',
  },
}

const MenuConsult = ({ patientId }: { patientId: string }) => {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col bg-white dark:bg-gray-800 h-full w-56  rounded-xl p-2 gap-2 shadow-sm">
      {Object.entries(consultTabs).map(([key, tab]) => {
        const path = `/patients/${patientId}/${tab.path}`
        const isActive = pathname === path
        return (
          <Link
            key={key}
            href={tab.path}
            className={`
                group flex items-center gap-3 px-3 py-2 rounded-md
                transition-colors duration-200
                ${isActive ? 'bg-primary text-white dark:text-white' : 'text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
          >
            {React.cloneElement(tab.icon, {
              className: `
                  text-[20px]
                  ${isActive ? 'text-white dark:text-white' : 'text-black dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white'}
                `,
            })}
            <span className="text-sm font-medium">{tab.name}</span>
          </Link>
        )
      })}
    </aside>
  )
}

export default MenuConsult
