const Products = require("../models/products");

class productsController {
    // API
    getAll(req, res, next) {
        Products.find({})
            .populate('categoryId', 'name') // Populating categoryId to get category name
            .then((products) => {
                res.status(200).json(products);
            })
            .catch(next);
    }
    addProduct(req, res, next) {
        const { name, image, price, quantity, description, categoryId } = req.body;
    
        // Validate required fields
        if (!name || !description || !categoryId || !image || price == null || quantity == null) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        // Validate name and description
        if (name.trim() === "" || description.trim() === "") {
            return res.status(400).json({ error: "Name and description cannot be empty or just spaces" });
        }
    
        // Validate price and quantity
        if (price <= 0 || quantity <= 0) {
            return res.status(400).json({ error: "Price and quantity must be greater than 0" });
        }
    
        const newProduct = new Products({ name: name.trim(), image, price, quantity, description: description.trim(), categoryId });
        newProduct.save()
            .then((product) => {
                res.status(201).json(product);
            })
            .catch(next);
    }
    
    updateProduct(req, res, next) {
        const { id } = req.params;
        const { name, image, price, quantity, description, categoryId } = req.body;
    
        // Validate required fields
        if (!name || !description || !categoryId || !image || price == null || quantity == null) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        // Validate name and description
        if (name.trim() === "" || description.trim() === "") {
            return res.status(400).json({ error: "Name and description cannot be empty or just spaces" });
        }
    
        // Validate price and quantity
        if (price <= 0 || quantity <= 0) {
            return res.status(400).json({ error: "Price and quantity must be greater than 0" });
        }
    
        Products.findByIdAndUpdate(id, { 
            name: name.trim(), 
            image, 
            price, 
            quantity, 
            description: description.trim(), 
            categoryId 
        }, { new: true })
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
            .populate('categoryId', 'name') // Populating categoryId to get category name
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