import React, { useState } from 'react'
import useUser from '../../../hooks/useUser'
import axios from 'axios'

const InitialSetup = ({ setShowSettings }) => {
  const { user, mutateUser } = useUser()
  const [inputValue, setInputValue] = useState({
    columns: user?.columns,
    shelves: user?.shelves,
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!inputValue.columns || !inputValue.shelves) {
      setError(true)
    } else {
      setError(false)
      setLoading(true)
      await axios.post('api/users/addStorage', {
        columns: inputValue.columns,
        shelves: inputValue.shelves,
        email: user.email,
      })
      await mutateUser()
      setLoading(false)
      setShowSettings(false)
    }
  }

  return (
    <div className="initial-setup__container">
      <form className="initial-setup__form" onSubmit={handleSubmit}>
        {error ? <p>columns and shelves need to be grater than zero</p> : ''}
        <label>How many columns do you have?</label>
        <input
          name="columns"
          className="initial-setup__input"
          placeholder={user?.columns}
          value={inputValue.columns}
          onChange={handleChange}
        ></input>
        <label>How many shelves do you have?</label>
        <input
          name="shelves"
          className="initial-setup__input"
          placeholder={user?.shelves}
          value={inputValue.shelves}
          onChange={handleChange}
        ></input>
        <p className="initial-setup__p">
          You can change this whenever you want.
        </p>
        <button
          type="submit"
          className="initial-setup__button--confirm btn--enforced"
        >
          {loading ? 'changing...' : 'confirm'}
        </button>
      </form>
    </div>
  )
}

export default InitialSetup
