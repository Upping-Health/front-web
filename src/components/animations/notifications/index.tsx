import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import Animation from '../../../assets/animations/notifications.json'

const NotificationAnimation = () => {
  return (
    <Player 
      autoplay
      loop
      src={Animation}
      style={{ height: '50px', width: '50px' }}

    />
  )
}

export default NotificationAnimation