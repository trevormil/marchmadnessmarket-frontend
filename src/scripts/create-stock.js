const TokenFarm = artifacts.require("TokenFarm");

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
  let stockNum = await tokenFarm.createStock(
    stockName,
    logoUrl,
    seed,
    bio,
    totalPoints,
    dividends,
    float,
    market
  );

  
  // Code goes here...
  console.log("Stock created!");
  callback();
};
