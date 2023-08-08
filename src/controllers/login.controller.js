// const { validationPassword, validationEmail /* verifyUserAndPasswordDB */ } = require(
//     '../middlewares/validationUser',
// );
// const token = require('../token/generateToken');

// const loginUser = async (req, res) => {
//     // try {
//         const { email } = req.body;
//         const passwordValidated = await validationPassword();
//         const emailValidated = await validationEmail();
//         // const userAndPasswordValidated = await verifyUserAndPasswordDB();

//         if (passwordValidated.code === 400) {
//             return res.status(passwordValidated.code).json({ message: passwordValidated.message });
//         }
//         if (emailValidated.code === 400) {
//             return res.status(emailValidated.code).json({ message: emailValidated.message });
//         }
//         const tokenGenerate = token.createToken(email);
   
//         return res.status(200).json({ token: tokenGenerate });
//     // } catch (error) {
//     //     return res.status(500).json({ message: error.message });
//     // }
// };

// module.exports = {
//     loginUser,
// };