const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;
const secret = process.env.JWT_SECRET;
const jwtConfig = { 
    expiresIn: '7d',
    algorithm: 'HS256',
};

const { User } = require('../models');
// const userService = require('../services/user.service');

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
  // const { code } = req.http;
  const obj = { displayName, email, image };
  const token = jwt.sign(obj, secret, jwtConfig);
  return res.status(200).json({ token });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded', decoded);
    return decoded;
  } catch (error) {
    console.log('erroVerify', error);
    throw new Error('Expired or invalid token');
  }
};

const verifyUserExists = async (input, field) => {
const obj = { [field]: input };
const result = await User.findOne({ where: obj });
console.log('result', result);
  if (result === null || !result) { throw new Error('Expired or invalid token'); }
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
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];
  console.log('token', token);
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    await verifyUserExists(decoded.email, 'email');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.log('erro', error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
  // try {
  //   const bearerToken = req.headers.authorization;
  //   const token = bearerToken.split(' ')[1];
  //   // const header = req.header('Authorization');
  //   if (!token) return res.status(401).json({ message: 'Token not found' });
  
  //   jwt.verify(token, secret, async (err, decode) => {
  //     if (err) return res.status(401).json({ message: 'Expired or invalid token' });
  //     req.email = decode.email;
  //     const response = await userService.getUserByEmail(decode.email);
  //     req.userId = response.id;
  //     return next();
  //   });
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
};

const tokenValidationWithoutBearer = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('token', token);
  try {
    const decoded = verifyToken(token);
    await verifyUserExists(decoded.email, 'email');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
  } catch (error) {
    console.log('erro', error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  tokenGenerator,
  verifyEmptyToken,
  tokenValidation,
  tokenValidationWithoutBearer,
};
