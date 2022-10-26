import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPickedWine } from '../../actions/setPickedWine'
import { setKeepForm } from '../../actions/setKeepForm'
import FormButtonsModule from './FormButtonsModule'

const WineForm = props => {
  const dispatch = useDispatch()
  const titleInput = useRef(null)
  const yearInput = useRef(null)
  const pickedWine = useSelector(state => state.pickedWine)
  const keepForm = useSelector(state => state.keepForm)
  const { column, shelf } = pickedWine
  const [areYouSure, setAreYouSure] = useState(false)
  const initialState = { title: '', year: '', price: '', comment: '' }
  const [inputValue, setInputValue] = useState(initialState)

  const isValidateInput = () => {
    if (!inputValue.title) {
      return { isValid: false, input: titleInput }
    }
    if (isNaN(inputValue.year)) {
      return { isValid: false, input: yearInput }
    }
    return { isValid: true }
  }

  const saveOrClearForm = () => {
    if (!keepForm) {
      setInputValue(initialState)
      dispatch(setPickedWine(initialState))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { isValid, input } = isValidateInput()
    if (!isValid) {
      return input.current.focus()
    }
    props.method({
      ...pickedWine,
      ...inputValue,
      column,
      shelf,
    })
    props.show({ display: 'none' })
    setAreYouSure(false)
    saveOrClearForm()
  }

  const handleInputValueChange = e => {
    const name = e.target.name
    setInputValue({
      ...inputValue,
      [name]: e.target.value,
    })
  }

  const handleCheckedKeepForm = () => {
    dispatch(setKeepForm(!keepForm))
  }

  const cancel = () => {
    saveOrClearForm()
    setAreYouSure(false)
    props.show({ display: 'none' })
  }

  const focus = () => {
    titleInput.current.focus()
  }

  useEffect(() => setInputValue({ ...pickedWine }), [pickedWine])

  useEffect(() => {
    focus()
  }, [])

  return (
    <form onSubmit={handleSubmit} className='wineForm'>
      <button type='button' onClick={cancel} className='cancelButton'>
        &#10005;
      </button>
      <input
        ref={titleInput}
        value={inputValue.title || ''}
        onChange={handleInputValueChange}
        name='title'
        type='text'
        placeholder='Name'
      />
      <input
        ref={yearInput}
        value={inputValue.year || ''}
        onChange={handleInputValueChange}
        name='year'
        type='text'
        placeholder='Year'
      />
      <input
        value={inputValue.price || ''}
        onChange={handleInputValueChange}
        name='price'
        type='text'
        placeholder='What did you pay?'
      />
      <textarea
        value={inputValue.comment || ''}
        onChange={handleInputValueChange}
        name='comment'
        placeholder='comment'></textarea>
      <FormButtonsModule
        submitButtonName={props.buttonName}
        areYouSure={areYouSure}
        setAreYouSure={setAreYouSure}
        setShowEditModal={props.setShowEditModal}
        saveOrClearForm={saveOrClearForm}
      />
      <div className='save-form'>
        <input
          value={keepForm}
          onChange={handleCheckedKeepForm}
          type='checkbox'
          className={`save-form__checkbox ${keepForm}`}></input>
        <label htmlFor='saveForm'>keep form info</label>
      </div>
    </form>
  )
}

export default WineForm
