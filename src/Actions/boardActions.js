import { SAVE_LAST_MOVE } from "actionTypes";

export const saveLastUserMove = (boardData) => (dispatch) => {
  console.log(`boardData`, boardData);
  dispatch({
    type: SAVE_LAST_MOVE,
    payload: boardData,
  });
};
