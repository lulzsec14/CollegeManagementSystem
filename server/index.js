// Imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const colors = require('colors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Server stopped due to: ${error}`);
  server.close(() => process.exit(1));
});
