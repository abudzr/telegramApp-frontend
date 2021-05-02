import { combineReducers } from "redux";
import userReducer from "./user";
import messageReducer from "./message"

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer
});

export default rootReducer;
