import {
    LOADING_CURR_STOCK,
    LOADING_STOCKS,
    SET_CURR_STOCK,
    SET_STOCKS,
} from '../types';

const initialState = {
    loading: false,
    errors: null,
    stocks: [],
    filters: [],
    currStock: {
        trades: [],
        stockHistory: null,
        stockData: {
            ipoPrice: null,
        },
    },
    trades: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STOCKS:
            return {
                loading: false,
                ...action.payload,
            };
        case LOADING_STOCKS:
            return {
                ...state,
                loading: true,
            };
        case LOADING_CURR_STOCK:
            return {
                ...state,
                currStockLoading: true,
            };
        case SET_CURR_STOCK:
            return {
                ...state,
                currStockLoading: false,
            };
        default:
            return state;
    }
}
