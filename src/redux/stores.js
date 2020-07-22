import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducers';
import dataReducer from './reducers/dataReducers';
import uiReducer from './reducers/uiReducers';
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    ui: uiReducer
});

const store = createStore(reducers,
    initialState,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;