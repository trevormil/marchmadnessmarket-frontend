import { SET_USER, /*SET_ERRORS, CLEAR_ERRORS, LOADING_UI, */SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
    loading: false,
    authenticated: false,
    email: "",
    ownedStocks: [],
    accountHistory: [],
    openTrades: [],
    leaderboard: [],
    accountBalance: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                loading: true,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                loading: false,
                authenticated: true,
                ...action.payload
            }
        default:
            return state;
    }
}