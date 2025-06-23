
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface ISelectStyled {
  id: string
  label?: string
  icon: React.ReactElement
  placeholder?: string,
  value?: any
  onChange?: (value: any) => void,
  styles?: string,
  options?: any
}
const SelectStyled = ({ label, icon, value, onChange, id, styles, options }: ISelectStyled) => {
 
 
  const optionsSex = [
    { value: 'MALE', text: 'Masculino' },
    { value: 'FEMALE', text: 'Feminino' },
    { value: 'OTHER', text: 'Outros' },
  ]

  return (
    <div className='flex flex-col '>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`${styles} border border-gray border-solid outline-none rounded-xl p-2 flex items-center justify-between`}>
        <div className='flex items-center w-full relative'>
          {icon}
          <select name={id} value={value} onChange={onChange} className=" w-full text-black font-semibold appearance-none outline-none bg-transparent pl-4 ">

              {optionsSex?.map((item: any) => (
                <option value={item.value}>{item.text}</option>
              ))}
          </select>
          <div className='absolute right-0 pointer-events-none'>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>

    </div>
  )
}

export default SelectStyled