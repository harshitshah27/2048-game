import { SAVE_LAST_MOVE, SAVE_CURRENT_MOVE } from "../actionTypes";

const initialState = {
  lastMove: null,
  currentMove: JSON.parse(localStorage.getItem("currentMove")),
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LAST_MOVE:
      return {
        ...state,
        lastMove: action.payload,
      };

    case SAVE_CURRENT_MOVE:
      localStorage.setItem("currentMove", JSON.stringify(action.payload));
      return {
        ...state,
        currentMove: action.payload,
      };

    default:
      return state;
  }
};

export default boardReducer;
