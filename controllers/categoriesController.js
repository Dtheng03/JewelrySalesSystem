const Categories = require("../models/categories");

class categoriesController {
    // API
    getAll(req, res, next) {
        Categories.find({})
            .then((categories) => {
                res.status(200).json(categories)
            })
    }
    createCategory(req, res, next) {
        const { name } = req.body;
    
        // Validate name
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Please input name" });
        }
    
        const newCategory = new Categories({ name: name.trim() });
        newCategory.save()
            .then((category) => {
                res.status(201).json(category);
            })
            .catch(next);
    }
    
    // Update a category
    updateCategory(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    // Validate the name field
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Please input name" });
    }

    Categories.findByIdAndUpdate(id, { name: name.trim() }, { new: true })
        .then((category) => {
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        })
        .catch(next);
}


    // View category detail
    getCategoryById(req, res, next) {
        const { id } = req.params;
        Categories.findById(id)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json(category);
            })
            .catch(next);
    }

    // Delete a category
    deleteCategory(req, res, next) {
        const { id } = req.params;
        Categories.findByIdAndDelete(id)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json({ message: "Category deleted" });
            })
            .catch(next);
    }
};

module.exports = new categoriesController;