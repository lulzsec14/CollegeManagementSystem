require('dotenv').config({ path: './config.env' });
// Imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const colors = require('colors');
const connectDb = require('./config/db');
// ------------------------------------

// Connecting to database
connectDb();
// ------------------------------------

// Constants
const app = express();
const PORT = process.env.PORT || 5000;
// ------------------------------------

// Middlewares
app.use(cors());
app.use(express.json());
// ------------------------------------

// Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
// ------------------------------------

// Stopping server in case of any error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Server stopped due to: ${err}`);
  server.close(() => process.exit(1));
});
// ------------------------------------
