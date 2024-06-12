var express = require('express');
var ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");

ordersRouter.route("/")
    .get(ordersController.getAll)

module.exports = ordersRouter;