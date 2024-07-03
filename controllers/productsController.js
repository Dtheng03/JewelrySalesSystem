const Products = require("../models/products");

class productsController {
    // API
    getAll(req, res, next) {
        Products.find({})
            .then((products) => {
                res.status(200).json(products)
            })
    }
    // Add a product
    addProduct(req, res, next) {
        const { name, image, price, quantity, description, categoryId } = req.body;
        const newProduct = new Products({ name, image, price, quantity, description, categoryId });
        newProduct.save()
            .then((product) => {
                res.status(201).json(product);
            })
            .catch(next);
    }
    // Update a product
    updateProduct(req, res, next) {
        const { id } = req.params;
        const { name, image, price, quantity, description, categoryId } = req.body;
        Products.findByIdAndUpdate(id, { name, image, price, quantity, description, categoryId }, { new: true })
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json(product);
            })
            .catch(next);
    }
    // Deactivate a product
    deactivateProduct(req, res, next) {
        const { id } = req.params;
        Products.findByIdAndUpdate(id, { isActive: false }, { new: true })
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json(product);
            })
            .catch(next);
    }

    // Delete a product
    deleteProduct(req, res, next) {
        const { id } = req.params;
        Products.findByIdAndDelete(id)
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json({ message: "Product deleted" });
            })
            .catch(next);
    }

    // View product detail
    getProductById(req, res, next) {
        const { id } = req.params;
        Products.findById(id)
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json(product);
            })
            .catch(next);
    }
};

module.exports = new productsController;