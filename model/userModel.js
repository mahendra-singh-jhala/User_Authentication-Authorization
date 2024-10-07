// Import the mongoose 
const mongoose = require("mongoose");

// define the schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },
})

// create the user modele
const User = mongoose.model("User", userSchema)

module.exports = User;