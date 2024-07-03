var express = require('express');
var categoriesRouter = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
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
categoriesRouter.route("/")
    .get(authenticateToken, categoriesController.getAll)
    .post( categoriesController.createCategory);
categoriesRouter.route("/:id")
    .get(authenticateToken, categoriesController.getCategoryById)
    .put(authenticateToken, categoriesController.updateCategory)
    .delete(authenticateToken, categoriesController.deleteCategory);

module.exports = categoriesRouter;