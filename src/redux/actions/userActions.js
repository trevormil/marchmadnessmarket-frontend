import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/login", userData)
        .then(res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
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

    await axios.get("/userStocks")
        .then(res => {
            let data = [];
            if (res) {
                res.data.forEach((stock) => data.push(stock));
            }
            payloadData.ownedStocks = data;
        })
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            dispatch({
                type: SET_USER,
                payload: payloadData
            })
        })
        .catch((err) => {
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
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        }).catch(err => {
            console.log(err);
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