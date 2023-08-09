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