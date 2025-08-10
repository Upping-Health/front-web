import { useEffect, useRef, useState, useCallback } from 'react'

interface UseTimerProps {
  duration: number
  onExpire: () => void
}

const useTimer = ({ duration, onExpire }: UseTimerProps) => {
  const [countdown, setCountdown] = useState(duration)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startTimer = useCallback(() => {
    clear()
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          onExpire()
          return duration
        }
        return prev - 1
      })
    }, 1000)
  }, [duration, onExpire])

  const resetTimer = useCallback(() => {
    setCountdown(duration)
    startTimer()
  }, [duration, startTimer])

  useEffect(() => {
    startTimer()
    return clear
  }, [startTimer])

  return { countdown, resetTimer }
}

export default useTimer
