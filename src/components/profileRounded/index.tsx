import Patient from '@/interfaces/patient.interface'
import Image from 'next/image'
import imageProfile from '../../assets/images/profile.png'
interface ICardProfile {
  user?: Patient | null
  width?: number
  height?: number
  styles?: any
}

const ProfileRounded = ({ user, width, height, styles }: ICardProfile) => {
  return (
    <div className={`w-10 h-10 ${styles} rounded-full overflow-hidden bg-terciary/20`}>
      <Image
        src={imageProfile}
        alt="Foto de perfil"
        width={width ?? 96}
        height={height ?? 96}
        className="object-cover"
      />
    </div>
  )
}

export default ProfileRounded
