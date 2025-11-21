import InputStyled from '@/components/inputs/inputStyled'
import { FormikProps } from 'formik'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ButtonStyled from '@/components/buttons/button'
import AddIcon from '@mui/icons-material/Add'

interface StepMeasuresProps {
  formik: FormikProps<FoodFormValues>
}

const StepMeasures = ({ formik }: StepMeasuresProps) => {
  const handleRemove = (index: number) => {
    const newList = [...formik.values.measurements]
    newList.splice(index, 1)
    formik.setFieldValue('measurements', newList)
  }

  return (
    <div className="space-y-2">
      {formik.values.measurements?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-end"
        >
          <InputStyled
            id={`measurements.${index}.measure`}
            label="Medida"
            type="text"
            value={item.measure}
            onChange={(e) =>
              formik.setFieldValue(
                `measurements.${index}.measure`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
          />

          <InputStyled
            id={`measurements.${index}.quantity`}
            label="Quantidade"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              formik.setFieldValue(
                `measurements.${index}.quantity`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
          />

          <button
            type="button"
            className="h-[40px] flex items-center justify-center text-red-600 hover:text-red-800"
            onClick={() => handleRemove(index)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      ))}

      <div className="flex justify-center">
        <ButtonStyled
          type="button"
          icon={<AddIcon className="text-lg" />}
          styles="px-4 bg-primary h-[40px] text-sm"
          title="Adicionar"
          onClick={() =>
            formik.setFieldValue('measurements', [
              ...formik.values.measurements,
              { measure: '', quantity: '' },
            ])
          }
        />
      </div>
    </div>
  )
}

export default StepMeasures
