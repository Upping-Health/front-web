import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
export const TABS_DASH = {
  DASH: 'dash',
  AGENDA: 'agenda',
  PACIENTES: 'pacientes',
  CONFIG: 'Configurações'
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
    value: TABS_DASH.CONFIG,
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
]
