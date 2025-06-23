import Patient from '@/interfaces/patient.interface'
import React from 'react'
import imageProfile from '../../assets/images/profile.png'
import Image from 'next/image'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender';
import { colors } from '@/utils/colors/colors'
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
        <p className="text-black  font-semibold">{user?.name ?? ''}</p>
        <div className="flex items-center">

          <p className='font-extralight  mr-2'>{user?.years ?? 0} anos</p>
          {user?.gender === 'FEMALE' ? 
          
          <FemaleIcon style={{color: '#CC4BC2'}}/> : user?.gender === 'MALE' ? 
          
          <MaleIcon style={{color: '#2E2EFF'}}/>

          : <TransgenderIcon style={{color: colors.black, fontSize: 20}}/>
          }
        </div>
      </div>
    </div>
  )
}

export default CardProfile
