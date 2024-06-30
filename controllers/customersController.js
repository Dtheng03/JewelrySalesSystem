const { default: mongoose } = require("mongoose");
const Customers = require("../models/customers");

class customersController {
    // API
    async getAll(req, res, next) {
        try {
            const customers = await Customers.find({})
            res.status(200).json({
                "status": "success",
                "message": "Get List Customers Success",
                "data": customers
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    };
    async addCustomer(req, res, next) {
        try {
            const { name, address, phone, gender } = req.body;
            // Biểu thức chính quy để kiểm tra định dạng số điện thoại (bạn có thể tùy chỉnh theo yêu cầu)
            const phoneRegex = /^\d{10}$/; // Ví dụ: số điện thoại gồm 10 chữ số
            if (!name || !address || !phone || typeof gender !== 'boolean' ||
                name.trim().length === 0 || address.trim().length === 0
                || !phoneRegex.test(phone.trim())) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Validation errors",
                    "description": "All fields are required and must be in the correct format."
                });
            }
            const customer = await Customers.findOne({
                $or: [
                    { name: name },
                    { phone: phone }
                ]
            });
            if (customer) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Customer is existed",
                    "description": `Name or phone is existed`
                });
            }
            const newCustomer = new Customers({
                name,
                address,
                phone,
                gender,
            })
            await newCustomer.save();
            res.status(201).json({
                "status": "success",
                "message": "Add Customer Success.",
                "description": `Customer with name ${name} is created success.`
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    };
    async getDetail(req, res, next) {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.Types.ObjectId.isValid(customerId)) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid customer ID",
                    "description": `The customer ID ${customerId} is not a valid ObjectId.`
                });
            }
            const customer = await Customers.findById(customerId)
            res.status(200).json({
                "status": "success",
                "message": "Get Detail Customer Success",
                "data": customer
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    };
    async updateCustomer(req, res, next) {
        try {
            const { address, phone } = req.body;
            const customerId = req.params.customerId;
            const phoneRegex = /^\d{10}$/; // Ví dụ: số điện thoại gồm 10 chữ số
            if (!mongoose.Types.ObjectId.isValid(customerId)) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid customer ID",
                    "description": `The customer ID ${customerId} is not a valid ObjectId.`
                });
            }
            const customer = await Customers.findById(customerId);
            if (customer) {
                if (address) {
                    if (address.trim().length == 0) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `Address is required.`
                        });
                    }
                    if (address == customer.address) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `New address is the same as old address`
                        });
                    }
                    customer.address = address;
                    await customer.save()
                }
                if (phone) {
                    if (!phoneRegex.test(phone.trim())) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation errors",
                            "description": "Phone must be in the correct format."
                        });
                    }
                    if (phone == customer.phone) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `New phone is the same as old phone`
                        });
                    }
                    const duplicateInfo = await Customers.findOne({ _id: { $ne: customerId }, phone: phone })
                    if (duplicateInfo) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `Phone is existed`
                        });
                    }
                    customer.phone = phone;
                    await customer.save()
                }
                return res.status(200).json({
                    "status": "success",
                    "message": "Update Customer Success",
                });
            } else {
                return res.status(404).json({
                    "status": "error",
                    "message": "Not found",
                    "description": `Customer is not found.`
                });
            }
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    }
};

module.exports = new customersController;