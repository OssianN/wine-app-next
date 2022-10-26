import {
  SET_PICKED_WINE,
} from "../actions/types";

export const setPickedWine = wineObject => ({type: SET_PICKED_WINE, payload: wineObject})