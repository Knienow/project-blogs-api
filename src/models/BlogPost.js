const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'published'
    },
    updated: {
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'updated'
    }
  }, 
  {
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };
  return BlogPost;
};
  
module.exports = BlogPostModel;