export interface FormResponse {
  uuid: string
  status: string
  notes: string | null
  metadata: {
    ip_address: string
    user_agent: string
  }
  created_at: string
  updated_at: string
  form: Form
  answers: Answer[]
}

export interface Form {
  uuid: string
  title: string
  description: string
  is_active: boolean
  is_template: number
  version: number
}

export interface Answer {
  text_answer: string | null
  number_answer: number | null
  date_answer: string | null
  option_answer: string[] | string | null
  file_answer: string | null
  answered_at: string
  field: Field
}

export interface Field {
  uuid: string
  label: string
  type:
    | 'number'
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'range'
    | 'file'
  order: number
  required: 0 | 1
  options: Options | string[] | null
}

export interface Options {
  min?: number
  max?: number
  step?: number
  accept?: string
}
