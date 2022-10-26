import {
  SET_PICKED_WINE,
} from "../actions/types";

const initialState = {};

const setPickedWine = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKED_WINE:
      return action.payload;
    default:
      return state;
  }
}

export default setPickedWine;