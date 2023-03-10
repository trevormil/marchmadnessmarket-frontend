import {
    SET_STOCKS,
    LOADING_STOCKS,
    LOADING_SCORES,
    SET_SCORES,
    LOADING_OTHER_USER_STOCKS,
    SET_OTHER_USER_STOCKS,
} from '../types';
import axios from 'axios';
import { sort, filterStocks } from '../../helpers/filterFunctions';

//gets all stocks and updates  data
export const getStocks = (currProps, filterArr) => async (dispatch) => {
    if (currProps.loading) return;

    let payloadData = currProps;
    if (currProps.leaderboard && currProps.leaderboard.length !== 0) {
        payloadData.stocks = sort(
            filterStocks(payloadData.stocks, filterArr),
            'seed',
            'asc'
        );
        payloadData.filters = filterArr;
        dispatch({
            type: SET_STOCKS,
            payload: payloadData,
        });
        return;
    }

    console.time('getting stocks');

    console.log('Fetching stocks');

    dispatch({ type: LOADING_STOCKS });
    await Promise.all([
        axios.get('/leaderboard').then((res) => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.leaderboard = data;
        }),
        axios.get('/stocks').then((res) => {
            payloadData.stocks = sort(
                filterStocks(res.data, filterArr),
                'seed',
                'asc'
            );
            payloadData.filters = filterArr;
            payloadData.currStock = {
                trades: [],
                stockHistory: [],
                stockData: {
                    price: null,
                },
            };
            payloadData.trades = [];
        }),
    ])
        .then(() => {
            console.timeEnd('getting stocks');
            console.time('dispatch');
            dispatch({
                type: SET_STOCKS,
                payload: payloadData,
            });
            console.timeEnd('dispatch');
        })
        .catch((err) => {
            dispatch({
                type: SET_STOCKS,
                payload: [],
            });
        });
};

//gets all stocks and updates  data
export const getScores = (currProps, filterArr) => async (dispatch) => {
    if (currProps.loading) return;

    let payloadData = currProps;
    if (currProps.scores && currProps.scores.length !== 0) {
        return;
    }

    dispatch({ type: LOADING_SCORES });

    console.log('Fetching scores');

    await axios
        .get('/scores')
        .then((res) => {
            payloadData.scores = res.data;
            console.log("SCORES FORMAT", res.data);

            dispatch({
                type: SET_SCORES,
                payload: payloadData,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_SCORES,
                payload: {
                    scores: [],
                    loading: false,
                },
            });
        });
};

//gets all stocks and updates  data
export const getOtherUserStocks = (userId) => async (dispatch) => {
    dispatch({ type: LOADING_OTHER_USER_STOCKS });
    let payloadData = {};
    userId = userId.replace("'", '’');
    console.log('Fetching other user stocks');
    await axios
        .get(`/userStocks/${userId}`)
        .then((res) => {
            payloadData.stocks = res.data.sort((a, b) => {
                if (!a.currPoints) {
                    a.currPoints = 0;
                }
                if (!b.currPoints) {
                    b.currPoints = 0;
                }

                if (
                    b.currPoints * b.numShares - a.currPoints * a.numShares !==
                    0
                ) {
                    return (
                        b.currPoints * b.numShares - a.currPoints * a.numShares
                    );
                } else {
                    return b.numShares - a.numShares;
                }
            });
            dispatch({
                type: SET_OTHER_USER_STOCKS,
                payload: payloadData,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_OTHER_USER_STOCKS,
                payload: {
                    scores: [],
                },
            });
        });
};

//gets single stock info and stores it in currStock
export const getCurrStock =
    (currProps, filterArr, stockId) => async (dispatch) => {
        if (currProps.loading) return;

        let payloadData = currProps;

        let fetchedStock = undefined;
        if (payloadData.stocks) {
            fetchedStock = payloadData.stocks.find((stock) => {
                return stock.stockId === stockId;
            });
        }

        if (fetchedStock) {
            payloadData.currStock.stockData = fetchedStock;
        } else {
            dispatch({ type: LOADING_STOCKS });
            console.log('Fetching curr stock data');
            await axios.get(`/stocks/${stockId}`).then((res) => {
                payloadData.currStock.stockData = res.data;
            });
        }

        // await axios.get(`/trades/all/${stockId}`).then((res) => {
        //     let allTrades = [];
        //     res.data.forEach((trade) => {
        //         if (trade.completed === false) {
        //             allTrades.push(trade);
        //         }
        //     });
        //     payloadData.currStock.trades = allTrades;
        // });

        // await axios.get(`/stocks/${stockId}/stockHistory`).then((res) => {
        //     payloadData.currStock.stockHistory = res.data;
        // });

        dispatch({
            type: SET_STOCKS,
            payload: payloadData,
        });
    };
//gets all open trades for current stock
// export const getAllTrades = (currProps) => async (dispatch) => {
//     dispatch({ type: LOADING_STOCKS });
//     let payloadData = currProps;

//     await axios
//         .get(`/trades`)
//         .then((res) => {
//             let allTrades = [];
//             res.data.forEach((trade) => {
//                 if (trade.completed === false) {
//                     allTrades.push(trade);
//                 }
//             });
//             payloadData.trades = allTrades;
//         })
//         .then(() => {
//             dispatch({
//                 type: SET_STOCKS,
//                 payload: payloadData,
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: SET_STOCKS,
//                 payload: payloadData,
//             });
//         });
// };

// //gets all open trades for current stock
// export const getTradesForCurrStock =
//     (currProps, stockId) => async (dispatch) => {
//         dispatch({ type: LOADING_STOCKS });
//         let payloadData = currProps;

//         await axios
//             .get(`/trades/all/${stockId}`)
//             .then((res) => {
//                 let allTrades = [];
//                 res.data.forEach((trade) => {
//                     if (trade.completed === false) {
//                         allTrades.push(trade);
//                     }
//                 });
//                 payloadData.currStock.trades = allTrades;
//             })
//             .then(() => {
//                 dispatch({
//                     type: SET_STOCKS,
//                     payload: payloadData,
//                 });
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: SET_STOCKS,
//                     payload: [],
//                 });
//             });
//     };

//sets stocks with updated filters
export const setStocks = (currProps, filterArr) => (dispatch) => {
    if (currProps.loading) return;

    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;
    payloadData.stocks = filterStocks(currProps.stocks, filterArr);
    payloadData.filters = filterArr;
    dispatch({
        type: SET_STOCKS,
        payload: payloadData,
    });
};

//sorts and updates all stocks
export const sortCurrStocks =
    (currProps, orderBy, dir, watchlist) => (dispatch) => {
        if (currProps.loading) return;

        dispatch({ type: LOADING_STOCKS });
        let payloadData = currProps;
        payloadData.stocks = sort(currProps.stocks, orderBy, dir, watchlist);
        dispatch({
            type: SET_STOCKS,
            payload: payloadData,
        });
    };
