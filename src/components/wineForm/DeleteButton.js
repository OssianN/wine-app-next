import React from 'react'

const DeleteButton = ({ areYouSure, handleAreYouSure }) => {
  return (
    <button
      type='button'
      onClick={handleAreYouSure}
      className='btn--enforced btn--form-archive'
      style={{ display: areYouSure ? 'none' : 'block' }}>
      Delete
    </button>
  )
}

export default DeleteButton
