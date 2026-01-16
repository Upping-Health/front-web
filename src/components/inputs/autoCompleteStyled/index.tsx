import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useGetDarkTheme } from '@/hooks/theme/useGetDarkTheme'
import { colors } from '@/lib/colors/colors'

interface IAutocompleteStyled {
  id: string
  label?: string
  icon?: React.ReactElement
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
  stylesInput,
}: IAutocompleteStyled) => {
  const { themeDark } = useGetDarkTheme()

  const selectedOption = React.useMemo(() => {
    if (!value) return null
    return options.find((opt) => opt?.id === value) || null
  }, [value, options])
  return (
    <div className={`${stylesGlobal ?? ''} flex flex-col`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 text-black dark:text-gray-300 text-sm flex items-center gap-1 ${stylesLabel ?? ''}`}
        >
          {label}
        </label>
      )}

      <div
        className={`bg-none relative border border-solid outline-none rounded-xl p-2 flex items-center justify-between
          border-gray-300 dark:border-slate-700
          ${disabled ? 'bg-customGray' : ''}
          ${styles ?? ''}`}
      >
        <div className="flex items-center gap-2 w-full relative">
          {icon}

          <Autocomplete
            id={id}
            disabled={disabled}
            options={options}
            value={selectedOption}
            onChange={onChange}
            getOptionLabel={getOptionLabel}
            fullWidth
            disableClearable
            noOptionsText="Sem resultados"
            slotProps={{
              paper: {
                sx: {
                  minWidth: '240px',
                },
              },
            }}
            className={`dark:bg-gray-800 outline-none text-black dark:text-white w-full pl-1 ${stylesInput ?? ''}`}
            sx={{
              '& fieldset': {
                border: 'none',
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: themeDark ? colors.white : colors.black,
              },
              '& .MuiAutocomplete-clearIndicator': {
                color: themeDark ? colors.white : colors.black,
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '-5px !important',
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'absolute',
              },

              '& .MuiSvgIcon-root': {
                color: themeDark ? colors.white : colors.black,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                variant="outlined"
                className="text-black dark:text-white"
                sx={{
                  '& .MuiInputBase-root': {
                    padding: '0 !important',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiInputBase-input': {
                    padding: '0 !important',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '0 !important',
                    color: themeDark ? colors.white : colors.black,
                    '::placeholder': {
                      color: themeDark ? '#9CA3AF' : '#6B7280',
                      opacity: 1,
                    },
                  },
                }}
              />
            )}
          />
        </div>
      </div>

      {error && isTouched && (
        <p className="font-light text-red text-sm pt-1 text-center">{error}</p>
      )}
    </div>
  )
}

export default AutocompleteStyled
