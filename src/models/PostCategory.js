// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      post_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        foreignKey: 'post_id', 
        as: 'posts',
        through: PostCategory,
        otherKey: 'category_id',
      });
      models.BlogPost.belongsToMany(models.Category, { 
        foreignKey: 'category_id',
        as: 'category',
        through: PostCategory,
        otherKey: 'post_id'
      });
    };

    return PostCategory;
  };
  
  module.exports = PostCategoryModel;