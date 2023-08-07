'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          // Informa a tabela da referência da associação
          model: 'blog_posts',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: { 
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          // Informa a tabela da referência da associação
          model: 'categories',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
