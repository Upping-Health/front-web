interface Props {
  label?: string
  placeholder?: string
  onChange: (e: any) => void
  id: string
  value: string
}

const InputTextArea = ({ placeholder, onChange, id, value }: Props) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    className="text-black bg-white border border-solid outline-none resize-none border-gray rounded-xl p-2 dark:text-white dark:bg-slate-600 dark:placeholder:text-slate-400 w-full"
    placeholder={placeholder}
    rows={2}
  />
)

export default InputTextArea
