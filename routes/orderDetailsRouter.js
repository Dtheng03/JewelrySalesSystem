var express = require("express");
var orderDetailsRouter = express.Router();
const orderDetailsController = require("../controllers/orderDetailsController");
const { authenticateToken } = require("../config/auth");

/**
 * @swagger
 * tags:
 *   name: Order Details
 */

// /**
//  * @swagger
//  * /api/orderDetails:
//  *   get:
//  *     tags: [Order Details]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Thành công
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  */
// orderDetailsRouter.route("/")
//     .get(authenticateToken, orderDetailsController.getAll)

module.exports = orderDetailsRouter;
