'use client'
import { colors } from '@/lib/colors/colors'
import Money from '@/lib/masks/money'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import MovingIcon from '@mui/icons-material/Moving'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
interface CardValuesProps {
  icon: React.ReactElement
  title: string
  value: number
  percent?: number
  isMoney: boolean
  className?: string
}

const CardValues = ({
  icon,
  title,
  value,
  percent,
  className,
  isMoney,
}: CardValuesProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [displayPercent, setDisplayPercent] = useState(0)

  useEffect(() => {
    let currentValue = 0
    const targetValue = value
    const increment = targetValue / 50
    const interval = setInterval(() => {
      currentValue += increment
      if (currentValue >= targetValue) {
        currentValue = targetValue
        clearInterval(interval)
      }
      setDisplayValue(Math.floor(currentValue))
    }, 20)

    return () => clearInterval(interval)
  }, [value])

  useEffect(() => {
    if (percent === undefined) return
    let currentValue = 0
    const targetValue = Math.abs(percent)
    const increment = targetValue / 50
    const interval = setInterval(() => {
      currentValue += increment
      if (currentValue >= targetValue) {
        currentValue = targetValue
        clearInterval(interval)
      }
      setDisplayPercent(currentValue)
    }, 20)

    return () => clearInterval(interval)
  }, [percent])

  const formattedValue = isMoney
    ? Money.centsToMaskMoney(displayValue)
    : displayValue

  const isPositive = percent !== undefined && percent >= 0

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl shadow-md bg-white dark:bg-gray-700 hover:scale-105 transition-transform duration-300`}
    >
      <div className="flex items-center">
        <div
          className={`p-2 rounded-xl flex items-center justify-center ${className}`}
        >
          {React.cloneElement(icon, {
            style: {
              fontSize: 42,
              color: colors.white,
            },
          })}
        </div>

        <div className="ml-2 text-black dark:text-white">
          <p className="text-base font-extralight">{title}</p>
          <motion.p
            className="text-xl font-bold"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.2 }}
          >
            {formattedValue}
          </motion.p>
        </div>
      </div>

      {percent !== undefined && (
        <motion.div
          className={`flex items-center font-medium ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isPositive ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          <span>{displayPercent.toFixed(1)}%</span>
        </motion.div>
      )}
    </div>
  )
}

export default CardValues
