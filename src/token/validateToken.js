const tokenGenerator = require('./generateToken');

module.exports = async (req, res, next) => {
  const token = await req.headers.authorization;
  console.log('TOKEN', token);

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validToken = tokenGenerator.validateToken(token);
  if (validToken.message) {
    const { code, message } = validToken;
     return res.status(code).json({ message });
    }

  next();
};