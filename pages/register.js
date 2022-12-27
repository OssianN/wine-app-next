import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { registerUser, setLoginError } from '../src/actions/authActions'
import validateRegisterInput from '../validation/register'
import useUser from '../hooks/useUser'

const Register = () => {
  const { user } = useUser
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const authError = useSelector(state => state.errorState)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = e => {
    const name = e.target.name
    setInputValue({
      ...inputValue,
      [name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { isValid, errors } = validateRegisterInput(inputValue)

    if (!isValid) {
      dispatch(setLoginError(errors))
      return
    }
    dispatch(registerUser(inputValue))
    router.push('/login')
  }

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  })

  return (
    <div className="dashboard">
      <h1 className="header">This is the wine we whine about</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="name"
          value={inputValue.name}
          placeholder="name"
        ></input>
        {authError.email ? (
          <p className="form__error-p">{authError.email}</p>
        ) : (
          ''
        )}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="email"
          value={inputValue.email}
          placeholder="email"
        ></input>
        {authError.password ? (
          <p className="form__error-p">{authError.password}</p>
        ) : (
          ''
        )}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password"
          value={inputValue.password}
          placeholder="password"
          type="password"
        ></input>
        {authError.password2 ? (
          <p className="form__error-p">{authError.password2}</p>
        ) : (
          ''
        )}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password2"
          value={inputValue.password2}
          placeholder="repeat password"
          type="password"
        ></input>
        <button
          className="auth-form__submit-button btn--enforced"
          type="submit"
        >
          register
        </button>
      </form>
    </div>
  )
}

export default Register
