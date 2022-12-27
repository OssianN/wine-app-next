import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { useRouter } from 'next/router'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogOut = () => {
    dispatch(logoutUser())
    router.push('/')
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
