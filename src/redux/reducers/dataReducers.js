import { SET_STOCKS, LOADING_STOCKS } from '../types';

const initialState = {
    loading: false,
    errors: null,
    stocks: [],
    filters: [],
    currStock: {
        trades: [],
        stockHistory: null,
        stockData: {
            ipoPrice: null
        }
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STOCKS:
            return {
                loading: false,
                ...action.payload
            };
        case LOADING_STOCKS:
            return {
                ...state,
                loading: true,
            }

        default:
            return state;
    }
}