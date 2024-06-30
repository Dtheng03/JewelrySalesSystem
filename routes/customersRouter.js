var express = require('express');
var customersRouter = express.Router();
const customersController = require("../controllers/customersController");
const { authenticateToken, isActive } = require("../config/auth")

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
    .get(authenticateToken, isActive, customersController.getAll)

/**
* @swagger
* /api/customers/add:
*   post:
*     tags: [Customers]
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
*               address:
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
customersRouter.route("/add")
    .post(authenticateToken, isActive, customersController.addCustomer)

/**
* @swagger
* /api/customers/{customerId}:
*   get:
*     tags: [Customers]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: customerId
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
customersRouter.route("/:customerId")
    .get(authenticateToken, isActive, customersController.getDetail)

/**
* @swagger
* /api/customers/{customerId}:
*   put:
*     tags: [Customers]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: customerId
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
*               address:
*                 type: string
*                 example: string
*               phone:
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
customersRouter.route("/:customerId")
    .put(authenticateToken, isActive, customersController.updateCustomer)

module.exports = customersRouter;