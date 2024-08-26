const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}) 
        res.status(200).send({
            success: true,
            message: "users data list",
            data:users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while fetching users",
            error,
        });
    }
};

const Adminlogin = async (req, res) => {
    try {
        console.log("Incoming login request:", req.body);

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found:", req.body.email);
            return res.status(404).send({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            console.log("Invalid password for user:", req.body.email);
            return res.status(401).send({ message: 'Invalid Email or Password', success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("Login successful for user:", req.body.email);
        console.log("Generated token:", token);
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: `Error in Login Controller: ${error.message}`, success: false });
    }
};

module.exports = { Adminlogin ,GetAllUsers };