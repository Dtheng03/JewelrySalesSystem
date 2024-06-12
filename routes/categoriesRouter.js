var express = require('express');
var categoriesRouter = express.Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.route("/")
    .get(categoriesController.getAll)

module.exports = categoriesRouter;