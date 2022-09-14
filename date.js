const getDate = () => {
  const today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }
  return today.toLocaleString('en-us', options)
}
export default getDate
