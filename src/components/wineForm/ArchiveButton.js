import React from 'react'

const ArchiveButton = ({
  areYouSure,
  pickedWine,
  handleArchive,
}) => {
  if (areYouSure) {
    return null
  }

  return (
    <button
      type='button'
      onClick={handleArchive}
      className='btn--enforced btn--form-archive'
      style={{ display: areYouSure ? 'none' : 'block' }}>
      {pickedWine.archived ? 'Unarchive' : 'Archive'}
    </button>
  )
}

export default ArchiveButton
