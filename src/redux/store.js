import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
const middlewares = [thunk];
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
