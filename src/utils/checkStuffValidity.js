export const checkStuffValidity = (str) => {
  if (str.length < 2) return false
  if (str[0] !== 'S' || str[1] !== 'T') return false
  const parsedId = +str.substring(2)
  if (Number.isNaN(parsedId)) return false

  return true
}
