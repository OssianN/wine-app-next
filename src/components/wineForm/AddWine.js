import React from 'react'
import WineForm from './WineForm'
import { useDispatch, useSelector } from 'react-redux'
import { setWineArr } from '../../actions/wineActions'
import axios from 'axios'
import useUser from '../../../hooks/useUser'

const AddWine = props => {
  const { user } = useUser()
  const dispatch = useDispatch()
  const wineArr = useSelector(state => state.wineArr)
  const pickedWine = useSelector(state => state.pickedWine)
  const { shelf, column } = pickedWine

  const postData = async data => {
    try {
      dispatch(
        setWineArr([...wineArr, { shelf, column, country: 'loading...' }])
      )
      const newWine = await axios.post('/api/wines/postNewWine', data)
      dispatch(setWineArr([...wineArr, newWine.data]))
      await axios.post('/api/users/addWine', {
        _id: newWine.data._id,
        email: user.email,
      })
    } catch (err) {
      alert('A server error occured:', err.message)
    }
  }

  return (
    <div className="wineModal" style={props.showAddModal}>
      <WineForm
        method={postData}
        buttonName="Add Wine"
        show={props.setShowAddModal}
      />
    </div>
  )
}

export default AddWine
