const bcrypt = require('bcryptjs');

const textToHash = (text) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
};

module.exports = textToHash;
