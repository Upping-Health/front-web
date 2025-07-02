import React from 'react'

const Wrapper = ({ children }: any) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-700 rounded-xl shadow-md">
      {children}
    </div>
  )
}

export default Wrapper
