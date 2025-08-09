import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import React from 'react'

interface NotfoundProps {
  title: string
  description: string
}

const NotFoundData: React.FC<NotfoundProps> = ({ title, description }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-10">
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 w-20 h-20 flex items-center justify-center rounded-full mb-4">
          <DescriptionOutlinedIcon className="text-black" fontSize="large" />
        </div>
        <p className="text-black dark:text-white text-3xl text-center">
          {title}
        </p>
        <p className="text-center pt-4 max-w-xs text-gray-600 dark:text-white font-extralight">
          {description}
        </p>
      </div>
    </div>
  )
}

export default NotFoundData
