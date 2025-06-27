import PreviewTypeText from './previewQuestion'

interface IQuestion {
  label: string
  type: string
  typeLabel: string
  icon: any
  description: string
  descriptionLabel: string
  options?: string[]
  required: boolean
}
interface IFormPreview {
  title: string
  description: string
  field: IQuestion[]
}

const PreviewForms = ({ formData }: { formData: IFormPreview }) => {
  const optionsSex = [{ value: 'ANAMNESE', label: 'Anamnese' }]
  return (
    <div className="flex flex-col gap-2">
      <div className='mb-5'> 
        <h1 className="text-3xl font-bold text-black dark:text-white">
          {formData.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {formData.description}
        </p>

      </div>
        {formData?.field?.map((field, index) => (
          <PreviewTypeText key={index} question={field} />
        ))}
    </div>
  )
}

export default PreviewForms
