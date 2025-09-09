import ButtonStyled from '@/components/buttons/button'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import { CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import InputStyled from '@/components/inputs/inputStyled'
import { Description } from '@mui/icons-material'
import api from '@/services/api'
import Patient from '@/interfaces/patient.interface'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  patient: Patient | null
  loadData?: () => Promise<void>
}

const ModalAddDocument = ({
  open,
  setIsClose,
  patient,
  loadData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Documento enviado com sucesso!'))
    setIsClose()
    loadData && loadData()
  }

  const onError = (e: any) => {
    const errorMessage = e?.response?.message || 'Falha ao enviar o documento.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.error('[ERROR API /upload-document]', errorMessage)
  }

  useEffect(() => {
    if (!open) return formik.resetForm()
  }, [open])

  const formik = useFormik({
    initialValues: {
      name: '',
      file: null as File | null,
    },
    onSubmit: async (values) => {
      try {
        if (!values.file) return
        setLoading(true)
        const formData = new FormData()
        formData.append('file', values.file)
        formData.append('type', 'file')
        console.log(values.file)

        await api.post(`/users/${patient?.uuid}/attachments`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        onSuccess()
      } catch (error) {
        onError(error)
      } finally {
        setLoading(false)
      }
    },
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {},
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (file.size > 10 * 1024 * 1024) {
          onShowFeedBack(
            PreFeedBack.error('O arquivo não pode ultrapassar 10MB.'),
          )
          return
        }

        formik.setFieldValue('file', file)
      }
    },
  })

  const handleRemoveFile = () => {
    formik.setFieldValue('file', null)
  }

  return (
    <ModalBase open={open} onClose={setIsClose}>
      <ModalHeader title="Upload de Documento" onClose={setIsClose} />

      <ModalContent>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome de referência"
            type="text"
            placeholder="Exemplo"
            icon={<Description className="text-black dark:text-white" />}
            error={formik.errors.name}
            onBlur={formik.handleBlur}
            isTouched={formik.touched.name}
          />

          <div
            {...getRootProps()}
            className={`border-2 relative border-dashed rounded-md p-6 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-slate-700'}
            `}
          >
            <input {...getInputProps()} />
            {formik.values.file ? (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 p-3">
                  <span className="text-sm text-black dark:text-white font-medium">
                    {formik.values.file.name}
                  </span>
                  <DeleteIcon
                    style={{ color: '#e53e3e', cursor: 'pointer' }}
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Tamanho:{' '}
                  {(formik.values.file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <InsertDriveFileIcon className="text-4xl text-primary dark:text-white" />
                <p className="text-sm text-gray-700 dark:text-white">
                  {isDragActive
                    ? 'Solte o arquivo aqui...'
                    : 'Arraste e solte o arquivo aqui ou clique para selecionar'}
                </p>
                <p className="text-xs text-gray-500">Tamanho máximo: 10MB</p>
              </div>
            )}
          </div>

          {formik.errors.file && formik.touched.file && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.file}</p>
          )}
        </form>
      </ModalContent>

      <ModalFooter>
        <ButtonStyled
          type="button"
          onClick={setIsClose}
          styles="w-full"
          bgColor="bg-red-600"
          title="Cancelar"
        />

        <ButtonStyled
          type="submit"
          onClick={() => formik.handleSubmit()}
          styles="w-full bg-green-600"
          disabled={!formik.values.file || !formik.isValid || loading}
          title={loading ? 'Enviando...' : 'Enviar Documento'}
          icon={
            loading && (
              <CircularProgress
                style={{ width: 20, height: 20, color: '#FFFFFF' }}
              />
            )
          }
        />
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalAddDocument
