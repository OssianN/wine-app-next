import { combineReducers } from 'redux'
import errorReducer from './errorReducers'
import wineReducer from './wineReducer'
import setPickedWineReducer from './pickedWine'
import keepFormReducer from './keepFormReducer'

export default combineReducers({
  errorState: errorReducer,
  wineArr: wineReducer,
  pickedWine: setPickedWineReducer,
  keepForm: keepFormReducer,
})
