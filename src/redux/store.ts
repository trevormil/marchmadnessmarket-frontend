import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import dataReducer from './reducers/dataReducers';
import uiReducer from './reducers/uiReducers';
import scoreReducer from './reducers/scoreReducers';
import otherUserStocksReducer from './reducers/otherUserReducers';

export const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        ui: uiReducer,
        scoreData: scoreReducer,
        otherUserStocks: otherUserStocksReducer,
    },
    // Redux Toolkit includes thunk middleware by default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
