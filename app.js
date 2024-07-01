var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./swagger");

const categoriesRouter = require("./routes/categoriesRouter");
const customersRouter = require("./routes/customersRouter");
const employeesRouter = require("./routes/employeesRouter");
const orderDetailsRouter = require("./routes/orderDetailsRouter");
const ordersRouter = require("./routes/ordersRouter");
const productsRouter = require("./routes/productsRouter");
const promotionsRouter = require("./routes/promotionsRouter");

var app = express();
app.use(cors());
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// connect DB
const url = "mongodb://127.0.0.1:27017/jewelrySalesSystem";
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("Connected successfully to server!");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/categories", categoriesRouter);
app.use("/api/customers", customersRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/order-details", orderDetailsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/promotions", promotionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
