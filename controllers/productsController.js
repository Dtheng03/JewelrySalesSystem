const Products = require("../models/products");

class productsController {
    // API
    getAll(req, res, next) {
        Products.find({})
            .then((products) => {
                res.status(200).json(products)
            })
    }
};

module.exports = new productsController;