var express = require('express');
var promotionsRouter = express.Router();
const promotionsController = require("../controllers/promotionsController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Promotions
 */

/**
 * @swagger
 * /api/promotions:
 *   get:
 *     tags: [Promotions]
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
promotionsRouter.route("/")
    .get(authenticateToken, promotionsController.getAll)

module.exports = promotionsRouter;