const express = require("express");
const path = require("path");
const router = express.Router();

const { fileReaderAsync, fileWriteAsync } = require(path.join(`${__dirname}/../../fileReader.js`));
const orderFilePath = path.join(`${__dirname}/../../data/order.json`);

router.route("/").get(getAllOrder).post(writeOrderToFile);

async function getAllOrder(req, res) {
  try {
    const orderFileData = await fileReaderAsync(orderFilePath);
    const orders = JSON.parse(orderFileData.toString());

    if (orders) {
      res.json(orders.order);
    }
  } catch (error) {
    console.log(error);
  }
}

async function writeOrderToFile(req, res) {
  try {
    const status = await fileWriteAsync(orderFilePath, JSON.stringify(req.body, null, 4));
    if (status) {
      console.log(status);
      res.json(status);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
