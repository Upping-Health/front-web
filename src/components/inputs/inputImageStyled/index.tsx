import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface ImageInputProps {
  value?: string
  onChange: (file: File | null) => void
}

export default function InputImageStyled({ value, onChange }: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
    onChange(file)
  }

  const removeImage = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-28 h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-gray-400 transition`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <span className="text-gray-400 dark:text-gray-500 text-sm text-center">
              Clique ou arraste uma imagem
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  )
}
