// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        foreignKey: 'postId', 
        as: 'posts',
        through: PostCategory,
        otherKey: 'categoryId',
      });
      models.BlogPost.belongsToMany(models.Category, { 
        foreignKey: 'categoryId',
        as: 'categories',
        through: PostCategory,
        otherKey: 'postId'
      });
    };

    return PostCategory;
  };
  
  module.exports = PostCategoryModel;