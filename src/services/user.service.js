// src/services/user.service.js

const { User } = require('../models');

/* Esta função usa o método findAll do Sequelize para buscar todas as linhas da tabela Users
Equivale a fazer a query: SELECT * FROM Users */
const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  getAllUsers,
};