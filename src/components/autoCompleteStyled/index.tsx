import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

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
}: IAutocompleteStyled) => {
  return (
    <div className={` w-[90%] ${stylesGlobal ?? ''} flex flex-col`}>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`${styles ?? ''} border border-gray rounded-xl p-2 flex items-center justify-between ${disabled ? 'bg-gray' : ''}`}>
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
