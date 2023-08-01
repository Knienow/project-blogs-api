'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
        type: Sequelize.VARCHAR
      },
      content: { 
        type: Sequelize.VARCHAR
      },
      user_id: { 
        type: Sequelize.INTEGER
      },
      published: { 
        type: Sequelize.DATETIME
      },
      updated: { 
        type: Sequelize.DATETIME
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
