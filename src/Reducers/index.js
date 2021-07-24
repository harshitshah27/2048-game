// reducers.js
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import BoardReducer from "./boardReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    board: BoardReducer,
    // rest of your reducers
  });
export default createRootReducer;
