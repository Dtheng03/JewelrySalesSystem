const OrderDetails = require("../models/orderDetails");

class orderDetailsController {
    // API
    getAll(req, res, next) {
        OrderDetails.find({})
            .then((orderDetails) => {
                res.status(200).json(orderDetails)
            })
    }
};

module.exports = new orderDetailsController;