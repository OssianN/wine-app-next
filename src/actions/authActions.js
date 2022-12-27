import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types'
import { useRouter } from 'next/router'

export const registerUser = userData => async dispatch => {
  const router = useRouter()

  try {
    await axios.post('api/users/register', userData)
    router.push('/login')
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
  setCurrentUser({})
}

export const setLoginError = error => ({ type: GET_ERRORS, payload: error })

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
}
