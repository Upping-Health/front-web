import imageProfile from '@/assets/images/profile.png'
import Patient from '@/interfaces/patient.interface'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender'
import Image from 'next/image'
interface ICardProfile {
  user?: Patient | null
}

const CardProfile = ({ user }: ICardProfile) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/20 mr-2">
        <Image
          src={imageProfile}
          alt="Foto de perfil"
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-black dark:text-white  font-semibold">
          {user?.name ?? ''}
        </p>
        <div className="flex items-center">
          <p className="font-extralight dark:text-white  mr-2">
            {user?.age ?? 0} anos
          </p>
          {user?.gender === 'female' ? (
            <FemaleIcon className="dark:text-white" />
          ) : user?.gender === 'male' ? (
            <MaleIcon className="dark:text-white" />
          ) : (
            <TransgenderIcon className="dark:text-white" />
          )}
        </div>
      </div>
    </div>
  )
}

export default CardProfile
