
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
interface IInputStyled {
  maxLength?: number;
  disabled?: boolean,
  id: string
  label?: string
  type: string
  icon: React.ReactElement
  placeholder?: string,
  value?: any
  onChange?: (value: any) => void,
  stylesContainer?: string,
  styles?: string,
  stylesInput?: string,
  edit?: boolean,
  error?: string
  onBlur?: any
  isTouched?: boolean
}
const InputStyled = ({maxLength,disabled, label, type, icon, placeholder, value, onChange, id, styles, stylesInput,edit,error ,onBlur, isTouched, stylesContainer}: IInputStyled) => {
  return (
    <div className={`${stylesContainer ? stylesContainer : ''} flex flex-col `}>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`${styles ? styles : ''} bg-none  border border-solid outline-none border-gray  rounded-xl p-2 flex items-center justify-between ${disabled ? 'bg-customGray' : ''}`}>
        <div className='flex items-center gap-3 w-full'>
          {icon}
          <input 
            maxLength={maxLength}
            disabled={disabled} 
            id={id} 
            value={value} 
            onChange={onChange} 
            type={type} 
            className={`${disabled ? 'bg-customGray' : 'bg-white'}  ${stylesInput ? stylesInput : ''} outline-none text-black w-[70%]`}
            placeholder={placeholder} 
            onBlur={onBlur}
            
          />

        </div>
        {edit &&
          <button className='pr-2'>
            <EditOutlinedIcon />
          </button>}

      </div>
      {error && isTouched &&
        <p className='font-light text-red text-sm pt-1 text-center'>{error}</p>
      }
    </div>
  )
}

export default InputStyled