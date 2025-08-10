import { useEffect, useRef, useState } from 'react'

interface UseTimerProps {
  duration: number
  onExpire: () => void
}
const useTimer = ({ duration, onExpire }: UseTimerProps) => {
  const [countdown, setCountdown] = useState(duration)
  const countdownRef = useRef(duration)

  useEffect(() => {
    countdownRef.current = countdown
  }, [countdown])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          onExpire()
          return duration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [onExpire, duration])

  return { countdown }
}

export default useTimer
