var express = require('express');
var orderDetailsRouter = express.Router();
const orderDetailsController = require("../controllers/orderDetailsController");

orderDetailsRouter.route("/")
    .get(orderDetailsController.getAll)

module.exports = orderDetailsRouter;