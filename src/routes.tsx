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
import { JSX } from 'react'
import { Person } from '@mui/icons-material'

export const TABS_DASH = {
  DASH: 'dash',
  AGENDA: 'agenda',
  PACIENTES: 'pacientes',
  CONSULTA: 'consulta',
  PLANOALIMENTAR: 'planoalimentar',
  FORMS: 'forms',
  REGISTER: 'registers',
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
  dash: {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    value: TABS_DASH.DASH,
    path: '/dashboard',
  },
  registers: {
    name: 'Usuários',
    icon: <Person />,
    value: TABS_DASH.DASH,
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
  consulta: {
    name: 'Consulta',
    icon: <LocalHospitalIcon />,
    value: TABS_DASH.CONSULTA,
    path: '/consult/teste',
    // children: {
    //   new: {
    //     name: 'Iniciar',
    //     icon: <AddIcon />,
    //     path: '/consult/new',
    //   },
    //   history: {
    //     name: 'Histórico',
    //     icon: <HistoryIcon />,
    //     path: '/consult/history',
    //   },
    // },
  },
  planoalimentar: {
    name: 'Alimentos',
    icon: <RestaurantIcon />,
    value: TABS_DASH.PLANOALIMENTAR,
    path: '/food',
  },
  forms: {
    name: 'Formulários',
    icon: <QuestionAnswerIcon />,
    value: TABS_DASH.FORMS,
    path: '/forms/list',
  },
}

export const PATH_NAMES_PT_BR: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/schedule': 'Agenda',
  '/patients': 'Pacientes',
  '/consult': 'Consulta',
  '/consult/new': 'Iniciar Consulta',
  '/consult/history': 'Histórico',
  '/food': 'Alimentos',
  '/forms/list': 'Formulários',
}
