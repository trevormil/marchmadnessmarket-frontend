import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducers";
import dataReducer from "./reducers/dataReducers";
import uiReducer from "./reducers/uiReducers";
import scoreReducer from "./reducers/scoreReducers";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
  scoreData: scoreReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
