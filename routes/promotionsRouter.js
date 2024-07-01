const express = require("express");
const promotionsRouter = express.Router();
const promotionsController = require("../controllers/promotionsController");
const { authenticateToken } = require("../config/auth");

/**
 * @swagger
 * tags:
 *   name: Promotions
 */

/**
 * @swagger
 * /api/promotions/getAll:
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 */
promotionsRouter
  .route("/getAll")
  .get(authenticateToken, promotionsController.getAll);

/**
 * @swagger
 * /api/promotions/{id}:
 *   get:
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       404:
 *         description: Promotion not found
 */
promotionsRouter
  .route("/:id")
  .get(authenticateToken, promotionsController.getById);

/**
 * @swagger
 * /api/promotions/getByCode:
 *   get:
 *     tags: [Promotions]
 *     parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         description: Promotion code to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Bad request
 *       404:
 *         description: No promotions found
 */
promotionsRouter
  .route("/getByCode/:id")
  .get(authenticateToken, promotionsController.getByCode);

/**
 * @swagger
 * /api/promotions/create:
 *   post:
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *             example:
 *               name: "Summer Sale"
 *               code: "SS20"
 *               percent: 20
 *               startDate: "2024-07-01"
 *               endDate: "2024-07-31"
 *               status: true
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Bad request
 */
promotionsRouter
  .route("/create")
  .post(authenticateToken, promotionsController.create);

/**
 * @swagger
 * /api/promotions/update/{id}:
 *   put:
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *           example:
 *             name: "Winter Sale"
 *             code: "WS20"
 *             percent: 15
 *             startDate: "2024-12-01"
 *             endDate: "2024-12-31"
 *             status: true
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       404:
 *         description: Promotion not found
 *       400:
 *         description: Bad request
 */
promotionsRouter
  .route("/update/:id")
  .put(authenticateToken, promotionsController.update);

// Router for updating promotion status
/**
 * @swagger
 * /api/promotions/status/{id}:
 *   put:
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *             example:
 *               status: true
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Promotion not found
 */
promotionsRouter
  .route("/status/:id")
  .put(authenticateToken, promotionsController.updateStatus);

/**
 * @swagger
 * /api/promotions/delete/{id}:
 *   delete:
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Promotion deleted
 *       404:
 *         description: Promotion not found
 */
promotionsRouter
  .route("/delete/:id")
  .delete(authenticateToken, promotionsController.delete);

module.exports = promotionsRouter;
