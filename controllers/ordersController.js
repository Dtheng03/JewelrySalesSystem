const Orders = require("../models/orders");

class ordersController {
    // API
    getAll(req, res, next) {
        Orders.find({})
            .then((orders) => {
                res.status(200).json(orders)
            })
    }
};

module.exports = new ordersController;