import {
  SET_WINE_ARR,
  UPDATE_WINE,
  ARCHIVE_WINE,
  DELETE_WINE,
} from '../actions/types'

const findAndUpdateTargetWine = (cardArr, newWine) =>
  cardArr.map(card => (card._id !== newWine._id ? card : newWine))

const deleteWine = (state, deleteCardId) =>
  state.filter(card => card._id !== deleteCardId)

const initialState = []

const wineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINE_ARR:
      return action.payload
    case UPDATE_WINE:
      return findAndUpdateTargetWine(state, action.payload)
    case ARCHIVE_WINE:
      return findAndUpdateTargetWine(state, action.payload)
    case DELETE_WINE:
      return deleteWine(state, action.payload)
    default:
      return state
  }
}

export default wineReducer
