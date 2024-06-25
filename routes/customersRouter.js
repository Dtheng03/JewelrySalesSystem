var express = require('express');
var customersRouter = express.Router();
const customersController = require("../controllers/customersController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Customers
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     tags: [Customers]
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
customersRouter.route("/")
    .get(authenticateToken, customersController.getAll)

module.exports = customersRouter;