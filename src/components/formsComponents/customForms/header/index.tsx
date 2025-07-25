import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ClearIcon from '@mui/icons-material/Clear'
import InputHeader from './inputHeader'
import ButtonHeader from './buttonHeader'
import SelectHeader from './selectHeader'
interface ICustomFormMenu {
  id?: string
  title: string
  setTitle: (e: string) => void
  description: string
  setDescription: (e: string) => void
  typeForm: string
  setTypeForm: React.Dispatch<React.SetStateAction<string>>
  onVisibleForms: () => void
  onSaveForms: () => void
  onUpdateForm: () => void
  onClearForm: () => void
}

const HeaderFormMenu = ({
  id,
  title,
  setTitle,
  description,
  setDescription,
  onVisibleForms,
  onSaveForms,
  onUpdateForm,
  onClearForm,
  typeForm,
  setTypeForm,
}: ICustomFormMenu) => {
  const optionsSex = [{ value: 'ANAMNESE', label: 'Anamnese' }]
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between ">
        <InputHeader
          id="title"
          value={title}
          onChange={setTitle}
          placeholder="Título do formulário"
        />
        <ButtonHeader
          onClick={() => {
            if (id) onUpdateForm()
            else onSaveForms()
          }}
          title={id ? 'Atualizar' : 'Salvar'}
          type="button"
          styles="w-[200px] bg-green-600"
          icon={<SaveIcon />}
        />
      </div>

      <div className="flex justify-between ">
        <InputHeader
          id="description"
          value={description}
          onChange={setDescription}
          placeholder="Descrição do formulário"
        />
        <ButtonHeader
          onClick={onVisibleForms}
          title="Visualizar"
          type="button"
          styles="w-[200px] dark:bg-white dark:text-black"
          icon={<VisibilityIcon />}
        />
      </div>

      <div className="flex justify-between ">
        <SelectHeader
          id={'id'}
          value={typeForm}
          onChange={(e) => setTypeForm(e.target.value)}
          options={optionsSex}
          placeholder="Tipo do formulário"
        />
        <ButtonHeader
          onClick={onClearForm}
          title="Limpar dados"
          type="button"
          styles="w-[200px] dark:text-black bg-newRed dark:text-white"
          icon={<ClearIcon />}
        />
      </div>
    </div>
  )
}

export default HeaderFormMenu
