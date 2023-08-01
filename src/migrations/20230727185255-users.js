'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      // allowNull: Define se o campo pode ou não receber um valor null;
      // autoIncrement: Define se o campo vai ter incremento automático;
      // primaryKey: Define se o campo é uma chave primária;
      // type: Define o tipo do campo, por exemplo STRING, INTEGER, DATE, etc. 
      id: {
      //   allowNull: false,
      //   autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      display_name: {
        type: Sequelize.VARCHAR
      },
      email: {
        type: Sequelize.VARCHAR
      },
      password: {
        type: Sequelize.VARCHAR
      },
      image: {
        type: Sequelize.VARCHAR
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('Users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
