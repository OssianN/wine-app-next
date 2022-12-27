import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../src/actions/authActions'
import useUser from '../hooks/useUser'

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, mutateUser } = useUser()

  const handleChange = e => {
    const name = e.target.name
    setInputValue({
      ...inputValue,
      [name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      dispatch(loginUser(inputValue))
      await mutateUser()
      setLoading(false)
    } catch (error) {
      if (error) {
        setErrorMsg(error.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="dashboard">
      <h1 className="header">This is the wine we whine about</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {errorMsg.email ? (
          <p className="form__error-p">{errorMsg.email}</p>
        ) : (
          <p></p>
        )}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="email"
          type="text"
          value={inputValue.email}
          placeholder="email"
        ></input>
        {errorMsg.password ? (
          <p className="form__error-p">{errorMsg.password}</p>
        ) : (
          <p></p>
        )}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password"
          value={inputValue.password}
          placeholder="password"
          type="password"
        ></input>
        <button
          className="auth-form__submit-button btn--enforced"
          type="submit"
        >
          {loading ? 'logging in...' : 'log in'}
        </button>
      </form>
    </div>
  )
}

export default Login
