const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Customers = mongoose.model("Customers", customerSchema);

module.exports = Customers;