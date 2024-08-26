const crypto = require('crypto');

const generateSecret = () => {
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  console.log('Your JWT_SECRET is:', jwtSecret);
};

generateSecret();
