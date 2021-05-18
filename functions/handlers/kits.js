const fs = require("fs");

exports.getKitMetadata = async (req, res) => {  
  let jsonData = JSON.parse(fs.readFileSync("../../src/abis/TokenFarm.json", "utf-8"));
  let id = req.params.id;
  /*
  const web3 = window.web3;

  const networkId = await web3.eth.net.getId();
  const tokenFarmData = TokenFarm.networks[networkId];
  if (tokenFarmData) {
    const tokenFarm = new web3.eth.Contract(
      TokenFarm.abi,
      tokenFarmData.address
    );
    let numStocks = await tokenFarm.methods.stockCount().call();
  }*/
  return res.send(jsonData);
};
