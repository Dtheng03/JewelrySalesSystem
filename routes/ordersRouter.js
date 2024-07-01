var express = require("express");
var ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");
const { authenticateToken } = require("../config/auth");

/**
 * @swagger
 * tags:
 *   name: Orders
 */

module.exports = ordersRouter;
