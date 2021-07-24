import { SAVE_LAST_MOVE, SAVE_CURRENT_MOVE } from "actionTypes";

export const saveLastUserMove = (boardData) => (dispatch) => {
  dispatch({
    type: SAVE_LAST_MOVE,
    payload: boardData,
  });
};

export const saveUserCurrentMove = (boardData) => (dispatch) => {
  dispatch({
    type: SAVE_CURRENT_MOVE,
    payload: boardData,
  });
};
