export default function convertArrayToObject(array: any[], key: string) {
  const object: any = {}
  array.forEach((item) => (object[item[key]] = item))
  return object
}
