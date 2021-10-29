// Imports
const bcrypt = require('bcryptjs');
// ------------------------------------

// Hashin function
const textToHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
};
// ------------------------------------

// Exports
module.exports = textToHash;
// ------------------------------------
