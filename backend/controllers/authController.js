const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const { hashPassword, comparePassword, generateToken } = require("../utils/userUtils");


const registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next({ statusCode: 400, message: 'Name, email and password are required'});
  }

  const existingUser = await User.exists({ email });
  if (existingUser) {
    return next({ statusCode: 400, message: 'User already registered. Please login.'});
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ success: true, message: 'User registered successfully', id: newUser._id });
});

  
const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;  

  if (!email) return next({ statusCode: 400, message: "Email is required" });
  if (!password) return next({ statusCode: 400, message: "Password is required" });

  const user = await User.findOne({ email }, 'password').lean();
  if (!user) return next({ statusCode: 404, message: "User not found" });

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) return next({ statusCode: 401, message: "Invalid credentials" });

  const token = generateToken(user);

  res.status(200).json({ success: true, message: "Login successful", token});
});

  
module.exports = { registerController, loginController }; 