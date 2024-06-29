const Promotions = require("../models/promotions");

class promotionsController {
    // API
    getAll(req, res, next) {
        Promotions.find({})
            .then((promotions) => {
                res.status(200).json(promotions)
            })
    }
};

module.exports = new promotionsController;