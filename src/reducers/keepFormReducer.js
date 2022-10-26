import {
  KEEP_FORM,
} from "../actions/types";

const initialState = false;

const keepForm = (state = initialState, action) => {
  switch (action.type) {
    case KEEP_FORM:
      return action.payload;
    default:
      return state;
  }
}

export default keepForm;