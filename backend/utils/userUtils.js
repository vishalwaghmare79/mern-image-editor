const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const hashPassword = async (password) => {
    try {
        const saltRound = 10;
        const hashPass = await bcrypt.hash(password, saltRound);
        return hashPass;
    } catch (error) {
        console.log("error in hashing password", error);
        throw error;
    }
}

const comparePassword = async (password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log("error while comparing password", error);
        throw error;
    }
}

const generateToken = (user) => {
    try {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    } catch (error) {
        console.log("error in generating token", error);
        throw error;
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("error in verifying token", error);
        throw error;
    }
}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };

