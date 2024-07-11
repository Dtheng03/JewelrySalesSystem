const Orders = require("../models/orders");
const OrderDetails = require("../models/orderDetails");
const Customers = require("../models/customers");
const Employees = require("../models/employees");
const Promotions = require("../models/promotions");
const Products = require("../models/products");

class ordersController {
  // Create a new order
  async create(req, res, next) {
    const employeeId = req.user.id;
    try {
      const { customerId, discount, status, products } = req.body;

      // Validate required fields
      if (!customerId || !products || products.length === 0) {
        return res.status(400).json({ message: "All fields must be filled" });
      }

      // Validate customer, employee, discount, and products existence
      const customerExists = await Customers.findById(customerId);
      if (!customerExists) {
        return res.status(404).json({ message: "Customer not found" });
      }

      const employeeExists = await Employees.findById(employeeId);
      if (!employeeExists) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Validate discount if provided
      if (discount) {
        const discountExists = await Promotions.findById(discount);
        if (!discountExists) {
          return res.status(404).json({ message: "Discount not found" });
        }
      }

      // Validate products and check quantities
      for (let i = 0; i < products.length; i++) {
        const productExists = await Products.findById(products[i].productId);
        if (!productExists) {
          return res.status(404).json({
            message: `Product with ID ${products[i].productId} not found`,
          });
        }

        if (productExists.quantity < products[i].quantity) {
          return res.status(400).json({
            message: `Insufficient quantity for product with ${products[i].productId}`,
          });
        }
      }

      let orderTotal = 0;
      for (let product of products) {
        product.total = product.price * product.quantity;
        orderTotal += product.total;
      }

      const newOrderDetails = new OrderDetails({
        products,
        total: orderTotal,
      });
      const savedOrderDetails = await newOrderDetails.save();

      // Create new order with the order details ID
      const newOrder = new Orders({
        customerId,
        employeeId,
        discount,
        status,
        orderDetails: savedOrderDetails._id,
      });
      const savedOrder = await newOrder.save();

      // Update the orderId in the savedOrderDetails
      savedOrderDetails.orderId = savedOrder._id;
      await savedOrderDetails.save();

      // Reduce the quantity of the products
      for (let product of products) {
        await Products.findByIdAndUpdate(product.productId, {
          $inc: { quantity: -product.quantity },
        });
      }

      res
        .status(201)
        .json({ order: savedOrder, orderDetails: savedOrderDetails });
    } catch (error) {
      next(error);
    }
  }

  //Get all order
  async getAll(req, res, next) {
    try {
      const orders = await Orders.find()
        .populate("customerId", "name address phone gender")
        .populate("employeeId", "name")
        .populate("discount", "name percent")
        .populate({
          path: "orderDetails",
          populate: {
            path: "products.productId",
            select: "name price image",
          },
        });
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // Get order by ID
  async getOrderById(req, res, next) {
    try {
      const orderId = req.params.id;
      const order = await Orders.findById(orderId)
        .populate({
          path: "customerId",
          select: "_id name address phone gender",
        })
        .populate({
          path: "discount",
          select: "_id name percent",
        })
        .populate({
          path: "orderDetails",
          populate: {
            path: "products.productId", // Đặt path để populate từ products
            // model: Products, // Chỉ định model là Products
            populate: {
              path: "categoryId",
            },
          },
        });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  // Update order status by ID
  async updateStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Validate required fields
      if (!orderId || status === undefined) {
        return res
          .status(400)
          .json({ message: "Order ID and status must be provided" });
      }

      // Validate status value
      if (![1, 2, 3].includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status value. Must be 1, 2, or 3" });
      }

      // Find and update the order status
      const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ordersController();
