// Import the mongo-es
const mongoose = require("mongoose")

// Load environment variables from .env file
require("dotenv").config();

// connect to mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is connected")
    } catch(error) {
        console.log("Error to connect MongoDB", error)
    }
}

module.exports = connectDB;