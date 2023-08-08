const { User } = require('../models');
const token = require('../token/generateToken');

const validationUser = async (email, password) => {
    const user = await User.findOne({
        where: { email },
    });

    if (!email || !password) {
        return { code: 400, message: 'Some required fields are missing' };
    }
    if (!user) {
        return { code: 400, message: 'Invalid fields' };
    }
    const tokenGenerate = token.createToken(email);
   
    return tokenGenerate;
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await validationUser(email, password);
        if (userData.code === 400) {
            return res.status(userData.code).json({ message: userData.message });
        }
        return res.status(200).json({ token: userData });
    } catch (error) {
        return res.status(500).json({ message: 'error' });
    }
};

module.exports = {
    loginUser,
};