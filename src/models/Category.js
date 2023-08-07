// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    });

    Category.associate = (models) => {
      // define o tipo de relacionamento
      Category.belongsTo(models.PostCategory,
          // define qual a foreign key a ser criada
            { foreignKey: 'id', as: 'category_id' });
        };

    return Category;
  };
  
  module.exports = CategoryModel;