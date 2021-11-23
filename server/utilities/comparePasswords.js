// Imports
const bcrypt = require('bcryptjs');
// ------------------------------------

// Hashin function
const comparePasswords = (text, password) => {
  return bcrypt.compareSync(text, password);
};
// ------------------------------------

// Exports
module.exports = comparePasswords;
// ------------------------------------
