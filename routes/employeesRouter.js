var express = require('express');
var employeesRouter = express.Router();
const employeesController = require("../controllers/employeesController");
const { authenticateToken, isAdmin } = require("../config/auth")

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
    .get(authenticateToken, isAdmin, employeesController.getAll)

/**
* @swagger
* /api/employees/login:
*   post:
*     tags: [Employees]
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 example: string
*               password:
*                 type: string
*                 example: string
*     responses:
*       200:
*         description: Thành công
*         content:
*           application/json:
*             schema:
*               type: object
*/
employeesRouter.route("/login")
    .post(employeesController.login)

/**
* @swagger
* /api/employees/create:
*   post:
*     tags: [Employees]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: string
*               email:
*                 type: string
*                 example: string
*               phone:
*                 type: string
*                 example: string
*               gender:
*                 type: boolean
*                 example: true
*     responses:
*       200:
*         description: Thành công
*         content:
*           application/json:
*             schema:
*               type: object
*/
employeesRouter.route("/create")
    .post(authenticateToken, isAdmin, employeesController.createAccount)

/**
* @swagger
* /api/employees/change-status/{employeeId}:
*   put:
*     tags: [Employees]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: employeeId
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Thành công
*         content:
*           application/json:
*             schema:
*               type: object
*/
employeesRouter.route("/change-status/:employeeId")
    .put(authenticateToken, isAdmin, employeesController.changeStatus)

/**
* @swagger
* /api/employees/{employeeId}:
*   get:
*     tags: [Employees]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: employeeId
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Thành công
*         content:
*           application/json:
*             schema:
*               type: object
*/
employeesRouter.route("/:employeeId")
    .get(authenticateToken, isAdmin, employeesController.getDetail)

/**
* @swagger
* /api/employees/{employeeId}:
*   put:
*     tags: [Employees]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: employeeId
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               phone:
*                 type: string
*                 example: string
*               status:
*                 type: boolean
*                 example: true
*     responses:
*       200:
*         description: Thành công
*         content:
*           application/json:
*             schema:
*               type: object
*/
employeesRouter.route("/:employeeId")
    .put(authenticateToken, isAdmin, employeesController.updateEmployee)

module.exports = employeesRouter;