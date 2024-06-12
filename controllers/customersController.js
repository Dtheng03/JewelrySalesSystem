const Customers = require("../models/customers");

class customersController {
    // API
    getAll(req, res, next) {
        Customers.find({})
            .then((customers) => {
                res.status(200).json(customers)
            })
    }
};

module.exports = new customersController;