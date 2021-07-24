import { SAVE_LAST_MOVE } from "../actionTypes";

const initialState = {
  lastMove: null,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LAST_MOVE:
      return {
        ...state,
        lastMove: action.payload,
      };

    default:
      return state;
  }
};

export default boardReducer;
