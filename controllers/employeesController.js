const Employees = require("../models/employees");

class employeesController {
    // API
    getAll(req, res, next) {
        Employees.find({})
            .then((employees) => {
                res.status(200).json(employees)
            })
    }
};

module.exports = new employeesController;