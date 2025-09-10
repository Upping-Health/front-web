import DefaultEntityType from './default'

export default interface Documents extends DefaultEntityType {
  id: number
  user_id: number
  type: 'file' | 'img' | 'video' | 'audio' | 'document'
  original_name: string
  storage_name: string
  path: string
  mime_type: string
  size: number
  categories: any[]
}
