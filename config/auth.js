const jwt = require("jsonwebtoken");
const Employees = require("../models/employees");

module.exports = {
    authenticateToken: function (req, res, next) {
        // Lấy token từ tiêu đề Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.status(401).json({
                "status": "error",
                "message": "Access token is missing",
                "description": "You must provide an access token"
            });
        }

        // Xác minh token
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    "status": "error",
                    "message": "Invalid token",
                    "description": "Token is not valid"
                });
            }

            // Thêm thông tin người dùng vào request object
            req.user = user;

            // Chuyển tiếp yêu cầu
            next();
        });
    },
    isAdmin: function (req, res, next) {
        const { isAdmin } = req.user;
        if (!isAdmin) {
            return res.status(403).json({
                "status": "error",
                "message": "Not allowed",
                "description": "Employee is not allowed to do this action."
            })
        } else {
            next();
        }
    },
    isActive: async function (req, res, next) {
        const { id } = req.user;
        const employee = await Employees.findById(id);
        if (employee.status === false) {
            return res.status(401).json({
                "status": "error",
                "message": "Invalid credentials",
                "description": "This account is not allow to this action."
            });
        } else {
            next();
        }
    }
}