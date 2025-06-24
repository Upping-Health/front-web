import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
interface FilterOption {
  label: string
  value: string
}

interface FilterTableProps {
  options: FilterOption[]
  onSelect: (value: string) => void
  selected?: string
}

const FilterTable: React.FC<FilterTableProps> = ({
  options,
  onSelect,
  selected,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value?: string) => {
    setAnchorEl(null)
    if (value) onSelect(value)
  }

  return (
    <>
      <button className={`flex justify-center items-center border-gray bg-white border rounded-xl px-4 gap-2`} onClick={handleClick}>

        <FilterAltOutlinedIcon/>

        <p className='text-black font-medium'>Status</p>
        </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selected}
            onClick={() => handleClose(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default FilterTable
