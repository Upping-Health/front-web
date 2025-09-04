export function formatDate(input: string) {
  if (!input) return ''

  const [day, month, year] = input.split('/')
  if (!day || !month || !year) return input
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export function formatDateToBR(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
