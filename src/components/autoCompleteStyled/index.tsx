import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useDarkMode } from '@/hooks/theme/useDarkTheme'
import { colors } from '@/utils/colors/colors'

interface IAutocompleteStyled {
  id: string
  label?: string
  icon: React.ReactElement
  placeholder?: string
  value?: any
  options: any[]
  getOptionLabel: (option: any) => string
  onChange: (event: any, newValue: any) => void
  disabled?: boolean
  edit?: boolean
  error?: string
  isTouched?: boolean
  styles?: string
  stylesInput?: string
  stylesGlobal?: string
  stylesLabel?: string
}

const AutocompleteStyled = ({
  id,
  label,
  icon,
  placeholder,
  value,
  options,
  getOptionLabel,
  onChange,
  disabled,
  error,
  isTouched,
  styles,
  stylesGlobal,
  stylesLabel,
}: IAutocompleteStyled) => {
  const {themeDark} = useDarkMode()
  console.log(themeDark);
  return (
    <div className={` w-[90%] ${stylesGlobal ?? ''} flex flex-col dark:text-white`}>
      {label && <label className={`${stylesLabel} 'mb-1 text-darkGray text-sm'`}>{label}</label>}
      <div className={`${styles ?? ''} border border-gray rounded-xl p-2 flex items-center justify-between ${disabled ? 'bg-customGray' : ''}`}>
        <div className='flex items-center gap-4 w-full'>
          {icon}
          <Autocomplete
            id={id}
            disabled={disabled}
            options={options}
            value={value}
            onChange={onChange}
            getOptionLabel={getOptionLabel}
            fullWidth
            className='dark:bg-slate-500 dark:text-white'
            sx={{
              backgroundColor: disabled ? '#e5e5e5' : 'white',
              flex: 1,
              '& .MuiInputBase-root': {
                padding: 0,
                paddingLeft: 0,
                fontWeight: 400,
                border: 'none',
                backgroundColor: 'transparent',
              },
              '& input': {
                padding: '6px 0',
                color: themeDark ? colors.white : colors.black
              },
              '& fieldset': {
                border: 'none',
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                variant="outlined"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
          />
        </div>
        
      </div>
      {error && isTouched && (
        <p className='font-light text-red text-sm pt-1 text-center'>{error}</p>
      )}
    </div>
  )
}

export default AutocompleteStyled
