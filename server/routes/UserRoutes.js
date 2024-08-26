const express = require('express');
const { Userlogin, UserRegister, Authuser, Deleteuser, Updateuser } = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const AdminMiddleware = require('../middlewares/AdminMiddleware');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

// Routes
router.post('/login', Userlogin);
router.post('/register', UserRegister);
router.post('/getUserData', AuthMiddleware, Authuser);
router.patch('/updateProfile', AuthMiddleware, upload.single('avatar'), Updateuser);
router.delete('/:id', AuthMiddleware, Deleteuser);

// Admin-specific routes
router.get('/allUsers', AuthMiddleware, AdminMiddleware, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

module.exports = router;
