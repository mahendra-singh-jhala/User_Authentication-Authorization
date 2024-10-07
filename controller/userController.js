// Import the User model database interactions
const User = require("../model/userModel");

// Import the bcrypt for hashing passwords
const bcrypt = require("bcrypt");

// Import the jsonwebtoken for creating JWTs
const jwt = require("jsonwebtoken");


// Controller function for user registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, email, password: hashPassword});
        await newUser.save();
        res.status(201).json({ 
            message: "User registered successfully"
        });
    } catch(error) {
        res.status(400).json({
            error: "User registered failed"
        })
    }
}


// Controller function for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // match user email and password
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User Email Not Found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            return res.status(400).json({
                message: "Password Not Match"
            })
        }

        // if valid, generate the JWT token for the user
        const token = jwt.sign({userId: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: "1hr"} )

        //return the token to the user
        res.json({token})

    } catch(error) {
        res.status(500).json({ 
            error: 'Login failed',
            message: error.message
        });
    }
}


// Get user information
exports.getUserInfo = async (req, res) => {
    try {

        const user = req.user;
        if(!req.user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
        })
    } catch(error) {
        res.status(500).json({
            message: "Not Found Any User",
            error: error.message
        })
    }
}