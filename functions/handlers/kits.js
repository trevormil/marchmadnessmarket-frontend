const fs = require("fs");
const path = require("path");

const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");

exports.getKitMetadata = async (req, res) => {
  let filepath = "stocks.json";
  let id = Number(req.params.id);
  let rawData = fs.readFileSync(filepath);
  console.log(rawData);
  let obj = JSON.parse(rawData);
  let adjId = Math.floor((id - 1) / 16) + 1;
  let stockName = obj[adjId];
  let base = "";
  let rarity = "";
  let imagePath = "";
  let imageArr = [];
  if ((id - 1) % 16 < 10) {
    base = "Gold";
    rarity = ((id - 1) % 16) + 1 + "/10";
    imageArr.push("./images/goldbasejersey.png");
    imagePath = "https://kryptokits.s3.amazonaws.com/kits/goldbasejersey.png";
  } else if ((id - 1) % 16 < 15) {
    base = "Blue";
    rarity = ((id - 1) % 16) + 1 - 10 + "/5";
    imageArr.push("./images/bluebasejersey.png");
    imagePath = "https://kryptokits.s3.amazonaws.com/kits/bluebasejersey.png";
  } else {
    base = "Pink";
    rarity = "1/1";
    imageArr.push("./images/pinkbasejersey.png");
    imagePath = "https://kryptokits.s3.amazonaws.com/kits/pinkbasejersey.png";
  }

  let name = `${stockName} ${base} Kit #${rarity}`;
  let description = `${base} kit for ${stockName}, and this kit is numbered ${rarity}`;
  let external_url = `https://tm-market.web.app/stocks/${stockName}`;
  return res.json({
    name,
    description,
    external_url,
    image: imagePath,
  });
  /*
  let image = "";

  mergeImages(imageArr, {
    Canvas: Canvas,
    Image: Image,
  }).then((b64) => {
    return res.json({
      name,
      description,
      external_url,
      image: b64,
    });
  });*/
};

exports.getContractMetadata = async (req, res) => {
  return res.json({
    description: "Kits.",
    external_link: "https://tm-market.web.app",
    image:
      "https://www.pinclipart.com/picdir/middle/369-3693352_poorly-drawn-city-jerseys-clipart.png",
    name: "KryptoKits",
  });
};
