import Patient from '@/interfaces/patient.interface'
import Image from 'next/image'
import imageProfile from '../../assets/images/profile.png'

interface ICardProfile {
  user?: Patient | null
  width?: number
  height?: number
  styles?: string
}

const ProfileRounded = ({ user, width, height, styles }: ICardProfile) => {
  const initials = user?.name
    ?.split(' ')
    .map((word: string) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={`w-10 h-10 rounded-full bg-black flex items-center justify-center font-medium text-white dark:bg-gray dark:text-black overflow-hidden ${styles ?? ''}`}
    >
      {user?.photo ? (
        <Image
          src={user.photo}
          alt="Foto de perfil"
          width={width ?? 96}
          height={height ?? 96}
          className="w-full h-full object-contain rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export default ProfileRounded
