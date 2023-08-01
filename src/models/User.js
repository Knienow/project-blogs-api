// Código do course - dia 01: Model
// Geralmente os models são nomeados no singular, 
// já que representam um registro (o equivalente a uma linha) da tabela, 
// enquanto as tabelas são nomeadas no plural. Como não explicitamos o nome 
// da tabela no model, por padrão, o Sequelize coloca no plural o nome do model 
// e o usa como nome da tabela.

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: DataTypes.STRING,
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    });

    return User;
  };
  
  module.exports = UserModel;