const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});

const orderDetailSchema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        required: true,
    },
    products: [productSchema],
    total: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const OrderDetails = mongoose.model("OrderDetails", orderDetailSchema);

module.exports = OrderDetails;