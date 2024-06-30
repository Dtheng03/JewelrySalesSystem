const { default: mongoose } = require("mongoose");
const Employees = require("../models/employees");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Hoặc bất kỳ dịch vụ email nào bạn sử dụng
    auth: {
        user: 'jewelrysalessystem@gmail.com',
        pass: 'jnwx qbqa vdqr xuhi' // Sử dụng App Password
    }
});

class employeesController {
    // API
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // Kiểm tra giá trị đầu vào
            if (!email || !password || email.trim().length == 0 || password.trim().length == 0) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Validation errors",
                    "description": "Email and password are required."
                });
            }
            const employee = await Employees.findOne({ email: email });
            // Kiểm tra xem thành viên có tồn tại hay không
            if (!employee) {
                return res.status(404).json({
                    "status": "error",
                    "message": "Employee not found",
                    "description": `Employee with email ${email} is not found.`

                });
            }
            if (employee.status == false) {
                return res.status(401).json({
                    "status": "error",
                    "message": "Invalid credentials",
                    "description": "The employee is not allow to login."
                });
            }
            // Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, employee.password);
            if (isMatch) {
                // Tạo token JWT
                const token = jwt.sign({
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    gender: employee.gender,
                    status: employee.status,
                    isAdmin: employee.isAdmin
                }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.status(200).json({
                    "status": "success",
                    "data": {
                        "tokenType": "Bearer",
                        "token": token
                    },
                    "message": "Logged in successfully"
                });
            } else {
                return res.status(401).json({
                    "status": "error",
                    "message": "Invalid credentials",
                    "description": "The password provided is incorrect."
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
    async createAccount(req, res, next) {
        try {
            const { name, email, phone, gender } = req.body;
            // Biểu thức chính quy để kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Biểu thức chính quy để kiểm tra định dạng số điện thoại (bạn có thể tùy chỉnh theo yêu cầu)
            const phoneRegex = /^\d{10}$/; // Ví dụ: số điện thoại gồm 10 chữ số
            if (!name || !email || !phone || typeof gender !== 'boolean' ||
                name.trim().length === 0 || email.trim().length === 0 ||
                !emailRegex.test(email) || !phoneRegex.test(phone.trim())) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Validation errors",
                    "description": "All fields are required and must be in the correct format."
                });
            }
            const employee = await Employees.findOne({
                $or: [
                    { name: name },
                    { email: email },
                    { phone: phone }
                ]
            });
            if (employee) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Employee is existed",
                    "description": `Name or email or phone is existed`
                });
            }
            const password = `${email}${phone}${gender}`
            const hashedPassword = await bcrypt.hash(password, 10);
            const newEmployee = new Employees({
                name,
                email,
                phone,
                password: hashedPassword,
                gender,
                status: true,
                isAdmin: false
            })
            await newEmployee.save();
            const mailOptions = {
                from: 'jewelrysalessystem@gmail.com',
                to: email,
                subject: "[Jewelry Sales System] _ Create Account Successfully",
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #4CAF50;">Welcome to Jewelry Sales System!</h2>
                    <p>Dear <b>${name}</b>,</p>
                    <p>Thank you for joining us. Below are your account details for login:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><b>Password</b></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${email}${phone}${gender}</td>
                        </tr>
                    </table>
                    <p style="text-align: center;">
                        <span style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">This is automatic email. Please do not reply.</span>
                    </p>
                    <p>Best regards,<br>Jewelry Sales System</p>
                </div>
                `
            };
            await transporter.sendMail(mailOptions);
            res.status(201).json({
                "status": "success",
                "message": "Create Account Success.",
                "description": `Account with email ${email} is created success.`
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    }
    async getAll(req, res, next) {
        try {
            const employees = await Employees.find({ isAdmin: false }).select('-password')
            res.status(200).json({
                "status": "success",
                "message": "Get List Employees Success",
                "data": employees
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    }
    async getDetail(req, res, next) {
        try {
            const employeeId = req.params.employeeId;
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid employee ID",
                    "description": `The employee ID ${employeeId} is not a valid ObjectId.`
                });
            }
            const employee = await Employees.findById(employeeId).select('-password')
            res.status(200).json({
                "status": "success",
                "message": "Get Detail Employee Success",
                "data": employee
            });
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "message": "Internal server error",
                "description": error.message
            });
        }
    }
    async updateEmployee(req, res, next) {
        try {
            const { phone, status } = req.body;
            const employeeId = req.params.employeeId;
            const phoneRegex = /^\d{10}$/; // Ví dụ: số điện thoại gồm 10 chữ số
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid employee ID",
                    "description": `The employee ID ${employeeId} is not a valid ObjectId.`
                });
            }
            const employee = await Employees.findById(employeeId);
            if (employee) {
                if (phone) {
                    if (!phoneRegex.test(phone.trim())) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation errors",
                            "description": "Phone must be in the correct format."
                        });
                    }
                    if (phone == employee.phone) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `New phone is the same as old phone`
                        });
                    }
                    const duplicateInfo = await Employees.findOne({ _id: { $ne: employeeId }, phone: phone })
                    if (duplicateInfo) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `Phone is existed`
                        });
                    }
                    employee.phone = phone;
                    await employee.save()
                }
                if (typeof status == "boolean") {
                    if (status == employee.status) {
                        return res.status(400).json({
                            "status": "error",
                            "message": "Validation error",
                            "description": `New status is the same as old status`
                        });
                    }
                    employee.status = status;
                    await employee.save()
                }
                res.status(200).json({
                    "status": "success",
                    "message": "Update Employee Success",
                });
            } else {
                return res.status(404).json({
                    "status": "error",
                    "message": "Not found",
                    "description": `Employee is not found.`
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
    async changeStatus(req, res, next) {
        try {
            const employeeId = req.params.employeeId;
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid employee ID",
                    "description": `The employee ID ${employeeId} is not a valid ObjectId.`
                });
            }
            const employee = await Employees.findById(employeeId)
            if (employee) {
                employee.status = !employee.status;
                await employee.save()
                return res.status(200).json({
                    "status": "success",
                    "message": "Change Status Employee Success",
                });
            } else {
                return res.status(404).json({
                    "status": "error",
                    "message": "Not found",
                    "description": `Can not found employee with id ${employeeId}`
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

module.exports = new employeesController;