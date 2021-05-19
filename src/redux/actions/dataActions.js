import {
  SET_STOCKS,
  LOADING_STOCKS,
  LOADING_SCORES,
  SET_SCORES,
  LOADING_OTHER_USER_STOCKS,
  SET_OTHER_USER_STOCKS,
} from "../types";
import axios from "axios";
import { sort, filterStocks } from "../../helpers/filterFunctions";
import Web3 from "web3";
import DaiToken from "../../abis/DaiToken.json";
import DappToken from "../../abis/DappToken.json";
import TokenFarm from "../../abis/TokenFarm.json";
//gets all stocks and updates  data
export const getStocks = (filterArr) => async (dispatch) => {
  dispatch({ type: LOADING_STOCKS });
  const web3 = window.web3;

  const networkId = await web3.eth.net.getId();
  let payloadData = {};
  const tokenFarmData = TokenFarm.networks[networkId];
  if (tokenFarmData) {
    const tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    );
    let numStocks = await tokenFarm.methods.stockCount().call();
    let stocks = [];
    for (let i = 0; i < numStocks; i++) {
      let currStock = await tokenFarm.methods.stocks(i).call();
      stocks.push({
        stockName: currStock.stockName,
        imageUrl: currStock.imageUrl,
        seed: currStock.seed,
        bio: currStock.bio,
        currPoints: currStock.currPoints,
        dividends: currStock.dividends,
        float: currStock.float,
        market: currStock.market,
        stockNum: i,
      });
    }
    payloadData.stocks = sort(
      filterStocks(stocks, filterArr),
      "currPoints",
      "asc"
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
    dispatch({
      type: SET_STOCKS,
      payload: payloadData,
    });
  } else {
    window.alert("TokenFarm contract not deployed to detected network.");
  }
};

//gets all stocks and updates  data
export const getScores = (filterArr) => (dispatch) => {
  dispatch({ type: LOADING_SCORES });

  let payloadData = {};
  const url =
    "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";
  fetch(url, {
    method: "get",
  })
    .then((data) => data.json())
    .then((response) => {
      let scores = [];

      response["events"].forEach((element) => {
        let gameInfo = {};
        gameInfo.name = element["name"];
        gameInfo.shortName = element["shortName"];
        gameInfo.score = [];

        element["competitions"].forEach((elem) => {
          elem["competitors"].forEach((e) => {
            gameInfo.score.push({
              score: e["score"],
              logo: e["team"]["logo"],
            });
          });
        });
        scores.push(gameInfo);
        payloadData.scores = scores;
        dispatch({
          type: SET_SCORES,
          payload: payloadData,
        });
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCORES,
        payload: {
          scores: [],
        },
      });
    });
};

//gets all stocks and updates  data
export const getOtherUserStocks = (userId) => (dispatch) => {
  dispatch({ type: LOADING_OTHER_USER_STOCKS });
  let payloadData = {};

  axios
    .get(`/userStocks/${userId}`)
    .then((res) => {
      console.log(res.data);
      payloadData.stocks = res.data;
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
    dispatch({ type: LOADING_STOCKS });
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    let payloadData = currProps;
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );

      let currStockIdx = await tokenFarm.methods.stockNames(stockId).call();
      let currStock = await tokenFarm.methods.stocks(currStockIdx - 1).call();
      let formCurrStock = {
        stockName: currStock.stockName,
        imageUrl: currStock.imageUrl,
        seed: currStock.seed,
        bio: currStock.bio,
        currPoints: currStock.currPoints,
        dividends: currStock.dividends,
        float: currStock.float,
        market: currStock.market,
        stockNum: currStockIdx,
      };
      payloadData.currStock.stockData = formCurrStock;
      console.log(formCurrStock);
      dispatch({
        type: SET_STOCKS,
        payload: payloadData,
      });
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }
  };

//gets all open trades for current stock
export const getAllTrades = (currProps) => async (dispatch) => {
  dispatch({ type: LOADING_STOCKS });
  let payloadData = currProps;

  await axios
    .get(`/trades`)
    .then((res) => {
      let allTrades = [];
      res.data.forEach((trade) => {
        if (trade.completed === false) {
          allTrades.push(trade);
        }
      });
      payloadData.trades = allTrades;
    })
    .then(() => {
      dispatch({
        type: SET_STOCKS,
        payload: payloadData,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_STOCKS,
        payload: payloadData,
      });
    });
};

//gets all open trades for current stock
export const getTradesForCurrStock =
  (currProps, stockId) => async (dispatch) => {
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;

    await axios
      .get(`/trades/all/${stockId}`)
      .then((res) => {
        let allTrades = [];
        res.data.forEach((trade) => {
          if (trade.completed === false) {
            allTrades.push(trade);
          }
        });
        payloadData.currStock.trades = allTrades;
      })
      .then(() => {
        dispatch({
          type: SET_STOCKS,
          payload: payloadData,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_STOCKS,
          payload: [],
        });
      });
  };

//sets stocks with updated filters
export const setStocks = (currProps, filterArr) => (dispatch) => {
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
    dispatch({ type: LOADING_STOCKS });
    let payloadData = currProps;
    payloadData.stocks = sort(currProps.stocks, orderBy, dir, watchlist);
    dispatch({
      type: SET_STOCKS,
      payload: payloadData,
    });
  };
