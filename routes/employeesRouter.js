var express = require('express');
var employeesRouter = express.Router();
const employeesController = require("../controllers/employeesController");

employeesRouter.route("/")
    .get(employeesController.getAll)

module.exports = employeesRouter;