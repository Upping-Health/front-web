import React from 'react'

const Wrapper = ({children}: any) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">

      {children}

    </div>
  )
}

export default Wrapper