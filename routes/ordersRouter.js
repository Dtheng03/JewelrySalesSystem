var express = require('express');
var ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Orders
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ordersRouter.route("/")
    .get(authenticateToken, ordersController.getAll)

module.exports = ordersRouter;