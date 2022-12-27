import axios from 'axios'
import { GET_ERRORS } from './types'

export const registerUser = userData => async dispatch => {
  try {
    await axios.post('api/users/register', userData)
    dispatch(setLoginError({}))
  } catch (err) {
    dispatch(setLoginError(err?.response?.data ?? err))
  }
}

export const loginUser = userData => async dispatch => {
  try {
    await axios.post('api/users/login', userData)
    dispatch(setLoginError({}))
  } catch (err) {
    dispatch(setLoginError(err?.response?.data ?? err))
  }
}

export const logoutUser = () => async dispatch => {
  await axios.get('/api/users/logout')
}

export const setLoginError = error => ({ type: GET_ERRORS, payload: error })
