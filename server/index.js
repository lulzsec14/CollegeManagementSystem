require('dotenv').config({ path: './config.env' });
// Imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const colors = require('colors');
const compression = require('compression');
const { connectDb } = require('./config/db');
const mongoStore = require('connect-mongo');
const session = require('express-session');
// ------------------------------------

// Connecting to database
connectDb();
// ------------------------------------

// Constants
const app = express();
const PORT = process.env.PORT || 5000;
const {
  adminRouter,
  coreMemberRouter,
  clubManagerRouter,
  studentRouter,
  facultyRouter,
} = require('./routes/main');
const SECRET = process.env.SESSION_SECRET;
const store = mongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  autoRemove: 'native',
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});
// ------------------------------------
// Middlewares
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'none',
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// ------------------------------------

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/coreMember', coreMemberRouter);
app.use('/api/clubManager', clubManagerRouter);
app.use('/api/student', studentRouter);
app.use('/api/faculty', facultyRouter);
// ------------------------------------

// Server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold.underline);
});
// ------------------------------------

// Stopping server in case of any error
process.on('unhandledRejection', (err, promise) => {
  console.log(`Server stopped due to: ${err}`);
  server.close(() => process.exit(1));
});
// ------------------------------------
