const express = require("express");
const path = require("path");
const router = express.Router();

const { fileReaderAsync } = require(path.join(`${__dirname}/../../fileReader.js`));
const pizzasFilePath = path.join(`${__dirname}/../../data/pizzas.json`);

router.route("/").get(getAllPizza);

async function getAllPizza(req, res) {
  try {
    const pizzasFileData = await fileReaderAsync(pizzasFilePath);
    const pizzas = JSON.parse(pizzasFileData.toString());
    if (pizzas) {
      res.json(pizzas.Pizzas);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
