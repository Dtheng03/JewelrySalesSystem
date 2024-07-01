const Orders = require("../models/orders");
const OrderDetails = require("../models/orderDetails");

class ordersController {
  // Create a new order
  async createOrder(req, res, next) {
    try {
      const { customerId, employeeId, discount, products } = req.body;

      // Check if required fields are provided
      if (
        !customerId ||
        !employeeId ||
        !products ||
        !Array.isArray(products) ||
        products.length === 0
      ) {
        return res.status(400).json({
          message: "Customer ID, Employee ID, and products are required",
        });
      }

      // Calculate total price
      let total = 0;
      products.forEach((product) => {
        total += product.price * product.quantity;
      });

      // Create order details
      const orderDetails = new OrderDetails({
        products,
        total,
      });

      await orderDetails.save();

      // Create order
      const order = new Orders({
        customerId,
        employeeId,
        discount,
        status: 1, // Default status
        total: orderDetails.total,
        orderDetails: orderDetails._id,
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ordersController();
