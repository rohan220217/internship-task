import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { analyticsReducer } from "./analyticsReducer";

const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  analyticsReducer
});

export default rootReducer;
