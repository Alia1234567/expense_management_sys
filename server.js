// Import necessary modules
const express = require("express"); // Framework for building web servers
const cors = require("cors"); // Middleware to allow cross-origin requests
const morgan = require("morgan"); // Middleware for logging HTTP requests
const dotenv = require("dotenv"); // Module for loading environment variables from a .env file
const colors = require("colors"); // Adds colors to console logs for better readability 
const path = require("path");
const connectDb = require("./config/connectDb"); // Import a custom module to connect to the database

// Load environment variables from a .env file into process.env
// config dot env file
dotenv.config();

// Connect to the database
//databse call
connectDb();

//rest object
// Create an instance of an Express application
const app = express();

//middlewares
// Use middleware for logging requests in the "dev" format (detailed log)
app.use(morgan("dev"));

// Use middleware to parse incoming JSON requests
app.use(express.json());

// Use middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

//routes
//user routes
// Define a route for handling user-related API requests
app.use("/api/v1/users", require("./routes/userRoute"));

//transections routes
// Define a route for handling transaction-related API requests
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

//static files
// Serve static files from the "client/build" directory (for the front-end)
app.use(express.static(path.join(__dirname, "./client/build")));

// Handle any requests that don’t match the above routes by serving the front-end's index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
// Define the port to listen on, defaulting to 8080 if process.env.PORT is not set
const PORT = 8080 || process.env.PORT;

//listen server
// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
