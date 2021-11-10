require('dotenv').config({ path: './config.env' });
// Imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const colors = require('colors');
const compression = require('compression');
const connectDb = require('./config/db');
// ------------------------------------

// Connecting to database
connectDb();
// ------------------------------------

// Constants
const app = express();
const PORT = process.env.PORT || 5000;
const { adminRouter, coreMemberRouter } = require('./routes/main');
// ------------------------------------

// Middlewares
app.use(compression());
app.use(cors());
app.use(express.json());
// ------------------------------------

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/coreMember', coreMemberRouter);
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
