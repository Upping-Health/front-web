interface Props {
  label?: string
  placeholder?: string
  onChange: (e: any) => void
  id: string
  value: string
}

const QuestionInput = ({ label, placeholder, onChange, id, value }: Props) => (
  <div className="flex flex-col w-full">
    {label && (
      <label className="mb-1 text-gray-400  dark:text-white">{label}</label>
    )}
    <input
      id={id}
      value={value}
      onChange={onChange}
      type="text"
      className="text-black bg-white border dark:border-slate-500 outline-none border-gray rounded-xl p-2 dark:text-white dark:bg-slate-600 dark:placeholder:text-slate-400"
      placeholder={placeholder}
    />
  </div>
)

export default QuestionInput
