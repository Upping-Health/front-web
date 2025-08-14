import React from 'react'

const Wrapper = ({ children }: any) => {
  return (
    <div className="p-4  bg-white h-full dark:bg-gray-800 rounded-xl shadow-md flex flex-row gap-4">
      {children}
    </div>
  )
}

export default Wrapper
