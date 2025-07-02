import User from '@/interfaces/user.interface'
import FeedBackStatusInterface from './feedbackStatus'

export default interface DefaultContextInterface {
  user: User | null
  setuser: (e: User | null) => void
  onShowFeedBack: (data: FeedBackStatusInterface) => void
  themeDark: boolean
  toggleTheme: () => void
  loadingGlobal: boolean
  setloadingGlobal: (e: boolean) => void
  setLabelLoading: (e: string | null) => void
  onLogout: () => void
}
