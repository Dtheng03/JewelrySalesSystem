const Categories = require("../models/categories");

class categoriesController {
    // API
    getAll(req, res, next) {
        Categories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
    }
};

module.exports = new categoriesController;