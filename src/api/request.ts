export const getRequest = async (url: string, headers = {}) => {
  return (
    fetch(url, { headers })
      .then(result => {
        return result.json()
      })
      .catch(err => {
        console.error('Err get request - ', err)
      })
  )
}