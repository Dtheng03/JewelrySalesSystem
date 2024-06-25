var express = require('express');
var employeesRouter = express.Router();
const employeesController = require("../controllers/employeesController");
const { authenticateToken } = require("../config/auth")

/**
 * @swagger
 * tags:
 *   name: Employees
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags: [Employees]
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
employeesRouter.route("/")
    .get(authenticateToken, employeesController.getAll)

module.exports = employeesRouter;