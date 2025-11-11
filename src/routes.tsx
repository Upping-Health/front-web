import AddIcon from '@mui/icons-material/Add'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import HistoryIcon from '@mui/icons-material/History'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { JSX } from 'react'
import { Person, Settings } from '@mui/icons-material'
import InventoryIcon from '@mui/icons-material/Inventory'
export const TABS_DASH = {
  FINANCIAL: 'financial',
  //DASH: 'dash',
  USERS: 'users',
  AGENDA: 'agenda',
  PACIENTES: 'pacientes',
  PLANOALIMENTAR: 'planoalimentar',
  FORMS: 'forms',
  SETTINGS: 'settings',
} as const

export type TabKey = keyof typeof TABS_DASH
export type TabValue = (typeof TABS_DASH)[TabKey]

export interface SubTab {
  name: string
  icon: JSX.Element
  path: string
}

export type SubTabRecord = Record<string, SubTab>

export interface Tab {
  name: string
  icon: JSX.Element
  value: TabValue
  path: string
  children?: SubTabRecord
}

export const dashboardTabs: Record<TabValue, Tab> = {
  financial: {
    name: 'Financeiro',
    icon: <AccountBalanceIcon />,
    value: TABS_DASH.FINANCIAL,
    path: '/financial',
  },
  // dash: {
  //   name: 'Dashboard',
  //   icon: <DashboardIcon />,
  //   value: TABS_DASH.DASH,
  //   path: '/dashboard',
  // },
  users: {
    name: 'Usuários',
    icon: <Person />,
    value: TABS_DASH.USERS,
    path: '/users',
  },
  pacientes: {
    name: 'Pacientes',
    icon: <GroupsIcon />,
    value: TABS_DASH.PACIENTES,
    path: '/patients',
  },
  agenda: {
    name: 'Agenda',
    icon: <CalendarMonthIcon />,
    value: TABS_DASH.AGENDA,
    path: '/schedule',
  },
  planoalimentar: {
    name: 'Plano Alimentar',
    icon: <InventoryIcon />,
    value: TABS_DASH.PLANOALIMENTAR,
    path: '/meal-plan',
    children: {
      foods: {
        name: 'Alimentos',
        icon: <RestaurantIcon />,
        path: '/meal-plan/food',
      },
    },
  },
  forms: {
    name: 'Formulários',
    icon: <QuestionAnswerIcon />,
    value: TABS_DASH.FORMS,
    path: '/forms/list',
  },
  settings: {
    name: 'Configurações',
    icon: <Settings />,
    value: TABS_DASH.SETTINGS,
    path: '/settings/general',
  },
}
