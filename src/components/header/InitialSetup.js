import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InitialSetup = ({ setShowSettings }) => {
  const { user } = useSelector(state => state.auth)
  const [inputValue, setInputValue] = useState({
    columns: user.columns,
    shelves: user.shelves,
  })
  const [error, setError] = useState(false)

  const handleChange = e => {
    const { name } = e.target
    setInputValue({
      ...inputValue,
      [name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!inputValue.columns || !inputValue.shelves) {
      setError(true)
    } else {
      setError(false)
      const updatedUser = await axios.post('/users/addStorage', {
        columns: inputValue.columns,
        shelves: inputValue.shelves,
        email: user.email,
      })
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
          type="number"
          placeholder={user.columns}
          value={inputValue.column}
          onChange={handleChange}
        ></input>
        <label>How many shelves do you have?</label>
        <input
          name="shelves"
          className="initial-setup__input"
          type="number"
          placeholder={user.shelves}
          value={inputValue.shelf}
          onChange={handleChange}
        ></input>
        <p className="initial-setup__p">
          You can change this whenever you want.
        </p>
        <button
          type="submit"
          className="initial-setup__button--confirm btn--enforced"
        >
          confirm
        </button>
      </form>
    </div>
  )
}

export default InitialSetup
