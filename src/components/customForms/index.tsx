import CardForm from './cardForms'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'

interface ICustomForm {}

const CustomForms = ({}: ICustomForm) => {
  return (
    <div className="flex flex-col h-full items-center mt-10 ">
      <div className="flex flex-col gap-4">
        <HeaderFormMenu />
      
        <CustomFormMenu />

        <CardForm />
      </div>
    </div>
  )
}

export default CustomForms
