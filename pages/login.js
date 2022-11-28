import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

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
      await axios.post('/api/login', inputValue)
      router.push('/dashboard')
    } catch (error) {
      if (error) {
        setErrorMsg(error.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  return (
    <>
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
          log in
        </button>
      </form>
    </>
  )
}

export default Login
