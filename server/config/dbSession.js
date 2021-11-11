require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;