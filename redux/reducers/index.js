import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import tabReducer from "./tabReducer";
const rootReducer = combineReducers({
  tabReducer,
  marketReducer,
});
export default rootReducer;
