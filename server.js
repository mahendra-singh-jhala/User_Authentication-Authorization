// Import the express 
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const userRoutes = require("./router/userRoutes")

// Load environment variables from .env file
require("dotenv").config()

const app = express();

// contect to the mongodb database
connectDB();

// middleware to parser JSON
app.use(bodyParser.json())


// routes
app.use("/api/users", userRoutes);

PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


