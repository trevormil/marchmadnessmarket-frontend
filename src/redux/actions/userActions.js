import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";
import Web3 from "web3";
import DaiToken from "../../abis/DaiToken.json";
import DappToken from "../../abis/DappToken.json";
import TokenFarm from "../../abis/TokenFarm.json";

//gets all user data for Redux
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });

  const web3 = window.web3;
  let payloadData = {};
  const accounts = await web3.eth.getAccounts();
  const userAccount = accounts[0];
  payloadData.address = userAccount;
  const networkId = await web3.eth.net.getId();
  // Load DaiToken
  const daiTokenData = DaiToken.networks[networkId];
  if (daiTokenData) {
    const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
    let daiTokenBalance = await daiToken.methods.balanceOf(userAccount).call();
    payloadData.daiTokenBalance = daiTokenBalance;
  } else {
    window.alert("DaiToken contract not deployed to detected network.");
  }
  console.log("2");
  // Load DappToken
  const dappTokenData = DappToken.networks[networkId];
  if (dappTokenData) {
    const dappToken = new web3.eth.Contract(
      DappToken.abi,
      dappTokenData.address
    );
    let dappTokenBalance = await dappToken.methods
      .balanceOf(userAccount)
      .call();
    payloadData.dappTokenBalance = dappTokenBalance;
  } else {
    window.alert("DappToken contract not deployed to detected network.");
  }
  payloadData.ownedStocks = [];

  const tokenFarmData = TokenFarm.networks[networkId];
  if (tokenFarmData) {
    const tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    );
    let stakingBalance = await tokenFarm.methods
      .stakingBalance(userAccount)
      .call();
    console.log(stakingBalance);
    payloadData.stakingBalance = stakingBalance;
    let numStocks = await tokenFarm.methods.numStakes(userAccount).call();
    let userStakes = [];
    for (let i = 0; i < numStocks; i++) {
      const stockName = await tokenFarm.methods
        .stakeNames(userAccount, i)
        .call();

      const stakeAmt = await tokenFarm.methods
        .stakes(userAccount, stockName)
        .call();
      userStakes.push({
        stockName,
        numShares: stakeAmt,
      });
    }
    payloadData.ownedStocks = userStakes;
  } else {
    window.alert("TokenFarm contract not deployed to detected network.");
  }
  console.log(payloadData);
  dispatch({
    type: SET_USER,
    payload: payloadData,
  });

  /*
  await axios.get("/userStocks").then((res) => {
    let data = [];
    if (res) {
      res.data.forEach((stock) => {
        data.push(stock);
      });
    }
    payloadData.ownedStocks = data;
  });
  */
  /*
  await axios.get("/leaderboard").then((res) => {
    let data = [];
    if (res) {
      res.data.forEach((stock) => data.push(stock));
    }
    console.log(data);
    payloadData.leaderboard = data;
  });*/
  /*
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
    accountHistory.sort((a, b) => {
      const dateArrA = a.time.split("/");
      const dateArrB = b.time.split("/");
      if (Number(dateArrA[2]) < Number(dateArrB[2])) return -1;
      else if (Number(dateArrA[2]) > Number(dateArrB[2])) return 1;
      else {
        if (Number(dateArrA[0]) < Number(dateArrB[0])) return -1;
        else if (Number(dateArrA[0]) > Number(dateArrB[0])) return 1;
        else {
          if (Number(dateArrA[1]) < Number(dateArrB[1])) return -1;
          else if (Number(dateArrA[1]) > Number(dateArrB[1])) return 1;
        }
      }
      return 0;
    });
    payloadData.accountHistory = accountHistory;
  });*/
  /*
  await axios
    .get("/stocks")
    .then((res) => {
      payloadData.ownedStocks.forEach((ownedStock) => {
        const stock = res.data.find(
          (stock) => stock.stockId === ownedStock.stockId
        );
        ownedStock.currPrice = stock.price;
        ownedStock.currPoints = stock.currPoints;
        ownedStock.ipoPrice = stock.ipoPrice;
        ownedStock.totalValue = ownedStock.numShares * ownedStock.currPrice;
      });
    })
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
    });*/
};

//updates user portfolio data
export const updateUserPortfolioData = (currProps) => async (dispatch) => {
  console.log("Afuahk");
  dispatch({ type: SET_USER, payload: currProps });
  /*
  dispatch({ type: LOADING_USER });
  let payloadData = currProps;
  await axios.get("/userStocks").then((res) => {
    let data = [];
    if (res) {
      res.data.forEach((stock) => {
        data.push(stock);
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
  await axios.get("/userTrades").then((res) => {
    payloadData.openTrades = res.data;
  });
  await axios
    .get("/stocks")
    .then((res) => {
      payloadData.ownedStocks.forEach((ownedStock) => {
        const stock = res.data.find(
          (stock) => stock.stockId === ownedStock.stockId
        );
        ownedStock.currPrice = stock.price;
        ownedStock.currPoints = stock.currPoints;
        ownedStock.ipoPrice = stock.ipoPrice;
        ownedStock.totalValue = ownedStock.numShares * ownedStock.currPrice;
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
    });*/
};

//updates the owned stocks
export const setOwnedStocks = (currentProps) => async (dispatch) => {
  console.log("ASFJH");
  dispatch({ type: SET_USER, payload: currentProps });
  /*
  dispatch({ type: LOADING_USER });
  let payloadData = currentProps;

  await axios.get("/user").then((res) => {
    payloadData.accountBalance = res.data.accountBalance;
  });
  await axios.get("/userStocks").then((res) => {
    let data = [];
    if (res) {
      res.data.forEach((stock) => data.push(stock));
    }
    payloadData.ownedStocks = data;
  });
  await axios.get("/userTrades").then((res) => {
    payloadData.openTrades = res.data;
  });
  await axios
    .get("/stocks")
    .then((res) => {
      payloadData.ownedStocks.forEach((ownedStock) => {
        const stock = res.data.find(
          (stock) => stock.stockId === ownedStock.stockId
        );
        ownedStock.currPrice = stock.price;
        ownedStock.currPoints = stock.currPoints;
        ownedStock.ipoPrice = stock.ipoPrice;
        ownedStock.totalValue = ownedStock.numShares * ownedStock.currPrice;
      });
    })
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
    });*/
};
