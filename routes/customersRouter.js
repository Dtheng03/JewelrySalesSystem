var express = require('express');
var customersRouter = express.Router();
const customersController = require("../controllers/customersController");

customersRouter.route("/")
    .get(customersController.getAll)

module.exports = customersRouter;