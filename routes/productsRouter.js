var express = require('express');
var productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.route("/")
    .get(productsController.getAll)

module.exports = productsRouter;