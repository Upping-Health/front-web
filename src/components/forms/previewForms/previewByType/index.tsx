interface Props {
  label?: string
  placeholder?: string
  onChange: (e: any) => void
  id: string
  value: string
  type?: string
}

const PreviewByType = ({
  label,
  placeholder,
  onChange,
  id,
  value,
  type,
}: Props) => (
  <div className="flex flex-col w-[40%]">
    {label && (
      <label className="mb-1 text-darkGray dark:text-white">{label}</label>
    )}
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type ?? 'text'}
      className="text-black bg-white border dark:border-slate-500 outline-none border-gray rounded-xl p-2 dark:text-white dark:bg-slate-600 dark:placeholder:text-slate-400"
      placeholder={placeholder}
    />
  </div>
)

export default PreviewByType
