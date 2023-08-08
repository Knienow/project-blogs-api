// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: {
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
    }, {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts'
    });

    BlogPost.associate = (models) => {
      // define o tipo de relacionamento
      BlogPost.belongsTo(models.User,
          // define qual a foreign key a ser criada
            { foreignKey: 'user_id', as: 'user' });
        };


    return BlogPost;
  };
  
  module.exports = BlogPostModel;