const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const UserRegister = async (req, res) => {
    try {
        console.log("Incoming request body for registration:", req.body);

        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("User already exists:", req.body.email);
            return res.status(409).send({ message: 'User Already Exists', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new UserModel(req.body);
        await newUser.save();
        console.log("User registered successfully:", newUser);
        res.status(201).send({ message: 'Registered Successfully', success: true });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
    }
};

// LOGIN
const Userlogin = async (req, res) => {
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

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("Login successful for user:", req.body.email);
        console.log("Generated token:", token);
        res.status(200).send({ message: 'Login Success', success: true, token, role: user.role });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: `Error in Login Controller: ${error.message}`, success: false });
    }
};


// AuthUser
const Authuser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            });
        }
        user.password = undefined;
        res.status(200).send({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Auth error',
            success: false,
            error
        });
    }
};

// DELETE
const Deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting user with ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid user ID:", id);
            return res.status(404).json({ error: 'No user found' });
        }

        const user = await UserModel.findOneAndDelete({ _id: id });
        if (!user) {
            console.log("No user found with ID:", id);
            return res.status(400).json({ error: 'No user found' });
        }

        console.log("User deleted:", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
const Updateuser = async (req, res) => {
    try {
      const { userId, ...updateData } = req.body;
  
      const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
      res.status(200).send({
        success: true,
        message: "User Profile Updated Successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "User Profile Update Issue",
        error,
      });
    }
  };

module.exports = {
    UserRegister,
    Userlogin,
    Authuser,
    Deleteuser,
    Updateuser
};
