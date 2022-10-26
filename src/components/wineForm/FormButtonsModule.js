import React from 'react'
import { updateDatabase, deleteFromDatabase } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { archiveWine, deleteWine } from '../../actions/wineActions'
import AreYouSureButtons from './AreYouSureButtons'
import ArchiveButton from './ArchiveButton'
import DeleteButton from './DeleteButton'

const FormButtonsModule = ({
  areYouSure,
  setAreYouSure,
  submitButtonName,
  setShowEditModal,
  saveOrClearForm,
}) => {
  const dispatch = useDispatch()
  const { pickedWine } = useSelector(state => state)

  const handleAreYouSure = () => setAreYouSure(!areYouSure)

  const handleArchive = async () => {
    try {
      const update = { ...pickedWine, archived: !pickedWine.archived }
      updateDatabase(update)
      dispatch(archiveWine(update))
      setShowEditModal({ display: 'none' })
      saveOrClearForm()
    } catch (err) {
      alert('A server error occured.', err)
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      deleteFromDatabase(pickedWine)
      dispatch(deleteWine(pickedWine._id))
      setShowEditModal({ display: 'none' })
      handleAreYouSure()
      saveOrClearForm()
    } catch (err) {
      alert('A server error occured.', err)
      console.error(err)
    }
  }

  if (submitButtonName === 'Add Wine') {
    return (
      <button
        type='submit'
        className='btn--enforced btn--form-submit'
        style={{ display: areYouSure ? 'none' : 'block' }}>
        {submitButtonName}
      </button>
    )
  }

  return (
    <>
      {pickedWine.archived ? (
        <>
          <DeleteButton
            areYouSure={areYouSure}
            handleAreYouSure={handleAreYouSure}
          />
          <ArchiveButton
            pickedWine={pickedWine}
            handleArchive={handleArchive}
            areYouSure={areYouSure}
            handleAreYouSure={handleAreYouSure}
          />
        </>
      ) : (
        <>
          <button
            type='submit'
            className='btn--enforced btn--form-submit'
            style={{ display: areYouSure ? 'none' : 'block' }}>
            {submitButtonName}
          </button>
          <ArchiveButton
            pickedWine={pickedWine}
            handleArchive={handleArchive}
            areYouSure={areYouSure}
            handleAreYouSure={handleAreYouSure}
          />
        </>
      )}
      <AreYouSureButtons
        pickedWine={pickedWine}
        areYouSure={areYouSure}
        handleAreYouSure={handleAreYouSure}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default FormButtonsModule
