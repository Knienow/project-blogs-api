const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, 
    name: DataTypes.STRING,
  }, 
  {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  return Category;
};
  
  module.exports = CategoryModel;