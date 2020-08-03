import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/login", userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        });
}

export const getUserData = () => async (dispatch) => {
    let payloadData = {};

    await axios.get('/user').then(res => {
        payloadData = res.data;
    }).catch(err => console.log(err));

    await axios.get('/userTrades').then((res) => {
        payloadData.openTrades = res.data;
    });

    await axios.get("/userStocks")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => {
                    data.push(stock)
                });
            }
            payloadData.ownedStocks = data;
        });
    await axios.get("/leaderboard")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.leaderboard = data;
        });
    await axios.get("/watchlist")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.watchlist = data;
        });
    await axios.get("/transactions").then((res) => {
        let data = [];
        let count = 0;
        if (res) {

            res.data.forEach((transaction) => {
                if (count < 20) {
                    data.push(transaction);
                    count++;
                }
            });
        }
        payloadData.transactions = data;
    });
    //gets account history
    await axios.get("/accountHistory").then((res) => {
        let accountHistory = res.data;
        payloadData.accountHistory = accountHistory;
    });

    await axios.get("/stocks").then(res => {
        payloadData.ownedStocks.forEach(ownedStock => {
            ownedStock.currPrice = res.data.find(stock => stock.stockId === ownedStock.stockId).ipoPrice * (3 / 4);
            ownedStock.totalValue = (ownedStock.numShares) * ownedStock.currPrice;
            ownedStock.totalProfit = (ownedStock.currPrice - ownedStock.avgBuyPrice) * (ownedStock.numShares);
            ownedStock.totalBoughtValue = (ownedStock.numShares) * ownedStock.avgBuyPrice;
        })
    }).then(() => {
        dispatch({
            type: SET_USER,
            payload: payloadData
        })
        dispatch({ type: CLEAR_ERRORS });
    }).catch((err) => {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        })
    })
}
export const updateUserPortfolioData = (currProps) => async (dispatch) => {
    dispatch({ type: LOADING_USER });
    let payloadData = currProps;
    await axios.get("/userStocks")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => {
                    data.push(stock)
                });
            }
            payloadData.ownedStocks = data;
        });
    await axios.get("/transactions").then((res) => {
        let data = [];
        let count = 0;
        if (res) {
            res.data.forEach((transaction) => {

                if (count < 20) {
                    data.push(transaction);
                    count++;
                }

            });
        }
        payloadData.transactions = data;
    });
    await axios.get('/userTrades').then((res) => {
        payloadData.openTrades = res.data;
    });
    await axios.get("/stocks").then(res => {
        payloadData.ownedStocks.forEach(ownedStock => {
            ownedStock.currPrice = res.data.find(stock => stock.stockId === ownedStock.stockId).ipoPrice * (3 / 4);
            ownedStock.totalValue = (ownedStock.numShares) * ownedStock.currPrice;
            ownedStock.totalProfit = (ownedStock.currPrice - ownedStock.avgBuyPrice) * (ownedStock.numShares);
            ownedStock.totalBoughtValue = (ownedStock.numShares) * ownedStock.avgBuyPrice;
        })
    }).then(() => {
        dispatch({
            type: SET_USER,
            payload: payloadData
        })
    }).catch((err) => {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        })
    })
}


export const setUserWatchlist = (currentProps, stockId, addTo) => async (dispatch) => {
    dispatch({ type: LOADING_USER });
    let payloadData = currentProps;

    const promise = addTo ? axios.post(`/watchlist/${stockId}`) : axios.delete(`/watchlist/${stockId}`);
    await promise;
    axios.get("/watchlist")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.watchlist = data;
        }).then(() => {
            dispatch({
                type: SET_USER,
                payload: payloadData
            })
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        })
}

export const setOwnedStocks = (currentProps) => async (dispatch) => {
    dispatch({ type: LOADING_USER });
    let payloadData = currentProps;

    await axios.get('/user').then(res => {
        payloadData.accountBalance = res.data.accountBalance;
    });
    await axios.get("/userStocks")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.ownedStocks = data;
        })
    await axios.get('/userTrades').then((res) => {
        payloadData.openTrades = res.data;
    });
    await axios.get("/stocks").then(res => {
        payloadData.ownedStocks.forEach(ownedStock => {
            ownedStock.currPrice = res.data.find(stock => stock.stockId === ownedStock.stockId).ipoPrice * 3 / 4;
            ownedStock.totalValue = (ownedStock.numShares) * ownedStock.currPrice;
            ownedStock.totalProfit = (ownedStock.currPrice - ownedStock.avgBuyPrice) * (ownedStock.numShares);
            ownedStock.totalBoughtValue = (ownedStock.numShares) * ownedStock.avgBuyPrice;
        })
    }).then(() => {
        dispatch({
            type: SET_USER,
            payload: payloadData
        })
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        })
    })

}



export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/signup", newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            })
        });
}

export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}