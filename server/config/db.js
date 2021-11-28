// Imports
const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' });
const MONGO_URI = process.env.MONGO_URI;
// ------------------------------------

// Function for connecting to MongoDB Atlas

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database connected: ${conn.connection.host}`.cyan.bold.underline
    );
  } catch (err) {
    console.log(`Error occured: ${err.message}`.red.bold);
  }
};

// ------------------------------------
// Exports
module.exports = { connectDb };
// ------------------------------------
