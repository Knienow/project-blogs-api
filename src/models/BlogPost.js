// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.STRING,
      published: DataTypes.STRING,
      updated: DataTypes.STRING,
    });

    return BlogPost;
  };
  
  module.exports = BlogPostModel;