const TokenFarm = artifacts.require("TokenFarm");
const StockObj = require("../../functions/stocks.json");
const fs = require("fs");
const path = require("path");

module.exports = async function(callback) {
  let stockName = "Michigan";
  let logoUrl = "https://a.espncdn.com/i/teamlogos/ncaa/500/130.png";
  let seed = 1;
  let bio = "NCAA Team";
  let totalPoints = 3;
  let dividends = "N/A";
  let float = 0;
  let market = "NCAA";
  let tokenFarm = await TokenFarm.deployed();
  await tokenFarm.createStock(
    stockName,
    logoUrl,
    seed,
    bio,
    totalPoints,
    dividends,
    float,
    market
  );
  console.log("test");
  console.log(path.join(process.cwd(), "/functions/stocks.json"));
  const filepath = path.join(process.cwd(), "/functions/stocks.json");
  let rawData = fs.readFileSync(filepath);
  console.log(rawData);
  let obj = JSON.parse(rawData);
  console.log(obj);
  let stockNum = await tokenFarm.stockCount();
  stockNum = stockNum.toNumber();
  obj[stockNum] = stockName;
  console.log(stockNum);
  console.log(obj);
  fs.writeFileSync(filepath, JSON.stringify(obj));
  console.log("Stock created!");
  
  
  callback();
};
