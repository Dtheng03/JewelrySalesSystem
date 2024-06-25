var express = require('express');
var productsRouter = express.Router();
const productsController = require("../controllers/productsController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
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
productsRouter.route("/")
    .get(authenticateToken, productsController.getAll)

module.exports = productsRouter;