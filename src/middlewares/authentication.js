const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const jwtConfig = { 
    expiresIn: '7d',
    algorithm: 'HS256',
};

const { User } = require('../models');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Expired or invalid token');
  }
};

const verifyUserExists = async (input, field) => {
  const obj = { [field]: input };
  const result = await User.findOne({ where: obj });
  if (result === null || !result) { throw new Error('Expired or invalid token'); }
};

const verifyUserAndPassword = async (obj) => {
  const data = await User.findOne({ where: obj });
  if (!data || data === null || data === '') {
    throw new Error('Invalid fields');
  }
  return data;
};

const tokenGenerator = async (req, res, _next) => {
  const { email, password } = req.body;
  const objSearch = { email, password };
  const data = await verifyUserAndPassword(objSearch);
  const { displayName, image } = data;
  const { code } = req.http;
  const obj = { displayName, email, image };
  const token = jwt.sign(obj, JWT_SECRET, jwtConfig);
  return res.status(code).json({ token });
};

// const tokenGenerator = (user) => {
//     const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
//     return token;
// };

const verifyEmptyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  next();
};

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = verifyToken(token);
    await verifyUserExists(decoded.email, 'email');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  tokenGenerator,
  verifyEmptyToken,
  tokenValidation,
};
