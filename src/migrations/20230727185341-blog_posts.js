'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
        allowNull: false,
        type: Sequelize.STRING
      },
      content: { 
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: { 
        allowNull: false,
        type: Sequelize.INTEGER
      },
      published: { 
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: { 
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('blog_posts');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
