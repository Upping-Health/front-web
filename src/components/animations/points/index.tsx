import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import Animation from '../../../assets/animations/T10TFRGb5s.json'

const PointsAnimation = () => {
  return (
    <Player 
      autoplay
      loop
      src={Animation}
      style={{ height: '300px', width: '300px' }}

    />
  )
}

export default PointsAnimation