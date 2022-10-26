import { combineReducers } from 'redux'
import authReducer from './authReducers'
import errorReducer from './errorReducers'
import wineReducer from './wineReducer'
import setPickedWineReducer from './pickedWine'
import keepFormReducer from './keepFormReducer'

export default combineReducers({
  auth: authReducer,
  errorState: errorReducer,
  wineArr: wineReducer,
  pickedWine: setPickedWineReducer,
  keepForm: keepFormReducer,
})
