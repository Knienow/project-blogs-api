const { User } = require('../models');

const verifyEmptyInput = (input) => { 
    if (input === '') {
    //   throw new Error(`"${field}" is not allowed to be empty`);
      throw new Error('Some required fields are missing');
    }
};
  
const verifyMissingFields = (input, field) => {
    if (!input) { throw new Error(`"${field}" is required`); }
};
  
const validationPassword = async (req, res, next) => {
const { password } = req.body;
try {
    verifyEmptyInput(password);
    verifyMissingFields(password, 'password');
} catch (error) {
    return res.status(400).json({ message: error.message });
}
next();
};

const validationEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        verifyEmptyInput(email);
        verifyMissingFields(email, 'email');
        req.http = { code: 200 };
} catch (error) {
    return res.status(400).json({ message: error.message });
}
next();
};

const verifyUserAndPassword = async (obj) => {
    // const { email } = req.body;
    const data = await User.findOne({ where: obj });
    if (!data || data === null || data === '') {
        // return res.status(400).json('Invalid fields');
        throw new Error('Invalid fields');
    }
    return data;
};

// const validationUser = async (req, res, next) => {
//     const { email } = req.body;
//     const user = await User.findOne({
//         where: { email },
//     });

//     if (!email || !password) {
//         return res.status(400).json('Some required fields are missing');
//     }
//     if (!user) {
//         return res.status(400).json('Invalid fields');
//     }
// };

const verifyUserAndPasswordDB = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const obj = { email, password };
    const data = await verifyUserAndPassword(obj);
    console.log('teste', data);
    const { displayName, image } = data;
    req.userInfo = { displayName, email, image };
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};
  
module.exports = { validationPassword, validationEmail, verifyUserAndPasswordDB };