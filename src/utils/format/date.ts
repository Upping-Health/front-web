export function formatDate(input: string){
  const [day, month, year] = input.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function formatDateToBR(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}