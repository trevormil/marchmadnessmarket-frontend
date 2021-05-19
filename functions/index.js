const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
app.use(cors());

const { getKitMetadata, getContractMetadata } = require("./handlers/kits");

app.get("/contract", getContractMetadata);
app.get("/:id", getKitMetadata);

exports.kits = functions.https.onRequest(app);
