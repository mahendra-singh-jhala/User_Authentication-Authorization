// Import the express
const express = require("express")

// creating a router
const router = express.Router();

// Import register and login functions from the userController
const { register, login, getUserInfo } = require("../controller/userController");

// Import the verifyToken middleware for JWT validation
const { verifyToken } = require("../middleware/authMiddleware");


// This route handles POST requests for user registration
router.post("/register", register)

// This route handles POST requests for user login
router.post("/login", login)

// This route handles GET for getting user information
router.get("/user", verifyToken, getUserInfo)


module.exports = router;

