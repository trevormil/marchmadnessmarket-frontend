import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
} from '../types';
import axios from 'axios';
//logs in the user
export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData(true));
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
};

//gets all user data for Redux
export const getUserData = () => async (dispatch) => {
    let payloadData = {};
    console.time('getUserData');
    await Promise.all([
        axios
            .get('/user')
            .then((res) => {
                window.localStorage.setItem('username', res.data.userName);
                payloadData = {
                    ...payloadData,
                    ...res.data,
                };
            })
            .catch((err) => console.log(err)),
        axios.get('/userStocks').then(async (res) => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => {
                    data.push(stock);
                });
            }
            payloadData = {
                ...payloadData,
                ownedStocks: data,
            };
        }),
    ])
        .then(() => {
            dispatch({
                type: SET_USER,
                payload: payloadData,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
    console.timeEnd('getUserData');
};

//updates user portfolio data
export const updateUserPortfolioData = (currProps) => async (dispatch) => {
    dispatch({ type: LOADING_USER });
    let payloadData = currProps;
    await axios.get('/userStocks').then((res) => {
        let data = [];
        if (res) {
            res.data.forEach((stock) => {
                data.push(stock);
            });
        }
        payloadData.ownedStocks = data;
    });
    await axios
        .get('/stocks')
        .then((res) => {
            payloadData.ownedStocks.forEach((ownedStock) => {
                const stock = res.data.find(
                    (stock) => stock.stockId === ownedStock.stockId
                );
                ownedStock.currPrice = stock.price;
                ownedStock.currPoints = stock.currPoints;
                ownedStock.ipoPrice = stock.ipoPrice;
                ownedStock.totalValue =
                    ownedStock.numShares * ownedStock.currPrice;
            });
        })
        .then(() => {
            dispatch({
                type: SET_USER,
                payload: payloadData,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
};

//updates the owned stocks
export const setOwnedStocks = (currentProps) => async (dispatch) => {
    dispatch({ type: LOADING_USER });
    let payloadData = currentProps;
    await Promise.all([
        await axios.get('/user').then((res) => {
            payloadData = {
                ...payloadData,
                accountBalance: res.data.accountBalance,
            };
        }),
        await axios.get('/userStocks').then(async (res) => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.ownedStocks = data;
        }),
    ])
        .then(() => {
            dispatch({
                type: SET_USER,
                payload: payloadData,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
};

//signs up a user
export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response,
            });
        });
};
//logs out a user
export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.localStorage.removeItem('username');
};

//sets the authorization header for axios as current token
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
