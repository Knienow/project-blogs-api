const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserByEmail = async (email) => {
  const [data] = await User.findAll({ where: { email } });

  return data;
};

module.exports = {
  getAllUsers,
  getUserByEmail,
};