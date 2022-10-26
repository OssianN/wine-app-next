import {
  SET_WINE_ARR,
  UPDATE_WINE,
  ARCHIVE_WINE,
  DELETE_WINE,
} from '../actions/types'

export const setWineArr = cardArr => ({ type: SET_WINE_ARR, payload: cardArr })

export const updateWine = newWine => ({ type: UPDATE_WINE, payload: newWine })

export const archiveWine = wine => ({ type: ARCHIVE_WINE, payload: wine })

export const deleteWine = targetWine => ({
  type: DELETE_WINE,
  payload: targetWine,
})
