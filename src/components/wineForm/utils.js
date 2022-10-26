export const updateDatabase = async data => {
  try {
    return await axios.put('/wines', data)
  } catch (err) {
    alert('A server error occured.', err)
    console.error(err)
  }
}

export const deleteFromDatabase = async data => {
  try {
    return await axios.delete('/wines', { data })
  } catch (err) {
    alert('A server error occured.', err)
    console.error(err)
  }
}
