var express = require("express");
var ordersRouter = express.Router();
const ordersController = require("../controllers/ordersController");
const { authenticateToken } = require("../config/auth");

/**
 * @swagger
 * tags:
 *   name: Orders
 */

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: The ID of the customer
 *               discount:
 *                 type: string
 *                 description: The ID of the promotion
 *               status:
 *                 type: number
 *                 description: The status of the order
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
ordersRouter.post("/create", authenticateToken, ordersController.create);

/**
 * @swagger
 * /api/orders/getAll:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   customerId:
 *                     type: string
 *                   employeeId:
 *                     type: string
 *                   discount:
 *                     type: string
 *                   status:
 *                     type: number
 *                   orderDetails:
 *                     type: array
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
ordersRouter.get("/getAll", authenticateToken, ordersController.getAll);

/**
 * @swagger
 * /api/orders/orderDetail/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerId:
 *                   type: string
 *                 employeeId:
 *                   type: string
 *                 discount:
 *                   type: string
 *                 status:
 *                   type: number
 *                 orderDetails:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

ordersRouter.get(
  "/orderDetail/:id",
  authenticateToken,
  ordersController.getOrderById
);

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   put:
 *     summary: Update order status by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: number
 *                 description: The new status of the order
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
ordersRouter.put(
  "/:orderId/status",
  authenticateToken,
  ordersController.updateStatus
);

module.exports = ordersRouter;
