import axios from 'axios'

export const updateDatabase = async data => {
  try {
    return await axios.put('/api/wines/updateWine', data)
  } catch (err) {
    alert('A server error occured.', err)
    console.error(err)
  }
}

export const deleteFromDatabase = async data => {
  try {
    return await axios.delete('/api/wines/deleteWine', { data })
  } catch (err) {
    alert('A server error occured.', err)
    console.error(err)
  }
}
