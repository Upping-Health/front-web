import AddIcon from '@mui/icons-material/Add'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GroupsIcon from '@mui/icons-material/Groups'
import HistoryIcon from '@mui/icons-material/History'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import RestaurantIcon from '@mui/icons-material/Restaurant'
export const TABS_DASH = {
  DASH: 'dash',
  AGENDA: 'agenda',
  PACIENTES: 'pacientes',
  CONSULTA: 'consulta',
  PLANOALIMENTAR: 'planoalimentar',
}

export const dashboardTabs = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    value: TABS_DASH.DASH,
    path: '/dashboard',
  },
  {
    name: 'Agenda',
    icon: <CalendarMonthIcon />,
    value: TABS_DASH.AGENDA,
    path: '/dashboard/schedule',
  },
  {
    name: 'Pacientes',
    icon: <GroupsIcon />,
    value: TABS_DASH.PACIENTES,
    path: '/dashboard/patients',
  },
  {
    name: 'Consulta',
    icon: <LocalHospitalIcon />,
    value: TABS_DASH.CONSULTA,
    path: '/dashboard/consult',
    children: [
      {
        name: 'Iniciar',
        icon: <AddIcon />,
        path: '/dashboard/consult/new',
      },
      {
        name: 'Histórico',
        icon: <HistoryIcon />,
        path: '/dashboard/consult/history',
      },
    ],
  },
  {
    name: 'Plano Alimentar',
    icon: <FormatListBulletedIcon />,
    value: TABS_DASH.PLANOALIMENTAR,
    path: '/dashboard/foodplan',
    children: [
      {
        name: 'Alimentos',
        icon: <RestaurantIcon />,
        path: '/dashboard/foodplan/food',
      },
      {
        name: 'Cardápio',
        icon: <MenuBookIcon />,
        path: '/dashboard/foodplan/menu',
      },
    ],
  },
]
