// Import the mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Import the colors library to add colors to console logs
const colors = require("colors");

// Define an asynchronous function to connect to the MongoDB database
const connectDb = async () => {
  try {
        // Attempt to connect to the MongoDB database using the URL from environment variables
    await mongoose.connect(process.env.MONGO_URL);

    // If the connection is successful, log the host name of the MongoDB server with colored text
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {

    // If there is an error during connection, log the error message with a red background
    console.log(`${error}`.bgRed);
  }
};

// Export the connectDb function so it can be used in other parts of the application
module.exports = connectDb;
