const express = require("express");
const router = express.Router();
const {
    getUsers,
    registerUser,
    loginUser,
    deleteUser,
    getMe
} = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');
const { checkAdmin } = require('../middleware/adminMiddleware');

router.route("/")
    .get(auth, checkAdmin, getUsers)
    .post(auth, checkAdmin, registerUser);

router.route("/login")
    .post(loginUser);

router.route("/:id")
    .delete(auth, checkAdmin, deleteUser);

router.route("/me")
    .get(auth, getMe)

module.exports = router