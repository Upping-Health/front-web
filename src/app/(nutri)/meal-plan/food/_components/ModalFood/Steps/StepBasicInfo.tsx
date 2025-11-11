import InputImageStyled from '@/components/inputs/inputImageStyled'
import InputStyled from '@/components/inputs/inputStyled'

const StepBasicInfo = ({ formik }: any) => (
  <div className="flex flex-col gap-3">
    <div className="flex w-full items-center justify-center">
      <InputImageStyled
        value={formik.values.image_url}
        onChange={(file) => formik.setFieldValue('image_file', file)}
      />
    </div>
    <InputStyled
      id="name"
      label="Nome"
      type="text"
      placeholder="Nome"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.errors.name}
      onBlur={formik.handleBlur}
      isTouched={formik.touched.name}
      required
    />
    <InputStyled
      id="description"
      label="Descrição"
      type="text"
      value={formik.values.description}
      onChange={(e) => formik.setFieldValue('description', e.target.value)}
    />

    <InputStyled
      id="sku"
      label="SKU"
      type="text"
      value={formik.values.sku}
      onChange={(e) => formik.setFieldValue('sku', e.target.value)}
    />
  </div>
)

export default StepBasicInfo
