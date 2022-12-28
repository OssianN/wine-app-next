import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      await axios.post('/api/users/login', inputValue)

      router.push('/dashboard')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrorMsg(
        error?.response?.data?.message ?? 'something went wrong, try again...'
      )
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <div className="dashboard">
      <h1 className="header">This is the wine we whine about</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {errorMsg && <p className="form__error-p">{errorMsg}</p>}
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="email"
          type="text"
          value={inputValue.email}
          placeholder="email"
          autocapitalize={false}
        ></input>
        <input
          className="auth-form__input"
          onChange={handleChange}
          name="password"
          value={inputValue.password}
          placeholder="password"
          type="password"
          autocapitalize={false}
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
