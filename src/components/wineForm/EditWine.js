import React from 'react'
import { updateDatabase } from './utils'
import WineForm from './WineForm'
import { updateWine } from '../../actions/wineActions'
import { useDispatch } from 'react-redux'

const EditWine = props => {
  const dispatch = useDispatch()

  const handleEdit = async (data) => {
    const newWine = await updateDatabase(data)
    dispatch(updateWine(newWine.data))
  }

  return (
    <div className='wineModal' style={props.showEditModal}>
      <WineForm
        method={handleEdit}
        buttonName='Change Wine'
        show={props.setShowEditModal}
        setShowEditModal={props.setShowEditModal}
      />
    </div>
  )
}

export default EditWine
