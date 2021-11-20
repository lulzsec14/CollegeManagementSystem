// Imports
const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
// ------------------------------------

// Function for connecting to MongoDB Atlas
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDD connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error: ${error.message}`.red);
  }
};

// const connectDb = async () => {
//   try {
//     const connected = await mongoose.connect(URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const conn = connected.connection;

//     console.log(
//       `MongoDD connected: ${conn.host}`.cyan.underline.bold
//     );
//   } catch (err) {
//     console.log(`Error: ${err.message}`.red);
//   }
// };
// ------------------------------------

// Exports
module.exports = connectDb;
// ------------------------------------
