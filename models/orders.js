const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
        required: true,
    },
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotions",
    },
    status: {
        type: Number,
        min: 1,
        max: 3,
        default: 1
    },
}, { timestamps: true });

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;