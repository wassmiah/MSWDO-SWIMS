const express = require("express");
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { 
    Adminlogin,
    GetAllUsers
} = require("../controllers/AdminController");

const router = express.Router();

// Login Admin
router.post('/Adminlogin', Adminlogin);

// Get All Users
router.get("/GetAllUsers", AuthMiddleware, GetAllUsers);

module.exports = router;