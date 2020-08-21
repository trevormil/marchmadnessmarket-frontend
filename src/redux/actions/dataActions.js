import { SET_STOCKS, LOADING_STOCKS } from '../types';
import axios from 'axios';
import { sort, filterStocks } from '../../helpers/filterFunctions';


export const getStocks = (filterArr) => (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = {};

    axios
        .get('/stocks')
        .then((res) => {
            payloadData.stocks = sort(filterStocks(res.data, filterArr), "stockName", "asc")
            payloadData.filters = filterArr;
            payloadData.currStock = {
                trades: [],
                stockHistory: [],
                stockData: {
                    price: null,
                }
            }
            dispatch({
                type: SET_STOCKS,
                payload: payloadData
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_STOCKS,
                payload: []
            });
        });
}

export const getCurrStock = (currProps, filterArr, stockId) => async (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;

    await axios
        .get(`/stocks/${stockId}`)
        .then((res) => {
            payloadData.currStock.stockData = res.data;
        })

    await axios.get(`/trades/all/${stockId}`).then(res => {
        let allTrades = [];
        res.data.forEach(trade => {
            if (trade.completed === false) {
                allTrades.push(trade);
            }
        })
        payloadData.currStock.trades = allTrades;
    });

    await axios.get(`/stocks/${stockId}/stockHistory`).then((res) => {
        payloadData.currStock.stockHistory = res.data;
    }).then(() => {
        dispatch({
            type: SET_STOCKS,
            payload: payloadData
        });
    }).catch((err) => {
        dispatch({
            type: SET_STOCKS,
            payload: []
        });
    });
}

export const getTradesForCurrStock = (currProps, stockId) => async (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;

    await axios.get(`/trades/all/${stockId}`).then(res => {
        let allTrades = [];
        res.data.forEach(trade => {
            if (trade.completed === false) {
                allTrades.push(trade);
            }
        })
        payloadData.currStock.trades = allTrades;
    }).then(() => {
        dispatch({
            type: SET_STOCKS,
            payload: payloadData
        });
    }).catch((err) => {
        dispatch({
            type: SET_STOCKS,
            payload: []
        });
    });
}

export const setStocks = (currProps, filterArr) => (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;
    payloadData.stocks = filterStocks(currProps.stocks, filterArr);
    payloadData.filters = filterArr;
    dispatch({
        type: SET_STOCKS,
        payload: payloadData
    });
}

export const sortCurrStocks = (currProps, orderBy, dir, watchlist) => (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;
    payloadData.stocks = sort(currProps.stocks, orderBy, dir, watchlist);
    dispatch({
        type: SET_STOCKS,
        payload: payloadData
    });
}


