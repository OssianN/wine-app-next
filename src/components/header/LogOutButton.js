import React from 'react'
import { useDispatch } from 'react-redux'

const LogOutButton = () => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(setCurrentUser({}))
    localStorage.removeItem('jwtToken')
    history.push('/')
  }

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogOut}>
        <p>log out</p>
      </button>
    </div>
  )
}

export default LogOutButton
